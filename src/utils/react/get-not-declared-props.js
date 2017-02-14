import is from 'is_js';

import omit from '../object/omit';

/**
 * A function to get the the not declared props of a React Component.
 *
 * @param {React.Component} instance - An instance of an React Component.
 * @returns {Object} - Returns the props that aren't declared
 * but are passed to the component.
 */
export default function getNotDeclaredProps(instance) {
  if (!instance || is.not.object(instance)) {
    return {};
  }

  const { propTypes } = instance._reactInternalInstance._currentElement.type;
  const props = instance.props;

  return omit(props, Object.keys(propTypes));
}
