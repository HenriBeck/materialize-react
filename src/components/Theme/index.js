// @flow strict

import React, {
  type Element,
  type ElementType,
} from 'react';
import { ThemeProvider } from 'react-jss';
import merge from 'lodash.merge';

import { createTheme } from '../../theme';
import { type Theme as ThemeType } from '../../theme/schema';

type Props = {
  children: Element<ElementType>,
  theme: ThemeType | {},
};

export default class Theme extends React.Component<Props> {
  static createTheme = createTheme;

  mergeTheme = (outerTheme: ThemeType | null) => (
    outerTheme === null
      ? this.props.theme
      : merge({}, outerTheme, this.props.theme)
  );

  render() {
    return (
      <ThemeProvider theme={this.mergeTheme}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}
