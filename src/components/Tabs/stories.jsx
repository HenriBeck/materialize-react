// @flow strict

import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import PropTypes from 'prop-types';

import Tab from '../Tab';
import Icon from '../Icon';

import Tabs from '.';

type Props = {
  tabs: $ReadOnlyArray<{
    name: string,
    children?: string,
  }>,
  color: 'primary' | 'accent',
  tabStyle: 'text' | 'icons' | 'text-and-icons',
};
type State = { tab: string };

class Story extends React.PureComponent<Props, State> {
  static propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
    ).isRequired,
    color: PropTypes.string.isRequired,
    tabStyle: PropTypes.string.isRequired,
  };

  state = { tab: this.props.tabs[0].name };

  handleChange = name => this.setState({ tab: name });

  render() {
    return (
      <Tabs
        color={this.props.color}
        tabStyle={this.props.tabStyle}
        tab={this.state.tab}
        onChange={this.handleChange}
      >
        {this.props.tabs.map(tab => (
          <Tab
            key={tab.name}
            {...tab}
          />
        ))}
      </Tabs>
    );
  }
}

storiesOf('Interactive Elements/Tabs', module)
  .add('With Text', () => (
    <Story
      tabStyle="text"
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
      tabs={[{
        name: 'test1',
        children: 'Test 1',
      }, {
        name: 'test2',
        children: 'Test 2',
      }, {
        name: 'test3',
        children: 'Test 3',
      }]}
    />
  ))
  .add('With Icons', () => (
    <Story
      tabStyle="icons"
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
      tabs={[{
        name: 'test1',
        icon: <Icon icon="settings" />,
      }, {
        name: 'test2',
        icon: <Icon icon="bell" />,
      }, {
        name: 'test3',
        icon: <Icon icon="account" />,
      }]}
    />
  ))
  .add('With Text and Icons', () => (
    <Story
      tabStyle="text-and-icons"
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
      tabs={[{
        name: 'test1',
        children: 'Test 1',
        icon: <Icon icon="settings" />,
      }, {
        name: 'test2',
        children: 'Test 2',
        icon: <Icon icon="bell" />,
      }, {
        name: 'test3',
        children: 'Test 3',
        icon: <Icon icon="account" />,
      }]}
    />
  ));
