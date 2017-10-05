import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'react-jss';
import merge from 'lodash.merge';

import variables from './variables';

/**
 * The theme provider for the components.
 *
 * @class
 */
export default class Theme extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    theme: PropTypes.shape({}),
    type: PropTypes.oneOf([
      'light',
      'dark',
    ]),
  };

  static defaultProps = {
    theme: {},
    type: 'light',
  };

  static variables = variables;

  createMergeStrategy = (theme, type) => outerTheme => merge({}, outerTheme, {
    type,
    ...variables[type],
    ...theme,
  });

  render() {
    const {
      children,
      theme,
      type,
    } = this.props;

    return (
      <ThemeProvider theme={this.createMergeStrategy(theme, type)}>
        {children}
      </ThemeProvider>
    );
  }
}
