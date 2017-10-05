import variables from '../../src/components/theme/variables';

/**
 * Create a classes object from the styles for testing purposes.
 *
 * @param {(Object|Function)} styles - The styles from which the classes will be computed.
 * @returns {Object} - Returns an object with the classes.
 */
export default function createClassesFromStyles(styles) {
  if (typeof styles === 'function') {
    return createClassesFromStyles(styles(variables.light));
  }

  return Object
    .keys(styles)
    .filter(className => styles[className].composes)
    .map(className => Object.assign({ [className]: styles[className].composes }))
    .reduce((classes, classObj) => Object.assign({}, classes, classObj), {});
}
