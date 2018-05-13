// @flow strict

import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../Button';

import Dialog from '.';
import Container from './Container';

type Props = {};
type State = {
  isSimpleDialogOpen: boolean,
  isAdvancedDialogOpen: boolean,
  isFullscreenDialogOpen: boolean,
};

class Story extends React.PureComponent<Props, State> {
  state = {
    isSimpleDialogOpen: false,
    isAdvancedDialogOpen: false,
    isFullscreenDialogOpen: false,
  };

  handleDialogOpen = name => () => this.setState({ [name]: true });

  handleDialogClose = name => () => this.setState({ [name]: false });

  render() {
    return (
      <React.Fragment>
        <div>
          <Button onPress={this.handleDialogOpen('isSimpleDialogOpen')}>
            Open basic dialog
          </Button>

          <Button onPress={this.handleDialogOpen('isAdvancedDialogOpen')}>
            Open advanced dialog
          </Button>

          <Button onPress={this.handleDialogOpen('isFullscreenDialogOpen')}>
            Open Fullscreen Dialog
          </Button>
        </div>

        <Container>
          <Dialog
            backdrop
            isOpen={this.state.isAdvancedDialogOpen}
            onCloseRequest={this.handleDialogClose('isAdvancedDialogOpen')}
          >
            <Dialog.Header>
              Second Dialog
            </Dialog.Header>

            <Dialog.Content>
              The actual content of the second dialog is much cooler,
              wooooo dialog are so coool
            </Dialog.Content>
          </Dialog>

          <Dialog
            backdrop
            isOpen={this.state.isSimpleDialogOpen}
            onCloseRequest={this.handleDialogClose('isSimpleDialogOpen')}
          >
            <Dialog.Header>
              First Dialog
            </Dialog.Header>

            <Dialog.Content>
              The actual content of the dialog,
              wooooo dialog are so coool
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={this.handleDialogClose('isSimpleDialogOpen')}>
                Close
              </Button>

              <Button onPress={this.handleDialogOpen('isAdvancedDialogOpen')}>
                Open Dialog 2
              </Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog
            fullscreen
            isOpen={this.state.isFullscreenDialogOpen}
          >
            <Button onPress={this.handleDialogClose('isFullscreenDialogOpen')}>
              Close
            </Button>
          </Dialog>
        </Container>
      </React.Fragment>
    );
  }
}

storiesOf('Dialog', module)
  .add('Default styles', () => (
    <Story />
  ));
