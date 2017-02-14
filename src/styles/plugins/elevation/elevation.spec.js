import test from 'ava';

import shadow from './elevation';

test('should return boxShadow none when elevation is 0', (t) => {
  t.deepEqual(
    shadow(0),
    { boxShadow: 'none' },
  );
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
    t.true(Boolean(shadow(number).boxShadow));
  });
});

test('should return boxShadow none when elevation is not a valid number/elevation', (t) => {
  t.deepEqual(
    shadow('string'),
    { boxShadow: 'none' },
  );

  t.deepEqual(
    shadow(20),
    { boxShadow: 'none' },
  );
});
