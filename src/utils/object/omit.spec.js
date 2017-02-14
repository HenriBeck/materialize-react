import test from 'ava';

import omit from './omit';

test('should return an empty object when no args are passed', (t) => {
  t.deepEqual(
    omit(),
    {},
  );
});

test('should return the same object when no keys are provided to omit', (t) => {
  t.deepEqual(
    omit({ key: 'value' }),
    { key: 'value' },
  );
});

test('should remove a key', (t) => {
  t.deepEqual(
    omit({ key: 'value' }, 'key'),
    {},
  );
});

test('should remove a key and leave one', (t) => {
  t.deepEqual(
    omit({
      key: 'value',
      secondKey: 'second value',
    }, 'key'),
    { secondKey: 'second value' },
  );
});

test('should handle multiple arguments correctly', (t) => {
  t.deepEqual(
    omit({
      key: 'value',
      thirdKey: 'third key',
      fourthKey: 'fourth value',
    }, [
      'key',
      'secondKey',
    ], 'thirdKey'),
    { fourthKey: 'fourth value' },
  );
});
