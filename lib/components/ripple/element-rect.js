"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

/**
 * A class to simply working with the size etc. of an element.
 *
 * @class
 */

var ElementRect = function () {
  /**
   * A class to simplify working with the size of an element.
   *
   * @param {Element} element - An element to calculate the width etc. from.
   */
  function ElementRect(element) {
    _classCallCheck(this, ElementRect);

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


  _createClass(ElementRect, [{
    key: "distanceToFarthestCorner",


    /**
     * Calculates the distant to the farthest corner.
     *
     * @param {Object} point - The base point.
     * @param {Number} point.x - The x coordinate of the point.
     * @param {Number} point.y - The y coordinate of the point.
     * @returns {Number} - Returns the distance to the farthest corner.
     */
    value: function distanceToFarthestCorner(_ref) {
      var _ref$x = _ref.x,
          x = _ref$x === undefined ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === undefined ? 0 : _ref$y;

      var pos = {
        x: x,
        y: y
      };

      return Math.max(euclideanDistance(pos, {
        x: 0,
        y: 0
      }), euclideanDistance(pos, {
        x: this.width,
        y: 0
      }), euclideanDistance(pos, {
        x: 0,
        y: this.height
      }), euclideanDistance(pos, {
        x: this.width,
        y: this.height
      }));
    }
  }, {
    key: "center",
    get: function get() {
      return {
        x: this.width / 2,
        y: this.height / 2
      };
    }
  }]);

  return ElementRect;
}();

exports.default = ElementRect;