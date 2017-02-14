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
  return Math.sqrt(
    (pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2,
  );
}

/**
 * A class to simply working with the size etc. of an element.
 *
 * @class
 */
export default class ElementRect {
  /**
   * A class to simplify working with the size of an element.
   *
   * @param {Element} element - An element to calculate the width etc. from.
   */
  constructor(element) {
    this.boundingRect = element.getBoundingClientRect();

    this.width = this.boundingRect.width;

    this.height = this.boundingRect.height;

    this.size = Math.max(this.width, this.height);
  }

  /**
   * Get the center of the element.
   *
   * @returns {{x: Number, y: Number}} - Returns an object with the x and y coordinate.
   */
  get center() {
    return {
      x: this.width / 2,
      y: this.height / 2,
    };
  }

  /**
   * Calculates the distant to the farthest corner.
   *
   * @param {Object} point - The base point.
   * @param {Number} point.x - The x coordinate of the point.
   * @param {Number} point.y - The y coordinate of the point.
   * @returns {Number} - Returns the distance to the farthest corner.
   */
  distanceToFarthestCorner({
    x = 0,
    y = 0,
  }) {
    const pos = {
      x,
      y,
    };

    return Math.max(
      euclideanDistance(pos, {
        x: 0,
        y: 0,
      }),
      euclideanDistance(pos, {
        x: this.width,
        y: 0,
      }),
      euclideanDistance(pos, {
        x: 0,
        y: this.height,
      }),
      euclideanDistance(pos, {
        x: this.width,
        y: this.height,
      }),
    );
  }
}
