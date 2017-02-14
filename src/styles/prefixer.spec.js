import test from 'ava';
import is from 'is_js';

import Prefixer from './prefixer';

test('should be able to transform css property into valid js property', (t) => {
  t.deepEqual(Prefixer.cssToJS('user-select'), 'userSelect');
  t.deepEqual(Prefixer.cssToJS('userSelect'), 'userSelect');
});

test('should have prefixes and a element defined on the instance', (t) => {
  const prefixer = new Prefixer();

  t.true(is.array(prefixer.prefixes));
  t.true(prefixer.element instanceof HTMLElement);
});

test('should return the css property when the normal is supported', (t) => {
  const prefixer = new Prefixer();

  prefixer.element = { style: { userSelect: 'none' } };

  t.deepEqual(prefixer.prefix('userSelect'), 'userSelect');
  t.deepEqual(prefixer.prefix('user-select'), 'userSelect');
});

test('should return the prefixed property when the normal property isn\'t supported', (t) => {
  const prefixer = new Prefixer();

  prefixer.element = { style: { webkitUserSelect: 'none' } };

  t.deepEqual(prefixer.prefix('userSelect'), 'WebkitUserSelect');
  t.deepEqual(prefixer.prefix('user-select'), 'WebkitUserSelect');
});

test('should return the property when the normal and no prefixed version is supported', (t) => {
  const prefixer = new Prefixer();

  prefixer.element = { style: {} };

  t.deepEqual(prefixer.prefix('userSelect'), 'userSelect');
  t.deepEqual(prefixer.prefix('user-select'), 'userSelect');
});
