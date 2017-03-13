import {
  PureComponent,
  PropTypes,
} from 'react';

import themeSchema from './theme-schema';
import defaultTheme from './default-theme';
import merge from 'lodash.merge';
import Stylesheet from 'styles/stylesheet';

/**
 * A function to compile and merge a theme with the default one.
 *
 * @param {Object} theme - The theme to merge.
 * @returns {Object} - Returns the compiled merged theme.
 */
export function compileTheme(theme) {
  const mergedTheme = merge({}, defaultTheme, theme);

  return Stylesheet.compile(mergedTheme, { variables: mergedTheme.variables }, []);
}

/**
 * A component to provide the theme as a context.
 */
export default class Theme extends PureComponent {
  static propTypes = {
    theme: themeSchema,
    children: PropTypes.node,
  };

  static defaultProps = {
    theme: {},
    children: '',
  };

  static childContextTypes = { theme: PropTypes.object };

  getChildContext() {
    return { theme: compileTheme(this.props.theme) };
  }

  render() {
    return this.props.children;
  }
}
