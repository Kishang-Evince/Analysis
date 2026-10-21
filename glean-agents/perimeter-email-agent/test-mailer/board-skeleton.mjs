// Layout signature of a board: the headings in order, and for every card the sequence of its field labels.
// Two boards have the same layout when their signatures are equal; item counts and values may differ.
// Usage: node board-skeleton.mjs <board1.md> <board2.md> ...   (prints each signature and whether all are equal)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function skeleton(markdown) {
  const heads = [];
  const cardShapes = new Set();
  let card = null;
  const close = () => { if (card) { cardShapes.add(card.join('|')); card = null; } };
  for (const raw of markdown.split('\n')) {
    const line = raw.trim();
    if (/^#{1,3}\s/.test(line)) { close(); heads.push(line.replace(/\s+—\s+As of .*/, ' — As of DATE')); continue; }
    if (/^\*\*.+\*\*$/.test(line) && !/^\*\*(VIP and topics|Highlights):/.test(line)) { close(); card = []; continue; }
    const field = line.match(/^[-*]\s+([A-Za-z][A-Za-z ]*):/);
    if (field && card) card.push(field[1]);
    else if (/^Inbound: .* excluded/.test(line)) { close(); heads.push('SUMMARY'); }
  }
  close();
  return { headings: heads, cardShapes: [...cardShapes].sort() };
}

export const sameLayout = (boards) => {
  const sigs = boards.map((b) => JSON.stringify(skeleton(b)));
  return sigs.every((s) => s === sigs[0]);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const boards = process.argv.slice(2).map((p) => readFileSync(p, 'utf8'));
  boards.forEach((b, i) => console.log(`board ${i + 1}: ${JSON.stringify(skeleton(b))}`));
  console.log(sameLayout(boards) ? 'SAME LAYOUT' : 'DIFFERENT LAYOUT');
  process.exitCode = sameLayout(boards) ? 0 : 1;
}
