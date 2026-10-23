// Writes the chat board (layout of the board-layout skill) from the brief test data. Input of the brief-builder spike and canned Preview runs.
// Usage: node brief-board.mjs <data.json> [out.md]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const marks = (c) => [c.vip && 'VIP', c.topic && `Topic: ${c.topic}`].filter(Boolean);
const header = (name, c) => `**${[name, c.subject, ...marks(c)].join(' | ')}**`;
const bullets = (pairs) => pairs.filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => `- ${k}: ${v}`);

const inbound = (c) => [header(c.person, c), ...bullets([
  ['Ask', c.ask], ['Action', c.action], ['Why included', c.why], ['Due', c.due], ['Confidence', c.confidence], ['Ownership', c.ownership],
  ['Original ask', c.original], ['Latest update', c.latest], ['Messages', c.messages], ['More asks', c.more], ['Also waiting on', c.also && `${c.also}.`],
])].join('\n');

const waiting = (c) => [header(c.recipients, c), ...bullets([
  ['What you asked', c.asked], ['Sent', c.sent], ['Staleness', c.staleness], ['Days waiting', c.daysWaiting], ['Follow-up', c.followUp], ['Responses', c.responses],
])].join('\n');

const row = (r) => `- ${[r.who, r.what, `Due: ${r.due}`, `Status: ${r.status}`, r.overdue && 'Overdue'].filter(Boolean).join(' | ')}`;

export function renderBoard(d) {
  const eod = d.mode === 'end-of-day';
  const out = [`# Outlook Action Board: ${eod ? 'End-of-day' : 'Morning'}, as of ${d.asOf}`];
  const sections = [
    ['## 🔴 Must Do Today', d.must, inbound], ['## 🟡 Waiting on Your Response', d.waitingYou, inbound],
    ['## 🟠 Waiting on Others', d.waiting, waiting], ['## 🔵 Review Quickly', d.review, inbound],
  ];
  const mine = d.commitments?.mine ?? [], others = d.commitments?.others ?? [];
  const meet = d.meetings ?? {};
  const meetingLines = [...(meet.entries ?? []), ...(meet.unsummarized ?? []).map((u) => `- ${u}: not summarized`)];
  const empty = !sections.some(([, items]) => items?.length) && !mine.length && !others.length;
  if (empty) out.push(eod ? 'All clear for the rest of today.' : 'Inbox is clear.');
  if (d.highlights) out.push(`**Highlights:** ${d.highlights}`);
  for (const [title, items, fn] of sections) if (items?.length) out.push(title, items.map(fn).join('\n\n'));
  if (mine.length || others.length) {
    out.push('## Commitments');
    if (mine.length) out.push(['**Mine**', ...mine.map(row)].join('\n'));
    if (others.length) out.push(['**Others owe me**', ...others.map(row)].join('\n'));
  }
  if (meetingLines.length) out.push('## Meeting prep', meetingLines.join('\n'));
  out.push([...(d.notes ?? []), d.summary ?? ''].join('\n'));
  return `${out.join('\n\n')}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const md = renderBoard(JSON.parse(readFileSync(process.argv[2], 'utf8')));
  if (process.argv[3]) writeFileSync(process.argv[3], md); else process.stdout.write(md);
}
