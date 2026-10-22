import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { specHash, editorText, editorHash, main } from './spec-hash.mjs';

describe('specHash', () => {
  test('is the first 8 hex characters of the SHA-256 of the text', () => {
    assert.equal(specHash('abc'), 'ba7816bf');
  });

  test('ignores leading and trailing whitespace', () => {
    assert.equal(specHash('abc\n\n'), specHash('abc'));
    assert.equal(specHash('  abc'), specHash('abc'));
  });

  test('hashes the UTF-8 bytes: stable for non-ASCII text and sensitive to a changed character', () => {
    assert.equal(specHash('Straße — ✓'), specHash('Straße — ✓'));
    assert.notEqual(specHash('Straße — ✓'), specHash('Strasse — ✓'));
  });
});

describe('editorHash', () => {
  test('trims every line, drops blank lines and list numbers, as the hash computed in the Glean editor does', () => {
    assert.equal(editorHash('1. one\n\n  two  \n3) three'), editorHash('one\ntwo\nthree'));
  });

  test('drops letter list markers too, because the editor turns "a. " lines into a lower-alpha list', () => {
    assert.equal(editorHash('a. one\n b) two\nc.three'), editorHash('one\ntwo\nc.three'));
    assert.equal(editorText('e.g. one\nA mail'), 'e.g. one\nA mail');
  });

  test('reproduces the hash read back from the saved style-profiler sub-agent', () => {
    const text = readFileSync(new URL('../specs/stage-19-style-profiler.md', import.meta.url), 'utf8');
    assert.equal(editorHash(text), 'c0dcc095');
    assert.equal(editorText(text).length, 14190);
  });

  test('reproduces the recorded hash of the stage 10 text and of each sub-agent text', () => {
    const read = (f) => readFileSync(new URL(`../specs/${f}`, import.meta.url), 'utf8');
    assert.equal(editorHash(read('stage-10.md')), '377546ab');
    assert.equal(editorHash(read('stage-8-draft-writer.md')), '26d9d4cc');
    assert.equal(editorHash(read('stage-9-notes-keeper.md')), '3a7e0dfc');
    assert.equal(editorHash(read('stage-10-meeting-prep.md')), 'e876218a');
  });
});

describe('main', () => {
  const run = async (argv, readFile) => {
    const out = [];
    const err = [];
    const code = await main(argv, { readFile, log: (m) => out.push(m), errorLog: (m) => err.push(m) });
    return { code, out: out.join('\n'), err: err.join('\n') };
  };

  test('prints the hash and the trimmed length and returns 0', async () => {
    const r = await run(['f.md'], () => 'abc\n');
    assert.equal(r.code, 0);
    assert.equal(r.out, 'ba7816bf 3');
  });

  test('prints the editor hash by default and the raw hash with --raw', async () => {
    const text = '1. one\n\ntwo\n';
    assert.equal((await run(['f.md'], () => text)).out, `${editorHash(text)} ${editorText(text).length}`);
    assert.equal((await run(['--raw', 'f.md'], () => text)).out, `${specHash(text)} ${text.trim().length}`);
  });

  test('returns 2 with usage when no file is given', async () => {
    const r = await run([], () => 'abc');
    assert.equal(r.code, 2);
    assert.match(r.err, /Usage: node spec-hash\.mjs \[--raw\] <file>/);
  });

  test('returns 2 and names the file when it cannot be read', async () => {
    const r = await run(['nope.md'], () => { throw new Error('ENOENT'); });
    assert.equal(r.code, 2);
    assert.match(r.err, /nope\.md/);
  });
});
