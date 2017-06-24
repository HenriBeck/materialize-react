import omit from 'lodash.omit';

const jssProps = [
  'theme',
  'sheet',
  'classes',
];

/**
 * A function to get the the not declared props of a React Component.
 *
 * @param {Object} props - An instance of an React Component.
 * @param {Object} component - The prop types.
 * @param {...String} additionalProps - Additional props to omit.
 * @returns {Object} - Returns the props that aren't declared
 * but are passed to the component.
 */
export default function getNotDeclaredProps(props, component, ...additionalProps) {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  return omit(props, Object.keys(component.propTypes).concat([...jssProps, ...additionalProps]));
}
