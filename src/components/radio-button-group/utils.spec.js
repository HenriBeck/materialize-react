import test from 'ava';

import {
  hasDuplicates,
  countElementsInArray,
} from './utils';

test('should correctly count the elements in an array', (t) => {
  t.deepEqual(countElementsInArray(['first', 'second', 'first']), {
    first: 2,
    second: 1,
  });
});

test('should check if an array has duplicates', (t) => {
  t.deepEqual(hasDuplicates(['first', 'second', 'first']), true);
});
