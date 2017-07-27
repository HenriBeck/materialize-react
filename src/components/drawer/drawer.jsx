import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';

import DrawerContainer from './drawer-container';
import DrawerContent from './drawer-content';
import MainContent from './main-content';

/**
 * A component which will render a SideNav and some content.
 *
 * @class
 */
export default class Drawer extends PureComponent {
  static propTypes = {
    children(props) {
      const children = Children.toArray(props.children);
      const contentElements = Drawer.getMainContent(children);
      const drawerElement = Drawer.getDrawerContent(children);
      const missingElementMessage = elem => `Missing ${elem} element inside Drawer component`;
      const multipleElementsMessage = elem => `Multiple ${elem} elements are not supported`;

      if (contentElements.length !== 1) {
        return contentElements.length === 0
          ? new Error(missingElementMessage('MainContent'))
          : new Error(multipleElementsMessage('MainContent'));
      }

      if (drawerElement.length !== 1) {
        return contentElements.length === 0
          ? new Error(missingElementMessage('DrawerContent'))
          : new Error(multipleElementsMessage('DrawerContent'));
      }

      return null;
    },
    responsiveWidth: PropTypes.number,
    backdrop: PropTypes.bool,
    drawerPosition: PropTypes.oneOf(['left', 'right']),
    onNarrowChange: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    responsiveWidth: 640,
    backdrop: true,
    drawerPosition: 'left',
    onNarrowChange: () => {},
  };

  static MainContent = MainContent;
  static DrawerContent = DrawerContent;

  /**
   * Get all the children which are the DrawerContent component.
   *
   * @param {JSX[]} elements - The elements as an array.
   * @returns {JSX[]} - Returns the filtered elements.
   */
  static getDrawerContent(elements) {
    return elements.filter(child => child.type === DrawerContent);
  }

  /**
   * Get all the children which are the MainContent component.
   *
   * @param {JSX[]} elements - The elements as an array.
   * @returns {JSX[]} - Returns the filtered elements.
   */
  static getMainContent(elements) {
    return elements.filter(child => child.type === MainContent);
  }

  state = {
    opened: false,
    isNarrow: window.innerWidth < this.props.responsiveWidth,
  };

  /**
   * Add a event listener to the resize event so we can change the narrow state.
   *
   * @private
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Remove the resize event handler.
   *
   * @private
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Open the SideNav when the drawer is in narrow mode.
   */
  open() {
    this.setState({ opened: true });
  }

  /**
   * Close the SideNav when the drawer is in narrow mode.
   */
  close() {
    this.setState({ opened: false });
  }

  /**
   * Toggle the open state of the drawer.
   */
  toggle() {
    this.setState(({ opened }) => {
      return { opened: !opened };
    });
  }

  /**
   * Update the state whether or not the drawer is still in narrow mode.
   *
   * @private
   */
  handleResize = () => {
    const isNarrow = window.innerWidth < this.props.responsiveWidth;

    if (this.state.isNarrow !== isNarrow) {
      this.setState({
        isNarrow,
        opened: false,
      }, () => this.props.onNarrowChange(this.state.isNarrow));
    }

    this.setState({ isNarrow });
  };

  render() {
    const children = Children.toArray(this.props.children);

    return (
      <DrawerContainer
        drawerContent={Drawer.getDrawerContent(children)[0]}
        mainContent={Drawer.getMainContent(children)[0]}
        backdropEnabled={this.props.backdrop}
        isNarrow={this.state.isNarrow}
        opened={this.state.opened}
        drawerPosition={this.props.drawerPosition}
      />
    );
  }
}
