// Hash a spec file the way the Glean editor text is hashed in the browser (the hashes recorded since stage 7): every line trimmed,
// blank lines and list numbers dropped, lines joined with a newline, SHA-256 (UTF-8), first 8 hex characters; the length is the UTF-16 length of that text.
// Usage: node spec-hash.mjs [--raw] <file>   prints "<hash> <length>"; --raw hashes the whole trimmed text instead (the stage 0 to 6 hashes).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const specHash = (text) => createHash('sha256').update(text.trim(), 'utf8').digest('hex').slice(0, 8);

export const editorText = (text) => text.split('\n').map((l) => l.trim().replace(/^(?:\d+[.)]\s*|[a-z][.)]\s+)/, '')).filter(Boolean).join('\n');
export const editorHash = (text) => specHash(editorText(text));

export async function main(argv, deps = {}) {
  const { readFile = (p) => readFileSync(p, 'utf8'), log = console.log, errorLog = console.error } = deps;
  const usage = 'Usage: node spec-hash.mjs [--raw] <file>';
  const raw = argv[0] === '--raw';
  const file = raw ? argv[1] : argv[0];
  if (!file) { errorLog(usage); return 2; }
  let text;
  try { text = readFile(file); } catch { errorLog(`Cannot read ${file}.\n${usage}`); return 2; }
  log(raw ? `${specHash(text)} ${text.trim().length}` : `${editorHash(text)} ${editorText(text).length}`);
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2));
