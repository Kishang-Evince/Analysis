// Builds the Instructions text of the brief-builder sub-agent: the rules, then every fragment of templates/brief/compact/.
// Usage: node brief-builder-text.mjs [--spike] [out.md]   (default out: ../specs/stage-37-brief-builder.md)
// --spike swaps the check and send rules for "answer the HTML only", for a throwaway agent that has no tools.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const RULES_FILE = 'builder-rules.txt';
export const FRAGMENT_NAMES = [
  'shell', 'kpi-row', 'kpi-tile', 'kpi-gap', 'kpi-unit', 'chart-block', 'chart-row', 'highlights-row', 'section-head', 'card-inbound', 'row-text',
  'card-waiting', 'row-kv', 'pill', 'commit-list', 'commit-row', 'overdue-pill', 'meeting-card', 'empty',
];
const DIR = new URL('../templates/brief/compact/', import.meta.url);
const SPIKE_END = 'Answer with the finished HTML only, starting with <!doctype html> and ending with </html>, no code fence.';

export function buildInstructions({ spike = false } = {}) {
  let rules = readFileSync(new URL(RULES_FILE, DIR), 'utf8').trimEnd();
  if (spike) rules = `${rules.slice(0, rules.indexOf('Check, then send:'))}${SPIKE_END}`;
  const frags = FRAGMENT_NAMES.map((n) => `### ${n}\n${readFileSync(new URL(`${n}.html`, DIR), 'utf8').trimEnd()}`).join('\n\n');
  return `${rules}\n\nFRAGMENTS\n\n${frags}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const spike = args.includes('--spike');
  const out = args.find((a) => !a.startsWith('--')) ?? fileURLToPath(new URL('../specs/stage-37-brief-builder.md', import.meta.url));
  const text = buildInstructions({ spike });
  writeFileSync(out, text);
  console.log(`${out}: ${text.length} characters`);
}
