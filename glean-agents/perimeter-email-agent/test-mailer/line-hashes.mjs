// Per-line hashes of a spec file, to find which lines of the live Glean editor text differ from the spec.
// Browser side (same hashes): take the longest .ProseMirror element's innerText, split on newline, trim every line and strip the same
// list-number prefix as editorText, drop blank lines, SHA-256 each line with crypto.subtle.digest and keep the first 8 hex characters.
// Usage: node line-hashes.mjs <spec file> <file with the live hashes, one per line>   prints "line N: <expected text>" per changed line, exit 1 if any.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { editorText, specHash } from './spec-hash.mjs';

export const lineHashes = (text) => editorText(text).split('\n').filter(Boolean).map(specHash);

export const changedLines = (expected, live) => {
  const out = [];
  for (let i = 0; i < Math.max(expected.length, live.length); i++) if (expected[i] !== live[i]) out.push(i);
  return out;
};

export async function main(argv, deps = {}) {
  const { readFile = (p) => readFileSync(p, 'utf8'), log = console.log, errorLog = console.error } = deps;
  const [specFile, liveFile] = argv;
  if (!specFile || !liveFile) { errorLog('Usage: node line-hashes.mjs <spec file> <live hashes file>'); return 2; }
  let spec, live;
  try { spec = readFile(specFile); live = readFile(liveFile).split('\n').map((l) => l.trim()).filter(Boolean); } catch { errorLog('Cannot read the input files.'); return 2; }
  const lines = editorText(spec).split('\n').filter(Boolean);
  const bad = changedLines(lineHashes(spec), live);
  for (const i of bad) log(`line ${i + 1}: ${lines[i] ?? '(live has an extra line)'}`);
  log(bad.length ? `${bad.length} changed lines` : `all ${lines.length} lines match`);
  return bad.length ? 1 : 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2));
