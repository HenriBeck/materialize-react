import test from 'ava';

import getNextIndex from './get-next-index';

const array = new Array(6).fill(1);

test('should return the index if no correct direction is passed', (t) => {
  t.deepEqual(getNextIndex(array, 2), 2);
});

test('should return the previous index if the direction is left', (t) => {
  t.deepEqual(getNextIndex(array, 2, 'left'), 1);
});

test('should return the last index if the current is 0 and the direction is left', (t) => {
  t.deepEqual(getNextIndex(array, 0, 'left'), array.length - 1);
});

test('should return the next index if the direction is right', (t) => {
  t.deepEqual(getNextIndex(array, 2, 'right'), 3);
});

test('should return 0 if the current is the last index and the direction is right', (t) => {
  t.deepEqual(getNextIndex(array, array.length - 1, 'right'), 0);
});
