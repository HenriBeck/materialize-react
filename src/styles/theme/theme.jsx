import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import jssInstance from '../jss';
import { jss } from 'react-jss/lib/ns';
import themeSchema from './theme-schema';
import {
  defaultTheme,
  defaultVars,
} from './default-theme';
import getNotDeclaredProps from '../../get-not-declared-props';

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
export default class Theme extends PureComponent {
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

  static childContextTypes = {
    theme: themeSchema,
    [jss]: PropTypes.object,
  };

  /**
   * Merge the passed in theme with the default one.
   */
  getChildContext() {
    return {
      theme: compileTheme(this.variables, this.props.theme),
      [jss]: jssInstance,
    };
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
    const {
      component: Component,
      children,
      ...props
    } = this.props;

    return (
      <Component {...getNotDeclaredProps(props, Theme)}>
        {children}
      </Component>
    );
  }
}
