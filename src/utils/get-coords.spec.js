// @flow strict

import test from 'ava';

import getCoords from './get-coords';

test('should return null when no coordinates were found ', (t) => {
  t.deepEqual(
    getCoords(new FocusEvent('focus')),
    null,
  );
});

test('should return the coords when it\'s a mouse event', (t) => {
  // Simulated mouse event
  const ev = new MouseEvent('mousedown');

  t.deepEqual(getCoords(ev), {
    x: ev.clientX,
    y: ev.clientY,
  });
});

test('should return the coords when it\'s a touch event', (t) => {
  // Simulated touch event
  const ev = new TouchEvent('touchstart', {
    touches: [{
      clientX: 5,
      clientY: 5,
    }],
  });

  t.deepEqual(getCoords(ev), {
    x: ev.touches[0].clientX,
    y: ev.touches[0].clientY,
  });
});
