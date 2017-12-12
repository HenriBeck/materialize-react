import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import EventListener from 'react-event-listener';

import getNotDeclaredProps from '../../get-not-declared-props';
import { filter, head, pipe } from '../../utils/functions';
import { easeInOutQuad } from '../../styles/timings';
import { cloneChildrenWithClassName } from '../../utils/react';
import Backdrop from '../backdrop';

import DrawerContent from './drawer-content';
import MainContent from './main-content';

const findChild = type => pipe(
  filter(child => child.type === type),
  head,
);
const getDrawerContent = findChild(DrawerContent);
const getMainContent = findChild(MainContent);

/**
 * A component which will render a SideNav and some content.
 *
 * @class
 */
class Drawer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      drawer: PropTypes.string.isRequired,
      drawerContent: PropTypes.string.isRequired,
      mainContent: PropTypes.string.isRequired,
    }).isRequired,
    theme: PropTypes.shape(
      { zIndexes: PropTypes.shape({ drawer: PropTypes.number.isRequired }).isRequired },
    ).isRequired,
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    responsiveWidth: PropTypes.number,
    className: PropTypes.string,
    drawerPosition: PropTypes.oneOf(['left', 'right']),
    onNarrowChange: PropTypes.func,
    onCloseRequest: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    className: '',
    responsiveWidth: 640,
    drawerPosition: 'left',
    onNarrowChange: noop,
    onCloseRequest: noop,
  };

  static MainContent = MainContent;

  static DrawerContent = DrawerContent;

  /**
   * The styles for the drawer.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles.
   */
  static styles(theme) {
    return {
      drawer: {
        composes: 'drawer',
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      },

      drawerContent: {
        composes: 'drawer--drawer-content',
        height: '100%',
        display: 'inline',
        position: 'absolute',
        backgroundColor: theme.sheetColor,
        top: 0,
        left: -256,
        bottom: 0,
        width: 256,
        willChange: 'transform',
        transition: `transform 200ms ${easeInOutQuad}`,
      },

      mainContent: {
        composes: 'drawer--main-content',
        width: '100%',
        height: '100%',
      },
    };
  }

  state = { isNarrow: window.innerWidth < this.props.responsiveWidth };

  /**
   * Change the isAnimating property when the opened state has changed.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.isAnimating = true;
    }
  }

  isAnimating = false;

  /**
   * Update the state whether or not the drawer is still in narrow mode.
   *
   * @private
   */
  handleResize = () => {
    this.setState((state) => {
      const isNarrow = window.innerWidth < this.props.responsiveWidth;

      if (isNarrow === state.isNarrow) {
        return null;
      }

      this.props.onNarrowChange();

      return { isNarrow };
    });
  };

  /**
   * Close the drawer upon backdrop press.
   */
  handleBackdropPress = () => {
    if (this.isAnimating) {
      return;
    }

    this.props.onCloseRequest();
  };

  /**
   * Toggle the backdropFinishedTransitioning when the backdrop finishes the transition.
   * This fixes a bug we're on mobile the drawer would immediately close after opening it
   * because the mouse event after the touch event would fire on the backdrop
   * and not the actual clicked element.
   */
  handleAnimationEnd = () => {
    this.isAnimating = false;
  };

  render() {
    const children = Children.toArray(this.props.children);

    return (
      <div
        {...getNotDeclaredProps(this.props, Drawer)}
        className={classnames(
          this.props.classes.drawer,
          this.props.className,
        )}
      >
        <EventListener
          target="window"
          onResize={this.handleResize}
        />

        <Backdrop
          active={this.state.isNarrow && this.props.open}
          onClick={this.handleBackdropPress}
          onAnimationEnd={this.handleAnimationEnd}
        />

        {cloneChildrenWithClassName(getDrawerContent(children), {
          className: this.props.classes.drawerContent,
          style: {
            transform: `translateX(${this.state.isNarrow && !this.props.open ? 0 : 100}%)`,
            zIndex: this.state.isNarrow ? this.props.theme.zIndexes.drawer : 0,
          },
        })}

        {cloneChildrenWithClassName(getMainContent(children), {
          className: this.props.classes.mainContent,
          style: { paddingLeft: this.state.isNarrow ? 0 : 256 },
        })}
      </div>
    );
  }
}

export default injectSheet(Drawer.styles)(Drawer);
