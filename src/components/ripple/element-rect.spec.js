import test from 'ava';

import ElementRect from './element-rect';

const element = document.createElement('div');
const rect = new ElementRect(element);

test('should create the instance', (t) => {
  t.true(rect instanceof ElementRect);
  t.deepEqual(rect.height, 0);
  t.deepEqual(rect.width, 0);
  t.deepEqual(rect.size, 0);
});

test('should have the center function defined', (t) => {
  t.deepEqual(rect.center, {
    x: 0,
    y: 0,
  });
});

test('should have the distanceToFarthestCorner function defined', (t) => {
  t.deepEqual(rect.distanceToFarthestCorner({
    x: 4,
    y: 3,
  }), 5);
});

test('should have the distanceToFarthestCorner function defined an have default props', (t) => {
  t.deepEqual(rect.distanceToFarthestCorner({}), 0);
});
