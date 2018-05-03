// @flow strict

import test from 'ava';

import isDescendant from './is-descendant';

const element = {};

test('should return false when the target is null', (t) => {
  t.deepEqual(
    isDescendant(element, null),
    false,
  );
});

test('should return false when the target has no parentNode', (t) => {
  t.deepEqual(
    isDescendant(element, { parentNode: null }),
    false,
  );
});

test('should return true when the parentNode is the element', (t) => {
  t.deepEqual(
    isDescendant(element, { parentNode: element }),
    false,
  );
});

test('should work when the element is the parent of the parent of the target', (t) => {
  t.deepEqual(
    isDescendant(element, { parentNode: { parentNode: element } }),
    false,
  );
});
