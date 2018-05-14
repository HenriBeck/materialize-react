// @flow

import {
  Component,
  type Node,
  type ComponentType,
} from 'react';
import Jss from 'jss/lib/Jss';
import { type Rule } from 'jss/lib/types';
import StyleSheet from 'jss/lib/StyleSheet';

declare module 'react-jss' {
  declare type StaticStyles = { [key: string]: {} };
  declare type ThemedStyles = (theme: {}) => StaticStyles;
  declare type Styles = StaticStyles | ThemedStyles;

  declare export class JssProvider extends Component<{
    jss?: Jss,
    generateClassName?: (rule: Rule, sheet?: StyleSheet) => string,
    classNamePrefix?: string,
    children: Node,
  }> {}

  declare export class ThemeProvider extends Component<{
    theme: {} | (outerTheme: {}) => {},
    children: Node,
  }> {}

  declare function injectSheet(styles: Styles): <P>(comp: ComponentType<P>) => ComponentType<P>;

  declare export function createTheming(channel?: string): {
    channel: string,
    withTheme: <Props: {}>(Component: ComponentType<Props>) => ComponentType<Props>,
    ThemeProvider: ThemeProvider,
    themeListener: {
      contextTypes: {},
      initial: (context: {}) => {},
      subscribe: (context: {}, (theme: {}) => void) => string,
      unsubscribe: (context: {}, subId: string) => void,
    },
  };

  declare export function withTheme<P: {}>(Component: ComponentType<P>): ComponentType<P>;

  declare export default typeof injectSheet;
}

declare module 'react-jss/lib/ns' {
  declare export var jss: string;
  declare export var sheetsRegistry: string;
  declare export var managers: string;
  declare export var sheetOptions: string;
}

declare module 'react-jss/lib/contextTypes' {
  declare export default {};
}

declare module 'jss-preset-default' {
  declare function preset(): void;

  declare export default typeof preset;
}
