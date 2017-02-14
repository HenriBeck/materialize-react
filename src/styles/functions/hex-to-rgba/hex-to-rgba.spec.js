import test from 'ava';

import hexToRgba from './hex-to-rgba';

test('should return false when no hex string is provided', (t) => {
  t.throws(hexToRgba);
});

test('should throw an error when a not valid hex string is provided', (t) => {
  t.throws(() => hexToRgba('notAValidHex'));
});

test('should default alpha to 1', (t) => {
  t.deepEqual(
    hexToRgba('#ffffff'),
    'rgba(255, 255, 255, 1)',
  );
});

test('should accept the alpha as the second argument', (t) => {
  t.deepEqual(
    hexToRgba('#ffffff', 0.5),
    'rgba(255, 255, 255, 0.5)',
  );
});

