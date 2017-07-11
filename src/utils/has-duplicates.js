/**
 * Check if an array has duplicate keys.
 *
 * @param {Array} array - The array that we should check.
 * @returns {Boolean} - Returns whether or not there are duplicates inside the array.
 */
export default function hasDuplicates(array) {
  const obj = {};

  return array.some((item) => {
    if (obj[item]) {
      return true;
    }

    obj[item] = true;

    return false;
  });
}
