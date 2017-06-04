import test from 'ava';

import {
  getCenter,
  getCoords,
  getDistanceToFarthestCorner,
} from './utils';

test('should get the center of a rect', (t) => {
  t.deepEqual(getCenter({
    width: 10,
    height: 10,
  }), {
    x: 5,
    y: 5,
  });
});

test('should return null if no event was passed', (t) => {
  t.deepEqual(getCoords(), null);
});

test('should get the coordinates from a touch event', (t) => {
  t.deepEqual(getCoords({
    touches: [{
      clientX: 10,
      clientY: 10,
    }],
  }), {
    x: 10,
    y: 10,
  });
});

test('should get the coordinates from the clientX and clientY', (t) => {
  t.deepEqual(getCoords({
    clientX: 10,
    clientY: 10,
  }), {
    x: 10,
    y: 10,
  });
});

test('should get the coordinates from the x and y', (t) => {
  t.deepEqual(getCoords({
    x: 10,
    y: 10,
  }), {
    x: 10,
    y: 10,
  });
});

test('should return null if no coordinates were found', (t) => {
  t.deepEqual(getCoords({}), null);
});

test('should get the distance to the farthest corner', (t) => {
  t.deepEqual(getDistanceToFarthestCorner({
    x: 5,
    y: 5,
  }, {
    height: 10,
    width: 10,
  }), 50 ** 0.5);
});
