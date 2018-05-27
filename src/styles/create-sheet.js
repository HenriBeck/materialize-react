// @flow strict-local

import React, { type Node } from 'react';
import * as ns from 'react-jss/lib/ns'; // eslint-disable-line import/no-namespace
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
let managersCounter = 0; // eslint-disable-line fp/no-let
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
  managersCounter += 1;

  return class Sheet extends React.Component<Props, State> {
    static defaultProps = { data: null };

    static contextTypes = {
      ...contextTypes,
      ...isThemingEnabled ? themeListener.contextTypes : {},
    };

    static index = indexCounter;

    static managerId = managersCounter;

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
      this.getManager().unmanage(this.state.theme);

      if (this.dynamicSheet !== null) {
        // $FlowFixMe: For some reason this produces an error
        this.getJss().removeStyleSheet(this.dynamicSheet);
      }

      if (this.unsubscribeId !== null) {
        themeListener.unsubscribe(this.context, this.unsubscribeId);
      }
    }

    getJss(): Jss {
      return this.context[ns.jss] || jss;
    }

    getManager(): SheetsManager {
      const managers = this.context[ns.managers];

      // If `managers` map is present in the context, we use it in order to
      // let JssProvider reset them when new response has to render server-side.
      if (managers) {
        if (!managers[Sheet.managerId]) {
          managers[Sheet.managerId] = new SheetsManager();
        }

        return managers[Sheet.managerId];
      }

      return manager;
    }

    dynamicSheet: StyleSheet | null = null;

    unsubscribeId: string | null = null;

    createStylesheet(compiledStyles: Styles, { isDynamic }: { isDynamic: boolean }) {
      const contextSheetOptions = this.context[ns.sheetOptions];

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

      this.getManager().add(theme, staticSheet);

      return staticSheet;
    }

    createState(theme: Theme): State {
      const staticSheet = this.getManager().get(theme) || this.createStaticSheet(theme);
      const registry = this.context[ns.sheetsRegistry];

      this.getManager().manage(theme);

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
        this.getManager().unmanage(oldState);

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
