import test from 'ava';
import is from 'is_js';

import shadow from './elevation';

test('should return boxShadow none when elevation is 0', (t) => {
  t.deepEqual(shadow(0), 'none');
});

test('should return an object with boxShadow property when elevation is between 1 and 7', (t) => {
  const elevations = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
  ];

  t.plan(7);

  elevations.forEach((number) => {
    t.true(is.string(shadow(number)));
  });
});

test('should return boxShadow none when elevation is not a valid number/elevation', (t) => {
  t.deepEqual(shadow('string'), 'none');

  t.deepEqual(shadow(20), 'none');
});
