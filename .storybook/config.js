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
   *
   * @param {String} name - The name of the switch.
   * @param {Boolean} value - The new state of the switch.
   */
  handleChange = (name, value) => {
    this.setState({ darkTheme: value });
  };

  render() {
    const { darkTheme } = this.state;

    return (
      <Theme type={darkTheme ? 'dark' : 'light'}>
        <Background
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
            }}
          >
            <Switch
              name="dark-theme"
              defaultToggled={darkThemeEnabled}
              onChange={this.handleChange}
            >
              Dark Theme
            </Switch>
          </div>

          {this.props.children}
        </Background>
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
