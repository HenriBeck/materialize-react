import test from 'ava';
import sinon from 'sinon';

import {
  head,
  undef,
  pipe,
  filter,
} from './functions';

test('should give me the first element of a list', (t) => {
  t.deepEqual(head([1]), 1);
});

test('should return true when the value is undefined', (t) => {
  t.deepEqual(undef(undefined), true); // eslint-disable-line no-undefined
});

test('should call all of the functions passed with the previous return value', (t) => {
  const func1 = sinon.spy();
  const func2 = sinon.spy();

  pipe(func1, func2)(null);

  t.deepEqual(func1.callCount, 1);
  t.deepEqual(func2.callCount, 1);
});

test('should filter an array for all of the values that return true', (t) => {
  t.deepEqual(
    filter(val => val === 1)([1, 2]),
    [1],
  );
});
