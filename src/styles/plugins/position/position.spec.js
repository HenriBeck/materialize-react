import test from 'ava';

import position from './position';

test('should return an empty object when no args are passed', (t) => {
  t.deepEqual(position(), {});
});

test('should return only the position when only one arg is passed', (t) => {
  t.deepEqual(position('absolute'), { position: 'absolute' });
});

test('top, bottom, right and left should be the same when two args are passed', (t) => {
  t.deepEqual(position('absolute', 20), {
    position: 'absolute',
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  });
});

test('top / bottom and right / left should be equal when three args are passed', (t) => {
  t.deepEqual(position('absolute', 20, 10), {
    position: 'absolute',
    top: 20,
    right: 10,
    bottom: 20,
    left: 10,
  });
});

test('should set the fourth argument as the bottom property when provided', (t) => {
  t.deepEqual(position('absolute', 20, 10, 5), {
    position: 'absolute',
    top: 20,
    right: 10,
    bottom: 5,
    left: 10,
  });
});

test('should set the fifth argument as the left property when provided', (t) => {
  t.deepEqual(position('absolute', 20, 10, 5, 1), {
    position: 'absolute',
    top: 20,
    right: 10,
    bottom: 5,
    left: 1,
  });
});

