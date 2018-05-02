// @flow strict

import React, { type Node } from 'react';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { JssProvider } from 'react-jss';

import Theme from '../src/components/Theme';
import Background from '../src/components/Background';
import Switch from '../src/components/Switch';
import Layout from '../src/components/Layout';
import Label from '../src/components/Label';
import AppBar from '../src/components/AppBar';
import Typography from '../src/components/Typography';
import createSheet from '../src/styles/create-sheet';

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

  componentWillUnmount() {
    window.sessionStorage.setItem('theme', this.state.darkTheme);
  }

  handleChange = () => {
    this.setState(({ darkTheme }) => {
      return { darkTheme: !darkTheme };
    });
  };

  render() {
    const theme = Theme.createTheme({
      type: this.state.darkTheme ? 'dark' : 'light',
      primary: 'indigo',
      accent: 'deepOrange',
    });

    return (
      <JssProvider jss={jss}>
        <Sheet>
          {({ classes }) => (
            <Theme theme={theme}>
              <Background className={classes.container}>
                <AppBar
                  color="primary"
                  className={classes.toolbar}
                >
                  <Typography typography="title">
                    {this.props.info.kind.replace('/', ' > ')} &gt; {this.props.info.story}
                  </Typography>

                  <Label
                    control={(
                      <Switch
                        color="accent"
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
