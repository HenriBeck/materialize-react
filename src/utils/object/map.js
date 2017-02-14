import is from 'is_js';

/**
 * @callback iterateCallback
 * @param {*} value - The value of the key.
 * @param {string} key - The key that the value is associated with.
 */

/**
 * Map over the values of an object and modify them.
 *
 * @param {Object} object - The object to iterate over.
 * @param {iterateCallback} iterateCallback - The callback
 * which will be called with for all values in the object.
 * @returns {Object} - Returns a new object with the modified keys.
 */
export default function map(object, iterateCallback) {
  if (is.not.object(object)) {
    return {};
  }

  if (is.not.function(iterateCallback)) {
    return object;
  }

  const newObject = {};

  Object
    .keys(object)
    .forEach((key) => {
      newObject[key] = iterateCallback(object[key], key);
    });

  return newObject;
}
