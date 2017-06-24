import test from 'ava';

import getNotDeclaredProps from './get-not-declared-props';

test('should return not declared props when an instance is passed', (t) => {
  t.deepEqual(
    getNotDeclaredProps({
      prop: 'value',
      declaredProp: 'valid value',
      name: 'test',
    }, {
      propTypes: {
        declaredProp: Number,
        name: String,
      },
    }),
    { prop: 'value' },
  );
});
