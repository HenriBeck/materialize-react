'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A function to transform numbers into a cubic-bezier string.
 *
 * @param {...Number} timing - The numbers for the cubic-bezier function.
 * @returns {String} - Returns the cubic-bezier function as a string.
 */
var cubicBezier = function cubicBezier() {
  for (var _len = arguments.length, timing = Array(_len), _key = 0; _key < _len; _key++) {
    timing[_key] = arguments[_key];
  }

  return 'cubic-bezier(' + timing.join(',') + ')';
};

var easeInQuad = exports.easeInQuad = cubicBezier(0.550, 0.085, 0.680, 0.530);
var easeInCubic = exports.easeInCubic = cubicBezier(0.550, 0.055, 0.675, 0.190);
var easeInQuart = exports.easeInQuart = cubicBezier(0.895, 0.030, 0.685, 0.220);
var easeInQuint = exports.easeInQuint = cubicBezier(0.755, 0.050, 0.855, 0.060);
var easeInSine = exports.easeInSine = cubicBezier(0.470, 0.000, 0.745, 0.715);
var easeInExpo = exports.easeInExpo = cubicBezier(0.950, 0.050, 0.795, 0.035);
var easeInCirc = exports.easeInCirc = cubicBezier(0.600, 0.040, 0.980, 0.335);
var easeInBack = exports.easeInBack = cubicBezier(0.600, -0.280, 0.735, 0.045);

var easeOutQuad = exports.easeOutQuad = cubicBezier(0.250, 0.460, 0.450, 0.940);
var easeOutCubic = exports.easeOutCubic = cubicBezier(0.215, 0.610, 0.355, 1.000);
var easeOutQuart = exports.easeOutQuart = cubicBezier(0.165, 0.840, 0.440, 1.000);
var easeOutQuint = exports.easeOutQuint = cubicBezier(0.230, 1.000, 0.320, 1.000);
var easeOutSine = exports.easeOutSine = cubicBezier(0.390, 0.575, 0.565, 1.000);
var easeOutExpo = exports.easeOutExpo = cubicBezier(0.190, 1.000, 0.220, 1.000);
var easeOutCirc = exports.easeOutCirc = cubicBezier(0.075, 0.820, 0.165, 1.000);
var easeOutBack = exports.easeOutBack = cubicBezier(0.175, 0.885, 0.320, 1.275);

var easeInOutQuad = exports.easeInOutQuad = cubicBezier(0.455, 0.030, 0.515, 0.955);
var easeInOutCubic = exports.easeInOutCubic = cubicBezier(0.645, 0.045, 0.355, 1.000);
var easeInOutQuart = exports.easeInOutQuart = cubicBezier(0.770, 0.000, 0.175, 1.000);
var easeInOutQuint = exports.easeInOutQuint = cubicBezier(0.860, 0.000, 0.070, 1.000);
var easeInOutSine = exports.easeInOutSine = cubicBezier(0.445, 0.050, 0.550, 0.950);
var easeInOutExpo = exports.easeInOutExpo = cubicBezier(1.000, 0.000, 0.000, 1.000);
var easeInOutCirc = exports.easeInOutCirc = cubicBezier(0.785, 0.135, 0.150, 0.860);
var easeInOutBack = exports.easeInOutBack = cubicBezier(0.680, -0.550, 0.265, 1.550);