import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lineHashes, changedLines } from './line-hashes.mjs';

test('lineHashes returns one 8 hex hash per non-blank line', () => {
  const hashes = lineHashes('a\n\nb');
  assert.equal(hashes.length, 2);
  for (const h of hashes) assert.match(h, /^[0-9a-f]{8}$/);
});

test('lineHashes drops list numbers like editorText', () => {
  assert.deepEqual(lineHashes('1. a'), lineHashes('a'));
});

test('changedLines reports the differing index', () => {
  assert.deepEqual(changedLines(['x', 'y'], ['x', 'z']), [1]);
});

test('changedLines reports extra live lines', () => {
  assert.deepEqual(changedLines(['x'], ['x', 'y']), [1]);
});
