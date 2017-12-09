import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import getNotDeclaredProps from '../../get-not-declared-props';

import Checkbox from './checkbox';

/**
 * Story component for the Checkbox component.
 *
 * @class
 */
class Story extends PureComponent {
  static propTypes = { initialChecked: PropTypes.bool };

  static defaultProps = { initialChecked: false };

  state = { checked: this.props.initialChecked };

  handleChange = () => this.setState({ checked: !this.state.checked });

  render() {
    return (
      <Checkbox
        checked={this.state.checked}
        onChange={this.handleChange}
        {...getNotDeclaredProps(this.props, Story)}
      />
    );
  }
}

storiesOf('Checkbox', module)
  .add('Default styles', () => (
    <Story />
  ))
  .add('Default Checked', () => (
    <Story initialChecked />
  ))
  .add('Disabled and Checked', () => (
    <Story
      disabled
      initialChecked
    />
  ));
