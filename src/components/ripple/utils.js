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
 * A function to get the various coords for an event.
 *
 * @param {Object} ev - The event.
 * @returns {Object} - Returns either the x and y coordinate or returns null.
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
 * Get the position of the center of a rectangle.
 *
 * @param {Object} rect - The rectangle.
 * @returns {Object} - Returns the x and y coordinates of the center point.
 */
export function getCenter(rect) {
  return {
    x: rect.width / 2,
    y: rect.height / 2,
  };
}

/**
 * Get the distance to the farthest corner from a point.
 *
 * @param {Object} pos - The position it will be based on.
 * @param {Object} rect - The rectangle the position is in.
 * @returns {Number} - Returns the maximal distance.
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
