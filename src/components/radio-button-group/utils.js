/**
 * Map all elements in an array to an object with the count of how many times they appear.
 *
 * @param {Array} array - The array to count the elements for.
 * @returns {Object} - Returns an object that maps the elements from the array to how many times
 * they appear in the array.
 */
export function countElementsInArray(array) {
  return array.reduce(
    (current, elem) => Object.assign({}, current, { [elem]: current[elem] + 1 || 1 }),
    {},
  );
}

/**
 * Check if an array has duplicate keys.
 *
 * @param {Array} array - The array that we should check.
 * @returns {Boolean} - Returns whether or not there are duplicates inside the array.
 */
export function hasDuplicates(array) {
  const countedElements = countElementsInArray(array);

  return Object
    .keys(countedElements)
    .some(name => countedElements[name] > 1);
}
