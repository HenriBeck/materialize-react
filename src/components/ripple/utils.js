/**
 *
 * @param ev
 */
export function getCoords(ev) {
  if (ev) {
    // Check for touch positions
    if (ev.touches && ev.touches[0]) {
      return {
        x: ev.touches[0].clientX,
        y: ev.touches[0].clientY,
      };
    }

    // Check for other common values in the event
    if (ev.clientX && ev.clientY) {
      return {
        x: ev.clientX,
        y: ev.clientY,
      };
    }

    if (ev.x && ev.y) {
      return {
        x: ev.x,
        y: ev.y,
      };
    }
  }

  return null;
}

/**
 *
 * @param rect
 */
export function getCenter(rect) {
  return {
    x: rect.width / 2,
    y: rect.height / 2,
  };
}

/**
 * A function to calculate the euclidean distance between to points.
 *
 * @param {Object} pointA - The first point.
 * @param {Number} pointA.x - The x coordinate of the point.
 * @param {Number} pointA.y - The y coordinate of the point.
 * @param {Object} pointB - The second point.
 * @param {Number} pointB.x - The x coordinate of the point.
 * @param {Number} pointB.y - The y coordinate of the point.
 * @returns {Number} - Returns the distance between the points.
 */
function euclideanDistance(pointA, pointB) {
  return ((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2) ** 0.5;
}

/**
 *
 * @param pos
 * @param rect
 * @returns {Number}
 */
export function getDistanceToFarthestCorner(pos, rect) {
  return Math.max(
    euclideanDistance(pos, {
      x: 0,
      y: 0,
    }),
    euclideanDistance(pos, {
      x: rect.width,
      y: 0,
    }),
    euclideanDistance(pos, {
      x: 0,
      y: rect.height,
    }),
    euclideanDistance(pos, {
      x: rect.width,
      y: rect.height,
    }),
  );
}
