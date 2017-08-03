/**
 * Create a classes object from the styles for testing purposes.
 *
 * @param {Object} styles - The styles from which the classes will be computed.
 * @returns {Object} - Returns an object with the classes.
 */
export default function createClassesFromStyles(styles) {
  return Object
    .keys(styles)
    .map(className => Object.assign({ [className]: styles[className].composes }))
    .reduce((classes, classObj) => Object.assign({}, classes, classObj), {});
}
