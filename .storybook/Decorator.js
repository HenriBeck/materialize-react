// @flow strict-local

import React, { type Node } from 'react';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { JssProvider } from 'react-jss';

import {
  Theme,
  Background,
  Switch,
  Layout,
  Label,
  AppBar,
  Typography,
  createTheme,
  createSheet,
} from '../src';

type Props = {
  children: Node,
  info: {
    kind: string,
    story: string,
  },
};
type State = { darkTheme: boolean };

const jss = create();

jss.setup(preset());

const Sheet = createSheet('Decorator', {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '56px 1fr',
    minHeight: '100vh',
  },

  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default class Decorator extends React.PureComponent<Props, State> {
  state = { darkTheme: Boolean(window.sessionStorage.getItem('theme')) };

  saveTheme() {
    window.sessionStorage.setItem('theme', this.state.darkTheme);
  }

  handleChange = () => {
    this.setState(({ darkTheme }) => {
      return { darkTheme: !darkTheme };
    }, () => this.saveTheme());
  };

  render() {
    const theme = createTheme({
      type: this.state.darkTheme ? 'dark' : 'light',
      primary: 'blue',
      accent: 'yellow',
    });

    return (
      <JssProvider jss={jss}>
        <Sheet>
          {({ classes }) => (
            <Theme theme={theme}>
              <Background className={classes.container}>
                <AppBar className={classes.toolbar}>
                  <Typography typography="title">
                    {this.props.info.kind.replace('/', ' > ')} &gt; {this.props.info.story}
                  </Typography>

                  <Label
                    control={(
                      <Switch
                        toggled={this.state.darkTheme}
                        onChange={this.handleChange}
                      />
                    )}
                  >
                    Dark Theme
                  </Label>
                </AppBar>

                <Layout
                  crossAlign="center"
                  mainAlign="center"
                >
                  {this.props.children}
                </Layout>
              </Background>
            </Theme>
          )}
        </Sheet>
      </JssProvider>
    );
  }
}
