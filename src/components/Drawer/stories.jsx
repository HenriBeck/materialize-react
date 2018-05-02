// @flow strict

import React, { type Node } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import IconButton from '../IconButton';
import Icon from '../Icon';
import Switch from '../Switch';

import Drawer from '.';

type Props = {};
type State = {
  isOpen: boolean,
  isNarrow: boolean,
};

class DrawerStory extends React.PureComponent<Props, State> {
  state = {
    isOpen: false,
    isNarrow: true,
  };

  handleDrawerClose = () => {
    this.setState({ isOpen: false });
  };

  handleDrawerOpen = () => {
    this.setState({ isOpen: true });
  };

  handleNarrowToggle = () => {
    this.setState((state: State): State => {
      return {
        isNarrow: !state.isNarrow,
        isOpen: false,
      };
    });
  };

  render(): Node {
    return (
      <Drawer
        {...this.props}
        isOpen={this.state.isOpen}
        isNarrow={this.state.isNarrow}
        drawerContent={(
          <div style={{ padding: 32 }}>
            Drawer Content

            <IconButton onPress={this.handleDrawerClose}>
              <Icon icon="close" />
            </IconButton>
          </div>
        )}
        onCloseRequest={this.handleDrawerClose}
      >
        <div style={{ padding: 32 }}>
          <IconButton onPress={this.handleDrawerOpen}>
            <Icon icon="menu" />
          </IconButton>

          Main Content

          <Switch
            toggled={this.state.isNarrow}
            onChange={this.handleNarrowToggle}
          />
        </div>
      </Drawer>
    );
  }
}

storiesOf('App Elements', module)
  .add('Drawer', () => (
    <DrawerStory
      position={select('Position', {
        left: 'Left',
        right: 'Right',
      }, 'left')}
    />
  ));
