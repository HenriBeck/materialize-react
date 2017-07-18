import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  JssProvider,
} from 'react-jss';

import jssInstance from '../jss';
import themeSchema from './theme-schema';
import {
  defaultTheme,
  defaultVars,
} from './default-theme';

/**
 * Compile the theme and merge it with the default theme.
 *
 * @private
 * @param {Object} customVariables - The variables that will be passed to the theme functions.
 * @param {Object} customTheme - The theme provided by the user.
 * @returns {Object} - Returns the compiled theme.
 */
export function compileTheme(customVariables, customTheme) {
  const variables = Object.assign({}, defaultVars, customVariables);

  return Object
    .keys(defaultTheme)
    .reduce((current, component) => {
      const userTheme = customTheme[component] ? customTheme[component](variables) : {};

      return {
        ...current,
        [component]: Object.assign({}, defaultTheme[component](variables), userTheme),
      };
    }, {});
}

/**
 * A React Component to supply a custom jss instance for our components and the theme.
 */
export default function Theme(props) {
  const compiledTheme = compileTheme(props.variables, props.theme);

  // PropTypes.checkPropTypes(themeSchema, compiledTheme, 'prop', 'Theme');

  return (
    <ThemeProvider theme={compiledTheme}>
      <JssProvider jss={jssInstance}>
        {props.children}
      </JssProvider>
    </ThemeProvider>
  );
}

Theme.propTypes = {
  children: PropTypes.element.isRequired,
  variables: PropTypes.object,
  theme: PropTypes.object,
};

Theme.defaultProps = {
  variables: {},
  theme: {},
};
