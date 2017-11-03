import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';

import getNotDeclaredProps from '../../get-not-declared-props';

import Drawer from './drawer';
import DrawerContent from './drawer-content';
import MainContent from './main-content';

/**
 * A component which will render a SideNav and some content.
 *
 * @class
 */
export default class DrawerContainer extends PureComponent {
  static propTypes = {
    children(props) {
      const children = Children.toArray(props.children);
      const contentElements = DrawerContainer.getMainContent(children);
      const drawerElements = DrawerContainer.getDrawerContent(children);
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
    className: PropTypes.string,
    drawerPosition: PropTypes.oneOf(['left', 'right']),
    onNarrowChange: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    className: '',
    responsiveWidth: 640,
    drawerPosition: 'left',
    onNarrowChange: noop,
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
   * Change the isAnimating property when the opened state has changed.
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.opened !== this.state.opened) {
      this.isAnimating = true;
    }
  }

  /**
   * Remove the resize event handler.
   *
   * @private
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  isAnimating = false;

  /**
   * Open the SideNav when the drawer is in narrow mode.
   */
  open() {
    if (this.isAnimating) {
      return;
    }

    this.setState({ opened: true });
  }

  /**
   * Close the SideNav when the drawer is in narrow mode.
   */
  close() {
    if (this.isAnimating) {
      return;
    }

    this.setState({ opened: false });
  }

  /**
   * Toggle the open state of the drawer.
   */
  toggle() {
    if (this.isAnimating) {
      return;
    }

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
    this.close();
  };

  /**
   * Toggle the backdropFinishedTransitioning when the backdrop finishes the transition.
   * This fixes a bug we're on mobile the drawer would immediately close after opening it
   * because the mouse event after the touch event would fire on the backdrop
   * and not the actual clicked element.
   */
  handleTransitionEnd = () => {
    this.isAnimating = false;
  };

  render() {
    const children = Children.toArray(this.props.children);
    const {
      drawerPosition,
      className,
      ...props
    } = this.props;

    return (
      <Drawer
        {...getNotDeclaredProps(props, DrawerContainer)}
        drawerContent={DrawerContainer.getDrawerContent(children)[0]}
        mainContent={DrawerContainer.getMainContent(children)[0]}
        className={className}
        isNarrow={this.state.isNarrow}
        opened={this.state.opened}
        drawerPosition={drawerPosition}
        onBackdropPress={this.handleBackdropPress}
        onTransitionEnd={this.handleTransitionEnd}
      />
    );
  }
}
