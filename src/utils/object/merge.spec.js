import test from 'ava';

import merge from './merge';

test('should return an empty object when no args are passed', (t) => {
  t.deepEqual(
    merge(),
    {},
  );
});

test('should return the same object', (t) => {
  t.deepEqual(
    merge({ key: 'value' }),
    { key: 'value' },
  );
});

test('should merge two objects', (t) => {
  t.deepEqual(
    merge(
      { key: 'value' },
      { anotherKey: 'another value' },
    ), {
      key: 'value',
      anotherKey: 'another value',
    },
  );
});

test('should ignore arguments that are not objects', (t) => {
  t.deepEqual(
    merge(
      { key: 'value' },
      { anotherKey: 'another value' },
      'string',
    ), {
      key: 'value',
      anotherKey: 'another value',
    },
  );
});

test('should concatenate two arrays', (t) => {
  t.deepEqual(
    merge({
      array: [
        'value',
        'value2',
      ],
    }, { array: ['value3'] }), {
      array: [
        'value',
        'value2',
        'value3',
      ],
    },
  );
});

test('should merge three objects', (t) => {
  t.deepEqual(
    merge(
      { key: 'value' },
      { secondKey: 'second value' },
      { thirdKey: 'third value' },
    ), {
      key: 'value',
      secondKey: 'second value',
      thirdKey: 'third value',
    },
  );
});

test('should merge objects with nested objects', (t) => {
  t.deepEqual(
    merge(
      { nested: { key: 'value' } },
      { nested: { secondKey: 'second value' } },
    ), {
      nested: {
        key: 'value',
        secondKey: 'second value',
      },
    },
  );
});

test('should handle all types correctly', (t) => {
  const date = new Date();

  t.deepEqual(
    merge(
      { number: 4 },
      { string: 'string' },
      { boolean: true },
      { nested: { key: 'value' } },
      { array: ['value'] },
      { date },
      { regex: /regex/g },
    ), {
      number: 4,
      string: 'string',
      boolean: true,
      date,
      array: ['value'],
      regex: /regex/g,
      nested: { key: 'value' },
    },
  );
});
