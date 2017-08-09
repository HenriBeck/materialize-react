import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';

import DrawerContainer from './drawer-container';
import DrawerContent from './drawer-content';
import MainContent from './main-content';
import getNotDeclaredProps from '../../get-not-declared-props';

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
      const drawerElements = Drawer.getDrawerContent(children);
      const missingElementMessage = elem => `Missing ${elem} element inside Drawer component`;
      const multipleElementsMessage = elem => `Multiple ${elem} elements are not supported`;

      if (contentElements.length !== 1) {
        return contentElements.length === 0
          ? new Error(missingElementMessage('MainContent'))
          : new Error(multipleElementsMessage('MainContent'));
      }

      if (drawerElements.length !== 1) {
        return drawerElements.length === 0
          ? new Error(missingElementMessage('DrawerContent'))
          : new Error(multipleElementsMessage('DrawerContent'));
      }

      return null;
    },
    responsiveWidth: PropTypes.number,
    backdrop: PropTypes.bool,
    drawerPosition: PropTypes.oneOf(['left', 'right']),
    onNarrowChange: PropTypes.func,
    closeOnBackdropClick: PropTypes.bool,
  };

  static defaultProps = {
    children: '',
    responsiveWidth: 640,
    backdrop: true,
    drawerPosition: 'left',
    onNarrowChange: () => {},
    closeOnBackdropClick: false,
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

  backdropFinishedTransitioning = false;

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
  };

  /**
   * Close the drawer upon backdrop press.
   */
  handleBackdropPress = () => {
    if (this.props.closeOnBackdropClick && this.backdropFinishedTransitioning) {
      this.close();
    }
  };

  /**
   * Toggle the backdropFinishedTransitioning when the backdrop finishes the transition.
   * This fixes a bug we're on mobile the drawer would immediately close after opening it
   * because the mouse event after the touch event would fire on the backdrop
   * and not the actual clicked element.
   */
  handleTransitionEnd = () => {
    this.backdropFinishedTransitioning = !this.backdropFinishedTransitioning;
  };

  render() {
    const children = Children.toArray(this.props.children);
    const {
      backdrop,
      drawerPosition,
      ...props
    } = this.props;

    return (
      <DrawerContainer
        {...getNotDeclaredProps(props, Drawer)}
        drawerContent={Drawer.getDrawerContent(children)[0]}
        mainContent={Drawer.getMainContent(children)[0]}
        backdropEnabled={backdrop}
        isNarrow={this.state.isNarrow}
        opened={this.state.opened}
        drawerPosition={drawerPosition}
        onBackdropPress={this.handleBackdropPress}
        onTransitionEnd={this.handleTransitionEnd}
      />
    );
  }
}
