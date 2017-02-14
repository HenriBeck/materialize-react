import test from 'ava';

import getNotDeclaredProps from './get-not-declared-props';

test('should return an empty object when no arg is provided', (t) => {
  t.deepEqual(
    getNotDeclaredProps(),
    {},
  );
});

test('should return not declared props when an instance is passed', (t) => {
  t.deepEqual(
    // We are simulating a React Component here
    getNotDeclaredProps({
      props: {
        prop: 'value',
        declaredProp: 'valid value',
        name: 'test',
      },
      _reactInternalInstance: {
        _currentElement: {
          type: {
            propTypes: {
              declaredProp: Number,
              name: String,
            },
          },
        },
      },
    }),
    { prop: 'value' },
  );
});
