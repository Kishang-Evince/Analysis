import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalize, extractInstructions, checkSpec, main } from './check-spec.mjs';
import { STAGES } from './spec-stages.mjs';

const PROMPTS = new URL('../prompts/', import.meta.url);
const PROMPT_FILES = [
  'EMAIL-01-prompt-0-parity.md', 'EMAIL-01-prompt-1-lookback-dates-replies.md', 'EMAIL-02-prompt-2-commitments.md',
  'EMAIL-03-prompt-3-asks.md', 'EMAIL-04-prompt-4-reply-quality.md', 'EMAIL-05-prompt-5-due-dates.md',
  'EMAIL-06-prompt-6-brief-delivery.md', 'EMAIL-07-prompt-7-drafts.md', 'EMAIL-08-prompt-8-writing-style.md',
  'EMAIL-09-prompt-9-vip-topics.md', 'EMAIL-10-11-prompt-10-meeting-prep.md',
];
const promptText = (n) => readFileSync(new URL(PROMPT_FILES[n], PROMPTS), 'utf8');
const stage0 = () => extractInstructions(promptText(0));

// A spec that satisfies every present marker up to a stage, built from the stage data itself.
const specFor = (stage, stages = STAGES) =>
  stages.slice(1, stage + 1).flatMap((s) => s.present.filter((p) => typeof p === 'string')).join('\n');

describe('normalize', () => {
  test('drops markdown noise, folds dashes, keeps underscores, lowercases', () => {
    assert.equal(normalize('## **Step 1 — Retrieve Recent Emails**'), 'step 1 - retrieve recent emails');
    assert.equal(normalize('LOOKBACK\\_DAYS: 14'), 'lookback_days: 14');
    assert.equal(normalize('a   b\n  c'), 'a b c');
  });
});

describe('extractInstructions', () => {
  test('returns the text between the INSTRUCTIONS line and the closing fence', () => {
    const md = 'x\n```\nAGENT SETUP\n- a\n\nINSTRUCTIONS\nline1\nline2\n```\nafter';
    assert.equal(extractInstructions(md), 'line1\nline2');
  });
  test('fails loudly when the marker is missing', () => {
    assert.throws(() => extractInstructions('no marker here'), /INSTRUCTIONS/);
  });
});

describe('stage 0 (parity with Prompt 0)', () => {
  test('the exact Prompt 0 text passes', () => {
    const r = checkSpec(0, stage0(), { expected: stage0() });
    assert.equal(r.ok, true);
  });

  test('markdown formatting differences from a rich editor do not matter', () => {
    const noisy = stage0().replace(/^\* /gm, '- ').replace(/\*\*/g, '').replace(/_/g, '\\_').replace(/ {2}$/gm, '').replace(/\[/g, '\\[');
    assert.equal(checkSpec(0, noisy, { expected: stage0() }).ok, true);
  });

  test('list numbers and horizontal rules dropped by a rich editor do not matter', () => {
    const stripped = stage0().replace(/^\d+\.\s+/gm, '').replace(/^---$/gm, '');
    assert.notEqual(stripped, stage0());
    assert.equal(checkSpec(0, stripped, { expected: stage0() }).ok, true);
  });

  test('a changed line is reported as missing and the new line as extra', () => {
    const changed = stage0().replace('UNREAD_DAYS: 5', 'UNREAD_DAYS: 7');
    const r = checkSpec(0, changed, { expected: stage0() });
    assert.equal(r.ok, false);
    assert.match(r.problems.join('\n'), /missing.*unread_days: 5/i);
    assert.match(r.problems.join('\n'), /extra.*unread_days: 7/i);
  });
});

describe('later stages (markers)', () => {
  test('a spec holding every marker up to stage 1 passes', () => {
    assert.equal(checkSpec(1, specFor(1)).ok, true);
  });

  test('a missing marker is reported by name', () => {
    const r = checkSpec(1, specFor(1).replace('Step 1B — Absolute Dates', ''));
    assert.equal(r.ok, false);
    assert.match(r.problems.join('\n'), /Step 1B — Absolute Dates/);
  });

  test('old text that must be gone fails when still present', () => {
    const r = checkSpec(1, `${specFor(1)}\n* UNREAD_DAYS: 5`);
    assert.equal(r.ok, false);
    assert.match(r.problems.join('\n'), /UNREAD_DAYS/);
  });

  test('stages are cumulative: stage 2 needs the stage 1 markers too', () => {
    const onlyStage2 = STAGES[2].present.join('\n');
    const r = checkSpec(2, onlyStage2);
    assert.equal(r.ok, false);
    assert.match(r.problems.join('\n'), /Step 1B — Absolute Dates/);
  });

  test('a phrase required at one stage and removed at a later one is forbidden from then on', () => {
    const stages = [{ present: [], absent: [] }, { present: ['alpha'], absent: [] }, { present: [], absent: ['alpha'] }];
    assert.equal(checkSpec(1, 'alpha', { stages }).ok, true);
    assert.equal(checkSpec(2, 'alpha', { stages }).ok, false);
    assert.equal(checkSpec(2, 'beta', { stages }).ok, true);
  });

  test('stage 8 rewrites one sentence: the new wording passes, the old wording fails', () => {
    const base = specFor(8);
    assert.equal(checkSpec(8, base).ok, true);
    const old = `${base}\nDo **not** include \`body\` in any \`select\` list.`;
    assert.equal(checkSpec(8, old).ok, false);
  });
});

describe('stage data stays tied to the prompt files', () => {
  test('there is one entry per stage, 0 to 10', () => {
    assert.equal(STAGES.length, 11);
    for (const s of STAGES) assert.ok(Array.isArray(s.present) && Array.isArray(s.absent));
  });

  test('every text marker up to stage N appears in the prompt files up to stage N', () => {
    STAGES.forEach((stage, n) => {
      if (n === 0) return;
      const corpus = normalize(PROMPT_FILES.slice(0, n + 1).map((_, i) => promptText(i)).join('\n'));
      for (const m of [...stage.present, ...stage.absent].filter((x) => typeof x === 'string')) {
        assert.ok(corpus.includes(normalize(m)), `stage ${n}: marker "${m}" is not in the prompt files`);
      }
    });
  });
});

describe('main', () => {
  const run = async (argv, files = {}) => {
    const out = [];
    const err = [];
    const code = await main(argv, {
      readFile: (p) => { if (p in files) return files[p]; throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' }); },
      log: (m) => out.push(m), errorLog: (m) => err.push(m), defaultSpecPath: (n) => `specs/stage-${n}.md`, expected: stage0(),
    });
    return { code, out: out.join('\n'), err: err.join('\n') };
  };

  test('exit 0 and PASS when the spec matches', async () => {
    const r = await run(['1', 'a.md'], { 'a.md': specFor(1) });
    assert.equal(r.code, 0);
    assert.match(r.out, /PASS/);
  });

  test('exit 1 and the failing marker when the spec does not match', async () => {
    const r = await run(['1', 'a.md'], { 'a.md': 'nothing useful' });
    assert.equal(r.code, 1);
    assert.match(r.out, /FAIL/);
    assert.match(r.out, /Step 1B — Absolute Dates/);
  });

  test('uses the default file for the stage when none is given', async () => {
    const r = await run(['1'], { 'specs/stage-1.md': specFor(1) });
    assert.equal(r.code, 0);
  });

  test('exit 2 with usage for a bad stage or a missing file', async () => {
    assert.equal((await run(['11'])).code, 2);
    assert.equal((await run(['x'])).code, 2);
    const missing = await run(['1', 'nope.md']);
    assert.equal(missing.code, 2);
    assert.match(missing.err, /nope\.md/);
    assert.match(missing.err, /Copy the Instructions tab text into it/);
  });
});
