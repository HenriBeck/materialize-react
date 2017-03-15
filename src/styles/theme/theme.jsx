import React, {
  PureComponent,
  PropTypes,
} from 'react';
import merge from 'lodash.merge';

import themeSchema from './theme-schema';
import defaultTheme from './default-theme';
import Stylesheet from '../stylesheet';
import getNotDeclaredProps from '/src/utils/react/get-not-declared-props';

export function compileTheme(theme) {
  const mergedTheme = merge({}, defaultTheme, theme);

  return Stylesheet.compile(mergedTheme, { variables: mergedTheme.variables }, []);
}

export default class Theme extends PureComponent {
  static propTypes = {
    theme: themeSchema,
    children: PropTypes.node,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    theme: {},
    children: '',
    component: 'div',
  };

  static childContextTypes = { theme: PropTypes.object };

  getChildContext() {
    return { theme: compileTheme(this.props.theme) };
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
