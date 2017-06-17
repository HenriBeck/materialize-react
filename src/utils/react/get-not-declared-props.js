import omit from 'lodash.omit';

const jssProps = [
  'theme',
  'sheet',
  'classes',
];

/**
 * A function to get the the not declared props of a React Component.
 *
 * @param {Object} instance - An instance of an React Component.
 * @param {Object} component - The prop types.
 * @returns {Object} - Returns the props that aren't declared
 * but are passed to the component.
 */
export default function getNotDeclaredProps(instance, component) {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  return omit(instance.props, Object.keys(component.propTypes).concat(jssProps));
}
