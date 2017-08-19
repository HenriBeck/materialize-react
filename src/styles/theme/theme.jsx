import React from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';

import {
  defaultTheme,
  defaultVars,
} from './default-theme';
import themeSchema from './theme-schema';

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
 * Create a merge strategy for the theme.
 * When we have a outer theme, we just merge the passed in theme
 * else wise we compiled a default theme.
 *
 * @param {Object} props - The props which were passed to the theme component.
 * @returns {Function} - Returns a function which will merge the themes.
 */
export function createThemeMergeStrategy(props) {
  return (outerTheme) => {
    const mergedTheme = outerTheme
      ? Object.assign({}, outerTheme, props.theme)
      : compileTheme(props.variables, props.theme);

    PropTypes.checkPropTypes(themeSchema, mergedTheme, 'prop', 'Theme');

    return mergedTheme;
  };
}

/**
 * A React Component to supply a custom jss instance for our components and the theme.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the children wrapped by a child component.
 */
export function Theme(props) {
  return (
    <ThemeProvider theme={createThemeMergeStrategy(props)}>
      {props.children}
    </ThemeProvider>
  );
}

/* eslint-disable react/forbid-prop-types, react/no-unused-prop-types */
Theme.propTypes = {
  children: PropTypes.element.isRequired,
  variables: PropTypes.object,
  theme: PropTypes.object,
};

Theme.defaultProps = {
  variables: {},
  theme: {},
};

Theme.styles = { '@global *': { WebkitTapHighlightColor: 'transparent' } };

export default injectSheet(Theme.styles)(Theme);
