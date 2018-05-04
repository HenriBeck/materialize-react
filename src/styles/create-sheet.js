// @flow strict

import React, { type Node } from 'react';
import { jss as jssNs } from 'react-jss/lib/ns';
import defaultTheming from 'theming';
import {
  SheetsManager,
  getDynamicStyles,
} from 'jss';
import Jss from 'jss/lib/Jss';
import contextTypes from 'react-jss/lib/contextTypes';
import StyleSheet from 'jss/lib/StyleSheet';

import { mergeClassObjects } from './utils';

type Theme = {};
type StaticStyles = { [key: string]: {} };
type ThemedStyles = (theme: Theme) => StaticStyles;
type Styles = StaticStyles | ThemedStyles;
type Context = {};
type Classes = { [key: string]: string };
type State = {
  classes: Classes,
  theme: Theme,
};
type Props = {
  children: ({ classes: Classes }) => Node,
  data?: {},
};

let indexCounter = -100000; // eslint-disable-line fp/no-let
const { themeListener } = defaultTheming;
const DynamicStylesMap = new Map();
const noTheme = {};

export default function createSheet(name: string, styles: Styles) {
  const isThemingEnabled = typeof styles === 'function';
  const manager = new SheetsManager();

  indexCounter += 1;

  class Sheet extends React.Component<Props, State> {
    static defaultProps = { data: null };

    static contextTypes = Object.assign(
      {},
      contextTypes,
      isThemingEnabled ? themeListener.contextTypes : {},
    );

    static index = indexCounter;

    constructor(props: Props, context: Context) {
      super(props, context);

      this.dynamicSheet = null;
      this.unsubscribeId = null;

      const initialTheme = isThemingEnabled ? themeListener.initial(context) : noTheme;

      this.state = this.createState(initialTheme);

      if (isThemingEnabled) {
        this.unsubscribeId = themeListener.subscribe(context, this.handleThemeUpdate);
      }
    }

    componentDidUpdate(prevProps: Props) {
      if (this.dynamicSheet !== null && this.props.data !== prevProps.data) {
        this.dynamicSheet.update(this.props.data);
      }
    }

    componentWillUnmount() {
      if (this.unsubscribeId !== null) {
        themeListener.unsubscribe(this.context, this.unsubscribeId);
      }

      manager.unmanage(this.state.theme);

      if (this.dynamicSheet) {
        this.jss.removeStyleSheet(this.dynamicSheet);
      }
    }

    dynamicSheet: StyleSheet | null;

    unsubscribeId: string | null;

    get jss(): Jss {
      return this.context[jssNs];
    }

    createStaticSheet(theme: Theme): StyleSheet {
      const compiledStyles = typeof styles === 'function' ? styles(theme) : styles;
      const staticSheet = this.jss.createStyleSheet(compiledStyles, {
        meta: `${name}, ${isThemingEnabled ? 'Themed' : 'Unthemed'}, Static`,
        index: Sheet.index,
      });

      DynamicStylesMap.set(styles, getDynamicStyles(compiledStyles));

      manager.add(theme, staticSheet);

      return staticSheet;
    }

    createState(theme: Theme): State {
      const staticSheet = manager.get(theme) || this.createStaticSheet(theme);

      manager.manage(theme);

      const dynamicStyles = DynamicStylesMap.get(styles);

      if (dynamicStyles) {
        this.dynamicSheet = this.jss.createStyleSheet(dynamicStyles, {
          meta: `${name}, ${isThemingEnabled ? 'Themed' : 'Unthemed'}, Dynamic`,
          link: true,
          index: Sheet.index,
        });

        this.dynamicSheet
          .update(this.props.data)
          .attach();
      }

      return {
        classes: this.dynamicSheet
          ? mergeClassObjects(staticSheet.classes, this.dynamicSheet.classes)
          : staticSheet.classes,
        theme,
      };
    }

    handleThemeUpdate = (theme: Theme) => {
      const oldState = this.state.theme;
      const oldDynamicSheet = this.dynamicSheet;
      const newState = this.createState(theme);

      this.setState(newState, () => {
        manager.unmanage(oldState);

        if (oldDynamicSheet) {
          this.jss.removeStyleSheet(oldDynamicSheet);
        }
      });
    };

    render(): Node {
      return this.props.children({ classes: this.state.classes });
    }
  }

  return Sheet;
}
