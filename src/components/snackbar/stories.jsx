import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';

import Snackbar from './snackbar';
import Button from '../button/index';
import SnackbarController from '../snackbar-controller/index';
import SnackbarContainer from '../snackbar-container/index';

/**
 * A component which creates a fully working drawer for the story.
 *
 * @class
 */
class SnackbarStory extends PureComponent {
  /**
   * When the menu icon button is pressed we want to open the drawer.
   */
  handlePress = name => () => {
    this[name].show();
  };

  /**
   * Close the second snackbar.
   */
  handleAction = () => {
    this.snackbar2.close();
  };

  render() {
    return (
      <SnackbarController>
        <div
          style={{
            flex: 1,
            alignSelf: 'stretch',
          }}
        >
          <SnackbarContainer />

          <div>
            <Button onPress={this.handlePress('snackbar1')}>Add snackbar</Button>

            <Snackbar ref={(elem) => { this.snackbar1 = elem; }}>Hello</Snackbar>

            <Button onPress={this.handlePress('snackbar2')}>Add snackbar with action</Button>

            <Snackbar
              autoCloseTimer={0}
              ref={(elem) => { this.snackbar2 = elem; }}
            >
              Some action happened
              <Button onRelease={this.handleAction}>Undo</Button>
            </Snackbar>
          </div>
        </div>
      </SnackbarController>
    );
  }
}

storiesOf('Snackbar', module)
  .add('Story', () => (
    <SnackbarStory />
  ));
