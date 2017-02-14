import test from 'ava';
import is from 'is_js';

import variables from './variables';

test('should return a function when called for the first time', (t) => {
  const handler = variables();

  t.true(is.function(handler));
});

test('should transform variables that were passed to the initial function', (t) => {
  const handler = variables({ variable: 'red' });

  t.deepEqual(handler('var(variable)'), 'red');
});
