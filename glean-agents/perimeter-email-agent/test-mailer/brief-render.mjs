// Fills the compact brief fragments from board data. Reference renderer for the emailed brief, the model's output is compared with it.
// Usage: node brief-render.mjs <data.json> [out.html]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'templates', 'brief', 'compact');
const frag = (name) => readFileSync(join(DIR, `${name}.html`), 'utf8').replace(/\n$/, '');

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (name, map) => frag(name).replace(/@@(\w+)@@/g, (_, k) => {
  if (!(k in map)) throw new Error(`fragment ${name}: no value for ${k}`);
  return map[k];
});
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
const pill = (cls, text) => fill('pill', { PCLASS: cls, TEXT: esc(text) });
const pills = (c) => ({ VIP_PILL: c.vip ? pill('pv', 'VIP') : '', TOPIC_PILL: c.topic ? pill('pt', `Topic: ${c.topic}`) : '' });
const rowText = (label, text) => (text ? fill('row-text', { LABEL: label, TEXT: esc(text) }) : '');
const rowKv = (label, text) => (text ? fill('row-kv', { LABEL: label, TEXT: esc(text) }) : '');

export const inboundDays = (n) => (n > 0 ? [plural(n, 'day'), n >= 5 ? 'dpr' : 'dpa'] : ['Not overdue', 'dpn']);
export const waitingDays = (n) => [plural(n, 'day'), n >= 8 ? 'dpr' : n >= 4 ? 'dpa' : 'dpn'];

function inboundCard(c, rank) {
  const [days, dclass] = inboundDays(c.days);
  return fill('card-inbound', {
    RANK: rank, PERSON: esc(c.person), ...pills(c), SUBJECT: esc(c.subject), DCLASS: dclass, DAYS: days,
    ASK: esc(c.ask), ACTION: esc(c.action), CONFIDENCE: esc(c.confidence), OWNERSHIP: esc(c.ownership), MESSAGES: c.messages,
    WHY: esc(c.why), DUE: esc(c.due), ORIGINAL: esc(c.original), LATEST: esc(c.latest),
    MORE_ROW: rowText('More asks', c.more), ALSO_ROW: rowText('Also waiting on', c.also),
  });
}

function waitingCard(c) {
  const [days, dclass] = waitingDays(c.daysWaiting);
  return fill('card-waiting', {
    INITIALS: esc(initials(c.recipients.split(',')[0])), RECIPIENTS: esc(c.recipients), ...pills(c), SUBJECT: esc(c.subject),
    DCLASS: dclass, DAYS: days, ASKED: esc(c.asked), SENT: esc(c.sent), STALENESS: esc(c.staleness),
    DAYS_WAITING: c.daysWaiting, FOLLOW_UP: esc(c.followUp), RESPONSES_ROW: rowKv('Responses', c.responses),
  });
}

const SECTIONS = [
  ['must', 'Must Do Today', 'sh1', (items) => items.map((c, i) => inboundCard(c, i + 1))],
  ['waitingYou', 'Waiting on Your Response', 'sh2', (items) => items.map((c, i) => inboundCard(c, i + 1))],
  ['waiting', 'Waiting on Others', 'sh3', (items) => items.map(waitingCard)],
  ['review', 'Review Quickly', 'sh4', (items) => items.map((c, i) => inboundCard(c, i + 1))],
];

function commitments(c) {
  const list = (label, rows) => (rows?.length ? fill('commit-list', {
    LABEL: label,
    ROWS: rows.map((r) => fill('commit-row', { WHO: esc(r.who), WHAT: esc(r.what), DUE: esc(r.due), STATUS: esc(r.status), OVERDUE: r.overdue ? frag('overdue-pill') : '' })).join(''),
  }) : '');
  return list('Mine', c.mine) + list('Others owe me', c.others);
}

function meetings(m) {
  const entries = (m.entries ?? []).map((e) => fill('meeting-card', { ENTRY: esc(e).replace(/\n/g, '<br>') }));
  const rest = (m.unsummarized ?? []).map((u) => fill('meeting-card', { ENTRY: `${esc(u)}: not summarized` }));
  return entries.concat(rest);
}

const duplicatePairs = (cards) => {
  const seen = new Map();
  for (const c of cards) { const k = `${c.person}\u0000${c.subject}`; seen.set(k, (seen.get(k) ?? 0) + 1); }
  return [...seen.values()].filter((n) => n > 1).length;
};

export function stats(d) {
  const must = d.must ?? [], waiting = d.waiting ?? [], review = d.review ?? [], waitingYou = d.waitingYou ?? [];
  const all = [...must, ...waitingYou, ...review];
  const people = new Map();
  const add = (name, key) => { const p = people.get(name) ?? { name, todo: 0, wait: 0 }; p[key]++; people.set(name, p); };
  must.forEach((c) => add(c.person, 'todo'));
  waiting.forEach((c) => c.recipients.replace(/,?\s*and \d+ more$/, '').split(/,\s*/).forEach((r) => add(r, 'wait')));
  const rows = [...people.values()].map((p) => ({ ...p, total: p.todo + p.wait })).sort((a, b) => b.total - a.total);
  const drafts = [...all, ...waiting].filter((c) => /Draft ready in Outlook/.test(`${c.why ?? ''} ${c.followUp ?? ''}`)).length;
  return {
    open: all.length + waiting.length, must: must.length, waiting: waiting.length, review: review.length, drafts,
    oldestOverdue: Math.max(0, ...must.map((c) => c.days)), longestWait: Math.max(0, ...waiting.map((c) => c.daysWaiting)),
    recipients: rows.length, duplicates: duplicatePairs(all), rows,
  };
}

const PURPLE = '#5B62D6', RED = '#B42318';
function kpiRows(tiles) {
  const tile = ([label, value, color = PURPLE, unit = '']) => fill('kpi-tile', {
    COLOR: color, VALUE: value, LABEL: label, UNIT: unit ? fill('kpi-unit', { COLOR: color, UNIT_TEXT: unit }) : '',
  });
  const out = [];
  for (let i = 0; i < tiles.length; i += 3) out.push(fill('kpi-row', { TILES: tiles.slice(i, i + 3).map(tile).join(frag('kpi-gap')) }));
  return out.join('');
}

function chart(s) {
  const top = s.rows.slice(0, 8), max = top[0]?.total ?? 1;
  return top.map((p) => {
    const todo = Math.round((p.todo / max) * 100), wait = Math.round((p.wait / max) * 100);
    const sub = [p.todo && `${p.todo} to do`, p.wait && `${p.wait} waiting`].filter(Boolean).join(', ');
    return fill('chart-row', { INITIALS: esc(initials(p.name)), NAME: esc(p.name), SUB: sub, PCT_TODO: todo, PCT_WAIT: wait, PCT_REST: Math.max(0, 100 - todo - wait), TOTAL: p.total });
  }).join('');
}

export function renderBrief(d) {
  const s = stats(d), eod = d.mode === 'end-of-day', mode = eod ? 'End-of-day' : 'Morning';
  const body = [];
  for (const [key, title, sclass, build] of SECTIONS) {
    const items = d[key] ?? [];
    if (items.length) body.push(fill('section-head', { SCLASS: sclass, TITLE: title, COUNT: items.length }), ...build(items));
  }
  const commit = commitments(d.commitments ?? {});
  if (commit) body.push(fill('section-head', { SCLASS: 'sh5', TITLE: 'Commitments', COUNT: (d.commitments.mine?.length ?? 0) + (d.commitments.others?.length ?? 0) }), commit);
  const meet = meetings(d.meetings ?? {});
  if (meet.length) body.push(fill('section-head', { SCLASS: 'sh6', TITLE: 'Meeting prep', COUNT: meet.length }), ...meet);
  const empty = !s.open && !commit;
  const emptyText = eod ? 'All clear for the rest of today.' : 'Inbox is clear.';
  if (empty) body.unshift(fill('empty', { TEXT: emptyText }));
  const tiles = eod
    ? [['Must do overdue', s.must], ['Overdue sent asks', s.waiting], ['Drafts ready', s.drafts], ['Oldest overdue', s.oldestOverdue, RED, 'days'], ['Longest wait', s.longestWait, PURPLE, 'days'], ['Recipients', s.recipients]]
    : [['Open items', s.open], ['Must do today', s.must], ['Waiting on others', s.waiting], ['Drafts ready', s.drafts], ['Review quickly', s.review], ['Oldest overdue', s.oldestOverdue, RED, 'days'], ['Longest wait', s.longestWait, PURPLE, 'days'], ['Recipients', s.recipients], ['Duplicate pairs', s.duplicates]];
  const headline = empty ? emptyText : eod
    ? `Overdue for you: ${s.must}. Overdue sent asks: ${s.waiting}. Start with the first card.`
    : `Needs you today: ${s.must}. Waiting on others: ${s.waiting}. Start with the first card.`;
  return fill('shell', {
    MODE: mode, AS_OF: esc(d.asOf), HEADLINE: headline, KPI_ROWS: empty ? '' : kpiRows(tiles),
    HIGHLIGHTS_ROW: d.highlights ? fill('highlights-row', { TEXT: esc(d.highlights) }) : '',
    CHART_ROW: s.rows.length ? fill('chart-block', { CHART_ROWS: chart(s) }) : '',
    BODY: body.join(''), NOTES: (d.notes ?? []).map((n) => `<p style="margin:0 0 6px 0">${esc(n)}</p>`).join(''), SUMMARY: esc(d.summary ?? ''),
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const html = renderBrief(JSON.parse(readFileSync(process.argv[2], 'utf8')));
  if (process.argv[3]) writeFileSync(process.argv[3], html); else process.stdout.write(html);
  console.error(`${html.length} characters`);
}
