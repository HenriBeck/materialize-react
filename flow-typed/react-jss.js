// @flow

import {
  Component,
  type Node,
  type ComponentType,
} from 'react';
import Jss from 'jss/src/Jss';
import { type Rule } from 'jss/src/types';
import StyleSheet from 'jss/src/StyleSheet';

declare module 'jss-preset-default' {
  declare export default function preset(): void;
}

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

  declare export function createTheming<Channel: string, Context: { [key: Channel]: {} }, SubId: string>(channel?: Channel): {
    channel: Channel,
    withTheme: <Props: {}>(Component: ComponentType<Props>) => ComponentType<Props>,
    ThemeProvider: ThemeProvider,
    themeListener: {
      contextTypes: {| [key: Channel]: () => void |},
      initial: (context: Context) => {},
      subscribe: (context: Context, (theme: {}) => void) => SubId,
      unsubscribe: (context: Context, subId: SubId) => void,
    },
  };

  declare export function withTheme<Props: {}>(Component: ComponentType<Props>): ComponentType<{
    ...Props,
    theme: {},
  }>

  declare export var jss: Jss;

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
