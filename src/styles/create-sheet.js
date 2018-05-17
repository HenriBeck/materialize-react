// @flow strict-local

import React, { type Node } from 'react';
import {
  jss as jssNs,
  sheetOptions as sheetOptionsNs,
  sheetsRegistry as sheetsRegistryNs,
} from 'react-jss/lib/ns';
import {
  createTheming,
  jss,
} from 'react-jss';
import { getDynamicStyles } from 'jss';
import SheetsManager from 'jss/lib/SheetsManager';
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
const defaultTheming = createTheming();
const { themeListener } = defaultTheming;
const DynamicStylesMap = new Map();
const noTheme = {};
const env = process.env.NODE_ENV; // eslint-disable-line no-undef

export default function createSheet(name: string, styles: Styles) {
  const isThemingEnabled = typeof styles === 'function';
  const manager = new SheetsManager();
  const meta = `${name}, ${isThemingEnabled ? 'Themed' : 'Unthemed'}`;
  const defaultClassNamePrefix = env === 'production' ? null : `${name}-`;

  indexCounter += 1;

  return class Sheet extends React.Component<Props, State> {
    static defaultProps = { data: null };

    static contextTypes = {
      [jssNs]: contextTypes[jssNs],
      [sheetOptionsNs]: contextTypes[sheetOptionsNs],
      [sheetsRegistryNs]: contextTypes[sheetsRegistryNs],
      ...isThemingEnabled ? themeListener.contextTypes : {},
    };

    static index = indexCounter;

    constructor(props: Props, context: Context) {
      super(props, context);

      const initialTheme = isThemingEnabled ? themeListener.initial(context) : noTheme;

      this.state = this.createState(initialTheme);
    }

    componentDidMount() {
      if (isThemingEnabled) {
        this.unsubscribeId = themeListener.subscribe(this.context, this.handleThemeUpdate);
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
        this.getJss().removeStyleSheet(this.dynamicSheet);
      }
    }

    getJss(): Jss {
      return this.context[jssNs] || jss;
    }

    dynamicSheet: StyleSheet | null = null;

    unsubscribeId: string | null = null;

    createStylesheet(compiledStyles: Styles, { isDynamic }: { isDynamic: boolean }) {
      const contextSheetOptions = this.context[sheetOptionsNs];

      return this.getJss().createStyleSheet(compiledStyles, {
        ...contextSheetOptions,
        link: isDynamic,
        meta: `${meta}, ${isDynamic ? 'Dynamic' : 'Static'}`,
        index: Sheet.index,
        classNamePrefix: contextSheetOptions && contextSheetOptions.classNamePrefix
          ? contextSheetOptions.classNamePrefix + defaultClassNamePrefix
          : defaultClassNamePrefix,
      });
    }

    createStaticSheet(theme: Theme): StyleSheet {
      const compiledStyles = typeof styles === 'function' ? styles(theme) : styles;
      const staticSheet = this.createStylesheet(compiledStyles, { isDynamic: false });

      DynamicStylesMap.set(styles, getDynamicStyles(compiledStyles));

      manager.add(theme, staticSheet);

      return staticSheet;
    }

    createState(theme: Theme): State {
      const staticSheet = manager.get(theme) || this.createStaticSheet(theme);
      const registry = this.context[sheetsRegistryNs];

      manager.manage(theme);

      if (registry) {
        registry.add(staticSheet);
      }

      const dynamicStyles = DynamicStylesMap.get(styles);

      if (dynamicStyles) {
        this.dynamicSheet = this.createStylesheet(dynamicStyles, { isDynamic: true });

        this.dynamicSheet
          .update(this.props.data)
          .attach();

        if (registry) {
          registry.add(this.dynamicSheet);
        }
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
          this.getJss().removeStyleSheet(oldDynamicSheet);
        }
      });
    };

    render() {
      return this.props.children({ classes: this.state.classes });
    }
  };
}
