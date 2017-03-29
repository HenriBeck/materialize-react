"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function checkForNumber(arg, value) {
  return arg || arg === 0 ? arg : value;
}

function position() {
  var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var top = checkForNumber(arguments.length <= 1 ? undefined : arguments[1], null);
  var right = checkForNumber(arguments.length <= 2 ? undefined : arguments[2], top);
  var bottom = checkForNumber(arguments.length <= 3 ? undefined : arguments[3], top);
  var left = checkForNumber(arguments.length <= 4 ? undefined : arguments[4], right);

  if (pos === null) {
    return {};
  } else if (top === null) {
    return { position: pos };
  }

  return {
    position: pos,
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
}