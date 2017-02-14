import warning from 'utils/warning';

/**
 * A plugin to transform values from css that are in the form of var() into specified values.
 *
 * @param {Object} vars - The variables to transform.
 * @returns {Function} - Returns a function which takes an object for additional variables
 * which is needed for our stylesheet system.
 */
export default function variables(vars = {}) {
  return value => value
    .replace(/var\((\w+)\)/g, (found, name) => {
      warning(!vars[name], `${name} isn't a valid variable!`);

      return vars[name];
    })
    .trim();
}
