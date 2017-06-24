import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import injectSheet from '../jss';
import themeSchema from './theme-schema';
import {
  defaultTheme,
  defaultVars,
} from './default-theme';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';

/**
 * Compile the theme and merge it with the default theme.
 *
 * @private
 * @param {Object} variables - The variables that will be passed to the theme functions.
 * @param {Object} [theme] - The theme provided by the user.
 * @returns {Object} - Returns the compiled theme.
 */
export function compileTheme(variables, theme) {
  return Object
    .keys(defaultTheme)
    .reduce((current, component) => {
      const userTheme = theme[component] ? theme[component](variables) : {};

      return {
        ...current,
        [component]: Object.assign({}, defaultTheme[component](variables), userTheme),
      };
    }, {});
}

/**
 * A React Component to supply the theme for the elements via the context.
 *
 * @class
 */
export class Theme extends PureComponent {
  static propTypes = {
    theme: PropTypes.object,
    variables: PropTypes.object,
    children: PropTypes.node,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    theme: {},
    variables: {},
    children: '',
    component: 'div',
  };

  static childContextTypes = { theme: themeSchema };

  /**
   * Merge the passed in theme with the default one.
   */
  getChildContext() {
    return { theme: compileTheme(this.variables, this.props.theme) };
  }

  /**
   * Merge the default variables with the from the user.
   *
   * @returns {Object} - Returns the merged variables.
   */
  get variables() {
    return Object.assign({}, defaultVars, this.props.variables);
  }

  render() {
    const { component: Component } = this.props;

    return (
      <Component {...getNotDeclaredProps(this.props, Theme)}>
        {this.props.children}
      </Component>
    );
  }
}

// Turn off the highlight when the user is using a touch device
const styles = { '@global': { '*': { WebkitTapHighlightColor: 'transparent' } } };

export default injectSheet(styles)(Theme);
