import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../button/index';

import Dialog from './dialog';

/**
 * A component which creates a fully working drawer for the story.
 *
 * @class
 */
class DialogStory extends PureComponent {
  static DialogElement = ({ close }) => (
    <div>
      <Dialog.Header>Dialog Header</Dialog.Header>

      <Dialog.Content>Dialog Content</Dialog.Content>

      <Dialog.Buttons>
        <Button onRelease={close}>Cancel</Button>
        <Button onRelease={close}>Accept</Button>
      </Dialog.Buttons>
    </div>
  );

  /**
   * Open the dialog when the button is pressed.
   */
  handlePress = () => {
    this.dialog.open();
  };

  render() {
    return (
      <Dialog.Controller>
        <div
          style={{
            flex: 1,
            alignSelf: 'stretch',
          }}
        >
          <Dialog.Container />

          <div>
            <Button onRelease={this.handlePress}>Open Dialog</Button>

            <Dialog
              {...this.props}
              ref={(elem) => { this.dialog = elem; }}
              component={DialogStory.DialogElement}
            />
          </div>
        </div>
      </Dialog.Controller>
    );
  }
}

storiesOf('Dialog', module)
  .add('Default Styles', () => (
    <DialogStory />
  ))
  .add('Fullscreen dialog', () => (
    <DialogStory fullscreen />
  ));
