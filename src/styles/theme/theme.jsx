import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import themeSchema from './theme-schema';
import {
  defaultTheme,
  defaultVars,
} from './default-theme';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';

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

  static childContextTypes = { theme: themeSchema };

  /**
   * Merge the passed in theme with the default one.
   */
  getChildContext() {
    return { theme: compileTheme(this.variables, this.props.theme) };
  }

  get variables() {
    return Object.assign({}, defaultVars, this.props.variables);
  }

  render() {
    const { component: Component } = this.props;

    return (
      <Component {...getNotDeclaredProps(this, Theme)}>
        {this.props.children}
      </Component>
    );
  }
}
