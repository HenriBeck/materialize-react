import test from 'ava';

import typo from './typo';
import typography from './typography';

test('should return nothing when it\'s not a valid typography', (t) => {
  t.throws(() => typo());

  t.throws(() => typo('string'));
});

test('should return the typo object when a valid typography is provided', (t) => {
  t.plan(Object.keys(typography).length);

  Object
    .keys(typography)
    .forEach((key) => {
      t.deepEqual(typo(key), typography[key]);
    });
});
