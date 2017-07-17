import test from 'ava';

import hasDuplicates from './has-duplicates';

test('should check if an array has duplicates', (t) => {
  t.deepEqual(hasDuplicates(['first', 'second', 'first']), true);

  t.deepEqual(hasDuplicates(['first', 'second', 'third']), false);
});
