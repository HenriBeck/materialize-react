import React from 'react';
import PropTypes from 'prop-types';

/**
 * A Wrapper function to inject the theme passed in by the context as a prop into the JSS HOC.
 *
 * @private
 * @param {Function} Component - The HOC from JSS.
 * @param {String} [componentName] - The name of the component so we only pass the theme
 * for the component. This makes it easier with jss.
 * @returns {Function} - Returns the new wrapper function which will render the HOC from JSS.
 */
export default function connectWithTheme(Component, componentName = null) {
  /**
   * The Wrapper component to pass the theme as a prop.
   *
   * @param {Object} props - Additional props for the element.
   * @param {Object} context - The context of the function.
   * @param {Object} context.theme - The theme provided by the context.
   * @returns {JSX} - Returns the HOC from JSS.
   */
  function Wrapper(props, { theme }) {
    return (
      <Component
        theme={componentName ? theme[componentName] : theme}
        {...props}
      />
    );
  }

  Wrapper.contextTypes = { theme: PropTypes.object };

  return Wrapper;
}
