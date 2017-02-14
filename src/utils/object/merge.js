import is from 'is_js';

/**
 * Merges two objects with each other.
 *
 * @param {Object} target - The target to merge with.
 * @param {Object} object - The object to merge into the target.
 * @returns {Object} - Returns the target with the merged object.
 */
function mergeObject(target, object) {
  const newObj = target;

  Object
    .keys(object)
    .forEach((key) => {
      const newValue = newObj[key];
      const value = object[key];

      if (is.json(value)) {
        if (!newValue || is.not.json(newValue)) {
          newObj[key] = {};
        }

        newObj[key] = mergeObject(target[key], object[key]);
      } else if (is.array(object[key])) {
        if (!newValue || is.not.array(newValue)) {
          newObj[key] = [];
        }

        newObj[key] = newObj[key].concat(object[key]);
      } else {
        newObj[key] = object[key];
      }
    });

  return newObj;
}

/**
 * Merges two or more objects with each other.
 *
 * @param {Object} target - The Object to merge with.
 * @param {...Object} objects - A number of objects that you want to merge.
 * @returns {Object} - Returns the merged object.
 */
export default function merge(target, ...objects) {
  // Check if the target is an object
  if (is.not.object(target)) {
    return {};
  }

  // Create a new Obj
  let obj = Object(target);

  // Iterate over the other objects
  objects.forEach((object) => {
    if (is.object(object)) {
      obj = mergeObject(obj, object);
    }
  });

  return obj;
}
