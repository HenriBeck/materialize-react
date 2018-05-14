// @flow strict-local

type Point = {
  x: number,
  y: number,
};
type Rect = {
  height: number,
  width: number,
};

function calculateDistance(pointA: Point, pointB: Point): number {
  return ((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2) ** 0.5;
}

function getCenter(rect: Rect): Point {
  return {
    x: rect.width / 2,
    y: rect.height / 2,
  };
}

function getDistanceToFarthestCorner(pos: Point, rect: Rect): number {
  return Math.max(
    calculateDistance(pos, {
      x: 0,
      y: 0,
    }),
    calculateDistance(pos, {
      x: rect.width,
      y: 0,
    }),
    calculateDistance(pos, {
      x: 0,
      y: rect.height,
    }),
    calculateDistance(pos, {
      x: rect.width,
      y: rect.height,
    }),
  );
}

export {
  getDistanceToFarthestCorner,
  getCenter,
};
