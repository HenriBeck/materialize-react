import test from 'ava';

import warning from './warning';

test('should return false when the NODE_ENV is production', (t) => {
  process.env.NODE_ENV = 'production';

  t.deepEqual(warning(false, 'Message'), false);
});

test('should return the condition when the NODE_ENV is not production', (t) => {
  process.env.NODE_ENV = 'development';

  t.deepEqual(warning(false, 'Message'), false);
});

test('should throw an error if the condition is true with the message', (t) => {
  process.env.NODE_ENV = 'development';

  t.throws(() => warning(true, 'Message'));
});

