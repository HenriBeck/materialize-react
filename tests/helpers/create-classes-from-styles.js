import variables from '../../src/components/theme/variables';

/**
 * Create a classes object from the styles for testing purposes.
 *
 * @param {(Object|Function)} styles - The styles from which the classes will be computed.
 * @param {String} [themeType] - The theme type for the styles. Either light or dark.
 * @returns {Object} - Returns an object with the classes.
 */
export default function createClassesFromStyles(styles, themeType = 'light') {
  if (typeof styles === 'function') {
    return createClassesFromStyles(
      styles({
        ...variables[themeType],
        type: themeType,
      }),
    );
  }

  return Object
    .keys(styles)
    .filter(className => styles[className].composes)
    .map(className => Object.assign({ [className]: styles[className].composes }))
    .reduce((classes, classObj) => Object.assign({}, classes, classObj), {});
}
