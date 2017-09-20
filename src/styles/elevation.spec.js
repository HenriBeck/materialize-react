import test from 'ava';

import shadow from './elevation';

test('should return boxShadow none when elevation is 0', (t) => {
  t.deepEqual(shadow(0), 'none');
});

test('should return an object with boxShadow property when elevation is between 1 and 7', (t) => {
  const elevations = [
    2,
    3,
    4,
    6,
    8,
    12,
    16,
    24,
  ];

  t.plan(elevations.length);

  elevations.forEach((number) => {
    t.deepEqual(typeof shadow(number), 'string');
  });
});

test('should throw an error if it\'s not a valid elevation', (t) => {
  t.throws(() => shadow(100));
});
