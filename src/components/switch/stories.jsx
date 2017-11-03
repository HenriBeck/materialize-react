import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import Switch from './switch';

/**
 * The story for the switch component.
 *
 * @class
 */
class Story extends PureComponent {
  static propTypes = { initialToggled: PropTypes.bool };

  static defaultProps = { initialToggled: false };

  state = { toggled: this.props.initialToggled };

  handleChange = () => this.setState({ toggled: !this.state.toggled });

  render() {
    return (
      <Switch
        toggled={this.state.toggled}
        onChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

storiesOf('Switch', module)
  .add('Default Styles', () => (
    <Story />
  ))
  .add('Default Toggled', () => (
    <Story initialToggled />
  ))
  .add('Disabled', () => (
    <Story disabled />
  ));
