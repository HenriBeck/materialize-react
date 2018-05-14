// @flow strict-local

import React, {
  type Element,
  type ElementType,
} from 'react';
import { ThemeProvider } from 'react-jss';
import merge from 'lodash.merge';

import { type Theme as ThemeType } from '../../theme/types';

type Props = {
  children: Element<ElementType>,
  theme: ThemeType | {},
};

export default class Theme extends React.Component<Props> {
  static merge(innerTheme: ThemeType | {}) {
    return (outerTheme: ThemeType | null) => (
      outerTheme === null
        ? innerTheme
        : merge({}, outerTheme, innerTheme)
    );
  }

  render() {
    return (
      <ThemeProvider theme={Theme.merge(this.props.theme)}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}
