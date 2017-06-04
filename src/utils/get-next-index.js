/**
 * A function to get the next index of an array if you go left or right.
 *
 * @param {Array} array - The array.
 * @param {Number} currentIndex - The current index.
 * @param {String} direction - Either left or right.
 * @returns {Number} - The new index.
 */
export default function getNextIndex(array, currentIndex, direction) {
  if (direction === 'left') {
    return currentIndex === 0 ? array.length - 1 : currentIndex - 1;
  } else if (direction === 'right') {
    return currentIndex === array.length - 1 ? 0 : currentIndex + 1;
  }

  return currentIndex;
}
