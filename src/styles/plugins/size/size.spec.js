import test from 'ava';

import size from './size';

test('should return nothing when no args are passed', (t) => {
  t.deepEqual(size(), {});
});

test('should return an object with height and width being equal with only one argument', (t) => {
  const styles = size(10);

  t.deepEqual(styles.width, styles.height);
});

test('should return an object with width and height when 2 args are passed', (t) => {
  t.deepEqual(size(10, 20), {
    width: 10,
    height: 20,
  });
});
