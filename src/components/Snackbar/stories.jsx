// @flow strict

import React, {
  type Element,
  type ElementType,
} from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../Button';

import Snackbar from '.';
import Container from './Container';

type Props = {};
type State = { snackbars: $ReadOnlyArray<Element<ElementType>> };

class Story extends React.PureComponent<Props, State> {
  state = { snackbars: [] };

  id = 0;

  handlePress = name => () => {
    this.id += 1;

    if (name === 'basic') {
      this.setState((state) => {
        return {
          snackbars: [...state.snackbars, (
            <Snackbar key={this.id}>
              A basic snackbar
            </Snackbar>
          )],
        };
      });
    } else if (name === 'with-action') {
      this.setState((state) => {
        return {
          snackbars: [...state.snackbars, (
            <Snackbar
              key={this.id}
              action={(<Button onPress={action('Snackbar action')}>Action</Button>)}
            >
              A Snackbar with an action
            </Snackbar>
          )],
        };
      });
    }
  };

  /**
   * Remove the first Snackbar from the state when the current Snackbar animates out.
   */
  handleRemoveSnackbar = () => {
    this.setState((state) => {
      return { snackbars: state.snackbars.slice(1) };
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
        <Container>
          {this.state.snackbars}
        </Container>

        <div>
          <Button onPress={this.handlePress('basic')}>Add snackbar</Button>

          <Button onPress={this.handlePress('with-action')}>Add snackbar with action</Button>
        </div>
      </div>
    );
  }
}

storiesOf('Snackbar', module)
  .add('Story', () => (
    <Story />
  ));
