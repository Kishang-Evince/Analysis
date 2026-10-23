// Builds the Instructions text of the brief-builder sub-agent. It is the rules file, the HTML is made by the skill brief-render.
// Usage: node brief-builder-text.mjs [out.md]   (default out: ../specs/stage-38-brief-builder.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const RULES_FILE = new URL('../skills/brief-builder-rules.txt', import.meta.url);

export const buildInstructions = () => `${readFileSync(RULES_FILE, 'utf8').trimEnd()}\n`;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = process.argv[2] ?? fileURLToPath(new URL('../specs/stage-38-brief-builder.md', import.meta.url));
  const text = buildInstructions();
  writeFileSync(out, text);
  console.log(`${out}: ${text.length} characters`);
}
