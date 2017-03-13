import test from 'ava';

import Event from './event';

test('should get the cords from the event when it\'s a touch event', (t) => {
  const event = new Event({
    touches: [{
      clientX: 20,
      clientY: 10,
    }],
  });

  t.deepEqual(event.getCords(), {
    x: 20,
    y: 10,
  });
});

test('should get the cords when they are in the x and y property', (t) => {
  const event = new Event({
    x: 20,
    y: 10,
  });

  t.deepEqual(event.getCords(), {
    x: 20,
    y: 10,
  });
});

test('should get the cords when they are in the clientX and clientY property', (t) => {
  const event = new Event({
    clientX: 20,
    clientY: 10,
  });

  t.deepEqual(event.getCords(), {
    x: 20,
    y: 10,
  });
});

test('should return null when no cords are available', (t) => {
  const event = new Event();

  t.deepEqual(event.getCords(), null);
});
