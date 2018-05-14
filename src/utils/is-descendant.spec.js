// @flow strict-local

import test from 'ava';

import isDescendant from './is-descendant';

test('should return false when the target is null', (t) => {
  const element = document.createElement('div');

  t.deepEqual(
    isDescendant(element, null),
    false,
  );
});

test('should return false when the target has no parentNode', (t) => {
  t.deepEqual(
    isDescendant(document.createElement('div'), document.createElement('div')),
    false,
  );
});

test('should return true when the parentNode is the element', (t) => {
  const target = document.createElement('div');
  const element = document.createElement('div');

  element.appendChild(target);

  t.deepEqual(
    isDescendant(element, target),
    true,
  );
});

test('should work when the element is the parent of the parent of the target', (t) => {
  const target = document.createElement('div');
  const container = document.createElement('div');
  const element = document.createElement('div');

  container.appendChild(target);

  element.appendChild(container);

  t.deepEqual(
    isDescendant(element, target),
    true,
  );
});
