import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import PropTypes from 'prop-types';

import RadioButton from '../radio-button';
import Label from '../label';

import RadioButtonGroup from './radio-button-group';

/**
 * The story component for the Radio Buttons.
 *
 * @class
 */
class Story extends PureComponent {
  static propTypes = { initialSelected: PropTypes.string.isRequired };

  state = { selected: this.props.initialSelected };

  /**
   * Change the state when the selected radio button changes.
   *
   * @param {String} name - The name of the radio button.
   */
  handleChange = (name) => {
    this.setState({ selected: name });
  };

  render() {
    return (
      <RadioButtonGroup
        selected={this.state.selected}
        onChange={this.handleChange}
      >
        <Label disabled>
          <RadioButton name="test1" />

          Test 1
        </Label>

        <Label>
          <RadioButton name="test2" />

          Test 2
        </Label>

        <Label>
          <RadioButton name="test3" />

          Test 3
        </Label>
      </RadioButtonGroup>
    );
  }
}

storiesOf('RadioButtonGroup', module)
  .add('Default styles', () => (
    <Story initialSelected="" />
  ));

