// @flow strict

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../Button';
import Layout from '../Layout';
import Checkbox from '../Checkbox';
import Label from '../Label';
import TextArea from '../TextArea';

import Snackbar from '.';
import Container from './Container';

type Props = {};
type State = {
  snackbars: $ReadOnlyArray<{
    id: number,
    withAction: boolean,
    message: string,
    isAnimatingOut: boolean,
  }>,
  withAction: boolean,
  message: string,
};

class Story extends React.PureComponent<Props, State> {
  state = {
    snackbars: [],
    withAction: false,
    message: 'Single-line message',
  };

  id = 0;

  handleAddPress = () => {
    this.id += 1;

    this.setState((state) => {
      return {
        snackbars: [...state.snackbars, {
          id: this.id,
          withAction: state.withAction,
          message: state.message,
          isAnimatingOut: false,
        }],
      };
    });
  };

  /**
   * Remove the first Snackbar from the state when the current Snackbar animates out.
   */
  handleRemoveSnackbar = () => {
    this.setState((state) => {
      const [, ...snackbars] = state.snackbars;

      return { snackbars };
    });
  };

  handleWithActionChange = () => {
    this.setState((state) => {
      return { withAction: !state.withAction };
    });
  };

  handleMessageChange = (ev) => {
    this.setState({ message: ev.target.value });
  };

  handleClosePress = () => {
    this.handleCloseRequest();
  };

  handleCloseRequest = (...args) => {
    action('Close Request')(...args);

    this.setState((state) => {
      return {
        snackbars: state.snackbars.map((snackbar, index) => {
          return {
            ...snackbar,
            isAnimatingOut: index === 0,
          };
        }),
      };
    });
  };

  renderSnackbars() {
    return this.state.snackbars.map(snackbar => (
      <Snackbar
        key={snackbar.id}
        isAnimatingOut={snackbar.isAnimatingOut}
        action={snackbar.withAction ? (
          <Button onPress={action('Action Press')}>Action</Button>
        ) : null}
        onCloseRequest={this.handleCloseRequest}
        onRemoveRequest={this.handleRemoveSnackbar}
      >
        {snackbar.message}
      </Snackbar>
    ));
  }

  render() {
    return (
      <div
        style={{
          flex: 1,
          alignSelf: 'stretch',
        }}
      >
        <Container>
          {this.renderSnackbars()}
        </Container>

        <Layout
          direction="column"
          crossAlign="flex-start"
        >
          <Label
            control={(
              <Checkbox
                checked={this.state.withAction}
                onChange={this.handleWithActionChange}
              />
            )}
          >
            With Action
          </Label>

          <TextArea
            label="Snackbar message"
            value={this.state.message}
            onChange={this.handleMessageChange}
          />

          <Button onPress={this.handleAddPress}>Add snackbar</Button>

          <Button onPress={this.handleClosePress}>Close snackbar</Button>
        </Layout>
      </div>
    );
  }
}

storiesOf('Snackbar', module)
  .add('Story', () => (
    <Story />
  ));
