import test from 'ava';

import map from './map';

test('should return empty object when no args are passed', (t) => {
  t.deepEqual(
    map(),
    {},
  );
});

test('should return the same object when no callback is provided', (t) => {
  t.deepEqual(
    map({ key: 'value' }),
    { key: 'value' },
  );
});

test('should return same object when returning the values', (t) => {
  t.deepEqual(map({ key: 5 }, val => val), { key: 5 });
});

test('should change values in the object', (t) => {
  t.deepEqual(map({ key: 5 }, val => val + 5), { key: 10 });
});
