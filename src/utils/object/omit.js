import is from 'is_js';

/**
 * Removing keys from an object.
 *
 * @param {Object} target - The object to iterate over and remove the keys.
 * @param {...*} keys - The keys to exclude from the new object.
 * @returns {Object} - Returns a new object without the specified keys.
 */
export default function omit(target, ...keys) {
  if (is.not.object(target)) {
    return {};
  }

  const disallowedKeys = keys.reduce(
    (current, value) => current.concat(value),
    [],
  );
  const newObj = {};

  Object
    .keys(target)
    .forEach((key) => {
      if (!disallowedKeys.includes(key)) {
        newObj[key] = target[key];
      }
    });

  return newObj;
}
