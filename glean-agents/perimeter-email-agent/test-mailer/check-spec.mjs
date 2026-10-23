// Check an instruction document pasted from the Glean agent against what a given stage must contain.
// Usage: node check-spec.mjs <stage 0-37> [file]   (default file: ../specs/stage-<stage>.md)
// Stage 0 compares line by line with Prompt 0 (ignoring markdown formatting); later stages check the markers in spec-stages.mjs.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { STAGES } from './spec-stages.mjs';

const HERE = new URL('.', import.meta.url);
const PROMPT_0 = new URL('../prompts/EMAIL-01-prompt-0-parity.md', HERE);

// Fold away what a rich-text editor changes: escapes, bold, backticks, heading marks, dash kinds, spacing, case.
export const normalize = (text) =>
  text.replace(/\\/g, '').replace(/[*`#>]/g, '').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase();

// Also drop list numbers and horizontal rules, which a rich editor renders instead of keeping as text.
const normalizeLine = (line) => normalize(line.replace(/^\s*[-•]\s+/, '').replace(/^\s*\d+[.)]\s+/, '')).replace(/^[-_]{3,}$/, '');

export function extractInstructions(promptMarkdown) {
  const lines = promptMarkdown.split('\n');
  const start = lines.indexOf('INSTRUCTIONS');
  if (start === -1) throw new Error('No INSTRUCTIONS line in the prompt file');
  const end = lines.indexOf('```', start);
  return lines.slice(start + 1, end === -1 ? undefined : end).join('\n');
}

const textMarkers = (stage, stages) => {
  const present = new Set();
  const absent = new Set();
  for (const s of stages.slice(1, stage + 1)) {
    for (const p of s.present) { present.add(p); absent.delete(p); }
    for (const a of s.absent) { absent.add(a); present.delete(a); }
  }
  return { present: [...present], absent: [...absent] };
};

const lineSet = (text) => new Set(text.split('\n').map(normalizeLine).filter(Boolean));

export function checkSpec(stage, spec, { expected, stages = STAGES } = {}) {
  const problems = [];
  if (stage === 0) {
    const want = lineSet(expected);
    const have = lineSet(spec);
    for (const l of want) if (!have.has(l)) problems.push(`missing line: ${l}`);
    for (const l of have) if (!want.has(l)) problems.push(`extra line: ${l}`);
  } else {
    const text = normalize(spec);
    const { present, absent } = textMarkers(stage, stages);
    for (const p of present) if (!text.includes(normalize(p))) problems.push(`missing: ${p}`);
    for (const a of absent) {
      const found = a instanceof RegExp ? a.test(text) : text.includes(normalize(a));
      if (found) problems.push(`old text still there: ${a}`);
    }
  }
  return { stage, ok: problems.length === 0, problems };
}

// Sub-agents: a stage entry may carry subs: { name: { present, absent } }. Markers accumulate per sub-agent over the stages.
export const subNames = (stage, stages = STAGES) => Object.keys(stages[stage]?.subs ?? {});

export function checkSub(stage, name, spec, { stages = STAGES } = {}) {
  const text = normalize(spec);
  const { present, absent } = textMarkers(stage, stages.map((s) => s.subs?.[name] ?? { present: [], absent: [] }));
  const problems = [];
  for (const p of present) if (!text.includes(normalize(p))) problems.push(`missing: ${p}`);
  for (const a of absent) if (text.includes(normalize(a))) problems.push(`old text still there: ${a}`);
  return { stage, name, ok: problems.length === 0, problems };
}

// The text inside the index-th fenced code block of a prompt file (the fence lines are dropped).
export const editBlock = (promptMarkdown, index = 0) => {
  const block = [...promptMarkdown.matchAll(/^```[^\n]*\n([\s\S]*?)^```/gm)][index];
  if (!block) throw new Error(`No code block ${index}`);
  return block[1].replace(/\n$/, '');
};

export async function main(argv, deps = {}) {
  const {
    readFile = (p) => readFileSync(p, 'utf8'), log = console.log, errorLog = console.error,
    defaultSpecPath = (n) => fileURLToPath(new URL(`../specs/stage-${n}.md`, HERE)),
    defaultSubSpecPath = (n, name) => fileURLToPath(new URL(`../specs/stage-${n}-${name}.md`, HERE)),
    expected, stages = STAGES,
  } = deps;
  const usage = 'Usage: node check-spec.mjs <stage 0-37> [file]';
  const stage = Number(argv[0]);
  if (!Number.isInteger(stage) || stage < 0 || stage > 37) { errorLog(usage); return 2; }
  const file = argv[1] ?? defaultSpecPath(stage);
  let spec;
  try { spec = readFile(file); } catch { errorLog(`Cannot read ${file}. Copy the Instructions tab text into it first.\n${usage}`); return 2; }
  const result = checkSpec(stage, spec, { expected: expected ?? (stage === 0 ? extractInstructions(readFileSync(PROMPT_0, 'utf8')) : undefined), stages });
  let code = 0;
  if (result.ok) log(`PASS stage ${stage}: ${file}`);
  else {
    code = 1;
    log(`FAIL stage ${stage}: ${file}`);
    for (const p of result.problems) log(`  ${p}`);
  }
  for (const name of subNames(stage, stages)) {
    const subFile = defaultSubSpecPath(stage, name);
    let subSpec;
    try { subSpec = readFile(subFile); } catch {
      errorLog(`Cannot read ${subFile}. Copy the sub-agent's Instructions text into it first.\n${usage}`);
      code = Math.max(code, 2);
      continue;
    }
    const sub = checkSub(stage, name, subSpec, { stages });
    if (sub.ok) log(`PASS stage ${stage} sub ${name}: ${subFile}`);
    else {
      code = Math.max(code, 1);
      log(`FAIL stage ${stage} sub ${name}: ${subFile}`);
      for (const p of sub.problems) log(`  ${p}`);
    }
  }
  return code;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2));
