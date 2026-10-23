// Compares an emailed brief (HTML) with the board data it was built from. Returns a list of problems, empty when the brief is complete.
// With golden facts (factsOf of the golden render) it also compares tiles, chart rows, day pills and section heads.
// factsOf and checkBrief use no module level names, so --snippet can inline them into one expression for the browser pane.
// Usage: node brief-check.mjs <brief.html> <data.json>
//        node brief-check.mjs --snippet <data.json>   (prints a JavaScript expression that checks window.__reply)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function factsOf(html) {
  const tile = /font-size:22px;line-height:26px;color:(#\w+)">([^<]*)<\/b>(?:<span[^>]*>([^<]*)<\/span>)?[\s\S]*?class="l"[^>]*>([^<]*)</g;
  const row = /<b style="font-size:13px;line-height:17px;color:#1A1633">([^<]*)<\/b><br><span[^>]*>([^<]*)<\/span><\/td><td width="46%"[^>]*><table[^>]*><tr><td width="(\d+)%"[^>]*><\/td><td width="(\d+)%"[^>]*><\/td><td width="(\d+)%"[^>]*><\/td>[\s\S]*?>(\d+)<\/td><\/tr>/g;
  return {
    kpis: [...html.matchAll(tile)].map((m) => `${m[4]}=${m[2]}${m[3] ? `|${m[3]}` : ''}@${m[1]}`),
    chart: [...html.matchAll(row)].map((m) => m.slice(1).join('/')),
    pills: [...html.matchAll(/class="(dp[ran])">([^<]*)</g)].map((m) => `${m[1]}:${m[2]}`),
    heads: [...html.matchAll(/class="(sh\d)">([^<]*) · (\d+)</g)].map((m) => `${m[2]}=${m[3]}`),
    css: (html.match(/<style>[\s\S]*?<\/style>/) ?? [''])[0].replace(/\s+/g, '').length,
  };
}

export function checkBrief(html, d, golden = null, facts = factsOf) {
  const decode = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  const visible = (h) => decode(h.replace(/&nbsp;/g, ' ').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<title>[\s\S]*?<\/title>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  const CARD = '<table role="presentation" class="card"';
  const problems = [];
  if (/@@|\{\{|\}\}/.test(html)) problems.push('a @@token@@ was left in the brief');
  const text = visible(html);
  if (/—/.test(text)) problems.push('em dash in the brief text');
  if (/;/.test(text)) problems.push('semicolon in the brief text');
  const inbound = ['must', 'waitingYou'].flatMap((k) => d[k] ?? []);
  const review = d.review ?? [], waiting = d.waiting ?? [];
  const order = [...inbound, ...waiting, ...review];
  const heads = { 'Must Do Today': d.must, 'Waiting on Your Response': d.waitingYou, 'Waiting on Others': waiting, 'Review Quickly': review };
  for (const [title, items] of Object.entries(heads)) {
    const m = html.match(new RegExp(`class="sh\\d">${title} \\u00b7 (\\d+)<`, 'i'));
    const want = items?.length ?? 0;
    if (want && !m) problems.push(`section "${title}" is missing`);
    else if (m && Number(m[1]) !== want) problems.push(`section "${title}" says ${m[1]} items, data has ${want}`);
    else if (!want && m) problems.push(`section "${title}" is shown but has no items`);
  }
  const cards = html.split(CARD).slice(1, order.length + 1);
  if (cards.length < order.length) problems.push(`found ${cards.length} cards, data has ${order.length}`);
  order.forEach((c, i) => {
    const t = cards[i] ? visible(cards[i]) : '';
    const need = c.recipients
      ? [c.recipients, c.subject, c.asked, c.sent, c.staleness, c.followUp, c.responses, c.topic && `Topic: ${c.topic}`]
      : [c.person, c.subject, c.ask, c.action, c.confidence, c.ownership, c.why, c.due, c.original, c.latest, c.more, c.also, c.topic && `Topic: ${c.topic}`];
    for (const v of need.filter(Boolean)) if (!t.includes(String(v))) problems.push(`card ${i + 1} (${c.person ?? c.recipients}): missing "${v}"`);
    if (c.vip && !/\bVIP\b/.test(t)) problems.push(`card ${i + 1}: VIP pill missing`);
  });
  const tiles = (html.match(/class="kpi"/g) ?? []).length;
  const wantTiles = d.mode === 'end-of-day' ? 6 : 9;
  const hasCommit = (d.commitments?.mine?.length ?? 0) + (d.commitments?.others?.length ?? 0) > 0;
  if (!(!order.length && !hasCommit) && tiles !== wantTiles) problems.push(`found ${tiles} KPI tiles, expected ${wantTiles}`);
  for (const n of [...(d.notes ?? []), d.summary].filter(Boolean)) if (!text.includes(n)) problems.push(`note missing: ${n.slice(0, 40)}`);
  const noteParas = (html.match(/<p style="margin:0 0 6px 0">/g) ?? []).length;
  if (noteParas !== (d.notes ?? []).length) problems.push(`found ${noteParas} note paragraphs, data has ${(d.notes ?? []).length}`);
  if (golden) {
    const got = facts(html);
    if (got.css !== golden.css) problems.push(`style block is ${got.css} characters, expected ${golden.css}`);
    const lc = (k) => k.split('=')[0].toLowerCase();
    const gotTile = new Map(got.kpis.map((k) => [lc(k), k]));
    for (const k of golden.kpis) if (gotTile.get(lc(k))?.split('=').slice(1).join('=') !== k.split('=').slice(1).join('=')) problems.push(`tile "${k.split('=')[0]}": expected ${k.split('=').slice(1).join('=')} got ${(gotTile.get(lc(k)) ?? 'nothing').split('=').slice(1).join('=')}`);
    golden.chart.forEach((r, i) => { if (got.chart[i] !== r) problems.push(`chart row ${i + 1}: expected ${r} got ${got.chart[i] ?? 'nothing'}`); });
    if (got.chart.length > golden.chart.length) problems.push(`chart has ${got.chart.length} rows, expected ${golden.chart.length}`);
    golden.pills.forEach((p, i) => { if (got.pills[i] !== p) problems.push(`pill ${i + 1}: expected ${p} got ${got.pills[i] ?? 'nothing'}`); });
    if (got.pills.length > golden.pills.length) problems.push(`found ${got.pills.length} pills, expected ${golden.pills.length}`);
    if (JSON.stringify(got.heads).toLowerCase() !== JSON.stringify(golden.heads).toLowerCase()) problems.push(`section heads: expected ${golden.heads.join(', ')} got ${got.heads.join(', ')}`);
  }
  return problems;
}

async function main(args) {
  const { renderBrief } = await import('./brief-render.mjs');
  if (args[0] === '--snippet') {
    const d = JSON.parse(readFileSync(args[1], 'utf8'));
    const golden = factsOf(renderBrief(d));
    process.stdout.write(`(function(html, d, golden) { const factsOf = ${factsOf.toString()}; const checkBrief = ${checkBrief.toString()}; return checkBrief(html, d, golden, factsOf); })(window.__reply, ${JSON.stringify(d)}, ${JSON.stringify(golden)})`);
    return 0;
  }
  const d = JSON.parse(readFileSync(args[1], 'utf8'));
  const problems = checkBrief(readFileSync(args[0], 'utf8'), d, factsOf(renderBrief(d)));
  console.log(problems.length ? problems.join('\n') : 'BRIEF COMPLETE');
  return problems.length ? 1 : 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2));
