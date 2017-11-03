/* eslint-disable global-require */

import '../helpers';

import {
  configure,
  addDecorator,
} from '@storybook/react';
import PropTypes from 'prop-types';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import React, { PureComponent } from 'react';

import 'normalize.css';
import 'mdi/css/materialdesignicons.css';

import Theme from '../src/components/theme';
import Background from '../src/components/background';
import Switch from '../src/components/switch';
import Layout from '../src/components/layout';
import Label from '../src/components/label';

let darkThemeEnabled = false;

/**
 * The Decorator for the story for switching between light and dark theme.
 *
 * @class
 */
class Decorator extends PureComponent {
  static propTypes = { children: PropTypes.node.isRequired };

  state = { darkTheme: darkThemeEnabled };

  /**
   * The component will unmount when we change the story.
   * We save the last state so the dark theme doesn't get reset after every change.
   */
  componentWillUnmount() {
    darkThemeEnabled = this.state.darkTheme;
  }

  /**
   * Change the state when the switch is being toggled.
   */
  handleChange = () => {
    this.setState(({ darkTheme }) => {
      return { darkTheme: !darkTheme };
    });
  };

  render() {
    const { darkTheme } = this.state;

    return (
      <Theme type={darkTheme ? 'dark' : 'light'}>
        <Layout
          component={Background}
          crossAlign="center"
          mainAlign="center"
          style={{ minHeight: '100vh' }}
        >
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
            }}
          >
            <Label>
              <Switch
                toggled={darkTheme}
                onChange={this.handleChange}
              />

              Dark Theme
            </Label>
          </div>

          {this.props.children}
        </Layout>
      </Theme>
    );
  }
}

addDecorator((story, info) => withKnobs(() => (
  <Decorator>
    {story()}
  </Decorator>
), info));

setOptions({
  name: 'Materialize React',
  url: 'https://github.com/HenriBeck/materialize-react',
});

const componentStories = require.context('../', true, /stories\.jsx$/);

configure(() => {
  componentStories.keys().forEach(componentStories);
}, module);
