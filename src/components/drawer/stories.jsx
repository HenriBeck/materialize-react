import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';

import IconButton from '../icon-button';

import Drawer from './drawer-container';

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
        style={{ minHeight: '100vh' }}
        ref={(element) => { this.drawer = element; }}
      >
        <Drawer.DrawerContent>
          <div style={{ padding: 32 }}>
            Drawer Content

            <IconButton
              icon="close"
              onPress={this.handleDrawerClose}
            />
          </div>
        </Drawer.DrawerContent>

        <Drawer.MainContent>
          <div style={{ padding: 32 }}>
            <IconButton
              icon="menu"
              onPress={this.handleDrawerOpen}
            />

            Main Content
          </div>
        </Drawer.MainContent>
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
