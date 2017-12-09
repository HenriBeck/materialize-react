import React, { PureComponent } from 'react';
import Aux from 'react-aux';
import { storiesOf } from '@storybook/react';

import Button from '../button';

import DialogContainer from './dialog-container';
import Dialog from './dialog';

/**
 * Story component for the Checkbox component.
 *
 * @class
 */
class Story extends PureComponent {
  state = { dialog: null };

  handleOpenDialog = name => () => this.setState({ dialog: name });

  handleClose = () => this.setState({ dialog: null });

  render() {
    return (
      <Aux>
        <div>
          <Button onPress={this.handleOpenDialog('test1')}>
            Open Dialog 1
          </Button>

          <Button onPress={this.handleOpenDialog('test2')}>
            Open Dialog 2
          </Button>
        </div>

        <DialogContainer
          dialog={this.state.dialog}
          onCloseRequest={this.handleClose}
        >
          <Dialog
            backdrop
            closeOnBackdropClick
            name="test1"
          >
            <Dialog.Header>
              First Dialog
            </Dialog.Header>

            <Dialog.Content>
              The actual content of the dialog,
              wooooo dialog are so coool
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={this.handleClose}>
                Close
              </Button>

              <Button onPress={this.handleOpenDialog('test2')}>
                Open Dialog 2
              </Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog
            backdrop
            closeOnBackdropClick
            name="test2"
          >
            <Dialog.Header>
              Second Dialog
            </Dialog.Header>

            <Dialog.Content>
              The actual content of the second dialog is much cooler,
              wooooo dialog are so coool
            </Dialog.Content>
          </Dialog>
        </DialogContainer>
      </Aux>
    );
  }
}

storiesOf('Dialog', module)
  .add('Default styles', () => (
    <Story />
  ));
