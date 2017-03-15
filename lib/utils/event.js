"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A utility class to get some data from an event.
 */
var Event = function () {
  /**
   * Initialize the event.
   *
   * @param {Object} ev - The event object from react.
   */
  function Event() {
    var ev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Event);

    this.ev = ev;
  }

  /**
   * A function to get the coordinates where the event happened.
   * If there are no coords it will return null.
   *
   * @returns {Object} - Returns an object with the x and y coordinates.
   */


  _createClass(Event, [{
    key: "getCords",
    value: function getCords() {
      if (this.ev) {
        // Check for touch positions
        if (this.ev.touches && this.ev.touches[0]) {
          return {
            x: this.ev.touches[0].clientX,
            y: this.ev.touches[0].clientY
          };
        }

        // Check for other common values in the event
        if (this.ev.clientX && this.ev.clientY) {
          return {
            x: this.ev.clientX,
            y: this.ev.clientY
          };
        }

        if (this.ev.x && this.ev.y) {
          return {
            x: this.ev.x,
            y: this.ev.y
          };
        }
      }

      return null;
    }
  }]);

  return Event;
}();

exports.default = Event;