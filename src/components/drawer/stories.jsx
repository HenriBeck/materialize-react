import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';

import Drawer from './drawer';
import DrawerContent from './drawer-content';
import MainContent from './main-content';
import IconButton from '../icon-button';

/**
 * A component which creates a fully working drawer for the story.
 *
 * @class
 */
class DrawerStory extends PureComponent {
  /**
   * When the close icon inside the drawer is pressed we want to close the drawer.
   */
  handleDrawerClose = () => {
    this.drawer.close();
  };

  /**
   * When the menu icon button is pressed we want to open the drawer.
   */
  handleDrawerOpen = () => {
    this.drawer.open();
  };

  render() {
    return (
      <Drawer
        {...this.props}
        style={{ flex: 1 }}
        ref={(element) => { this.drawer = element; }}
      >
        <DrawerContent style={{ padding: 32 }}>
          Drawer Content

          <IconButton
            icon="close"
            onPress={this.handleDrawerClose}
          />
        </DrawerContent>

        <MainContent style={{ padding: 32 }}>
          Main Content

          <IconButton
            icon="menu"
            onPress={this.handleDrawerOpen}
          />
        </MainContent>
      </Drawer>
    );
  }
}

storiesOf('Drawer', module)
  .add('Left Drawer', () => (
    <DrawerStory />
  ))
  .add('Right Drawer', () => (
    <DrawerStory drawerPosition="right" />
  ))
  .add('Custom responsive width', () => (
    <DrawerStory responsiveWidth={1000} />
  ));
