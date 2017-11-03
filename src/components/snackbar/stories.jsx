import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import Aux from 'react-aux';

import Button from '../button';

import SnackbarContainer from './snackbar-container';

/**
 * The story for the snackbars.
 *
 * @class
 */
class Story extends PureComponent {
  state = { snackbars: [] };

  snackbars = {
    basic: {
      content: 'A basic snackbar',
      autoCloseTimer: 10 * 1000,
    },
    withAction: {
      content: (
        <Aux>
          A Snackbar with an action!

          <Button onPress={this.handleSnackbarAction}>
            Action
          </Button>
        </Aux>
      ),
    },
  };

  /**
   * Create a reference to the snackbar container.
   *
   * @param {Object} instance - The instance of the snackbar container.
   */
  createRef = (instance) => {
    this.snackbarContainer = instance;
  };

  handlePress = name => () => {
    this.setState((state) => {
      return {
        snackbars: []
          .concat(state.snackbars)
          .concat([ this.snackbars[name] ]),
      };
    });
  };

  /**
   * Animate out the current snackbar when the action get's pressed.
   */
  handleSnackbarAction = () => {
    this.snackbarContainer.removeCurrentSnackbar();
  };

  /**
   * Remove the first snackbar from the state when the current snackbar animates out.
   */
  handleRemoveSnackbar = () => {
    this.setState((state) => {
      return { snackbars: state.snackbars.slice(0, 1) };
    });
  };

  render() {
    return (
      <div
        style={{
          flex: 1,
          alignSelf: 'stretch',
        }}
      >
        <SnackbarContainer
          createRef={this.createRef}
          snackbars={this.state.snackbars}
          onRemoveSnackbar={this.handleRemoveSnackbar}
        />

        <div>
          <Button onPress={this.handlePress('basic')}>Add snackbar</Button>

          <Button onPress={this.handlePress('withAction')}>Add snackbar with action</Button>

          <Button onPress={this.handleSnackbarAction}>Close current snackbar</Button>
        </div>
      </div>
    );
  }
}

storiesOf('Snackbar', module)
  .add('Story', () => (
    <Story />
  ));
