// @flow strict

import test from 'ava';

import getCoords from './get-coords';

test('should return null when no coordinates were found ', (t) => {
  t.deepEqual(
    // $FlowFixMe: Find a way of simulating an actual synthetic react event
    getCoords(new FocusEvent('focus')),
    null,
  );
});

test('should return the coords when it\'s a mouse event', (t) => {
  // Simulated mouse event
  const ev = new MouseEvent('mousedown');

  // $FlowFixMe: Find a way of simulating an actual synthetic react event
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

  // $FlowFixMe: Find a way of simulating an actual synthetic react event
  t.deepEqual(getCoords(ev), {
    x: ev.touches[0].clientX,
    y: ev.touches[0].clientY,
  });
});
