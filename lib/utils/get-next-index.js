'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNextIndex;
function getNextIndex(array, currentIndex, direction) {
  if (direction === 'left') {
    return currentIndex === 0 ? array.length - 1 : currentIndex - 1;
  } else if (direction === 'right') {
    return currentIndex === array.length - 1 ? 0 : currentIndex + 1;
  }

  return currentIndex;
}