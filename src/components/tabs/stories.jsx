import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import PropTypes from 'prop-types';

import Tab from '../tab';

import Tabs from './tabs';

/**
 * The story container for the tabs container.
 *
 * @class
 */
class Story extends PureComponent {
  static propTypes = {
    initialTab: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  };

  state = { selected: this.props.initialTab };

  handleChange = name => this.setState({ selected: name });

  render() {
    return this.props.children({
      onChange: this.handleChange,
      selected: this.state.selected,
    });
  }
}

storiesOf('Tabs', module)
  .add('Default styles', () => (
    <Story initialTab="test1">
      {props => (
        <Tabs
          tab={props.selected}
          onChange={props.onChange}
        >
          <Tab name="test1">Test 1</Tab>
          <Tab name="test2">Test 2</Tab>
          <Tab name="test3">Test 3</Tab>
        </Tabs>
      )}
    </Story>
  ))
  .add('Icon tabs with text', () => (
    <Story initialTab="test2">
      {props => (
        <Tabs
          tab={props.selected}
          tabStyle="text-and-icons"
          onChange={props.onChange}
        >
          <Tab
            name="test1"
            icon="settings"
          >
            Test 1
          </Tab>

          <Tab
            name="test2"
            icon="bell"
          >
            Test 2
          </Tab>

          <Tab
            name="test3"
            icon="account"
          >
            Test 3
          </Tab>
        </Tabs>
      )}
    </Story>
  ))
  .add('Icon tabs', () => (
    <Story initialTab="test2">
      {props => (
        <Tabs
          tab={props.selected}
          tabStyle="icons"
          onChange={props.onChange}
        >
          <Tab
            name="test1"
            icon="settings"
          />

          <Tab
            name="test2"
            icon="bell"
          />

          <Tab
            name="test3"
            icon="account"
          />
        </Tabs>
      )}
    </Story>
  ))
  .add('No Bar', () => (
    <Story initialTab="test1">
      {props => (
        <Tabs
          noBar
          tab={props.selected}
          onChange={props.onChange}
        >
          <Tab name="test1">Test 1</Tab>
          <Tab name="test2">Test 2</Tab>
          <Tab name="test3">Test 3</Tab>
        </Tabs>
      )}
    </Story>
  ));
