import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import { easeInOutQuad } from '../../styles/timings';
import EventHandler from '../event-handler';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * The container for the component. This is will render all the dom elements
 * and apply the correct classes.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classnames provided by Jss.
 * @param {JSX} props.drawerContent - The content for the drawer.
 * @param {JSX} props.mainContent - The content for the always visible main area.
 * @param {Boolean} props.backdropEnabled - Whether or not it should fade in a backdrop
 * when the drawer is in narrow mode and opened.
 * @param {Boolean} props.isNarrow - Whether or not the drawer is currently in narrow mode.
 * @param {Boolean} props.opened - Whether or not the drawer is opened.
 * Only applies when the drawer is also in narrow mode.
 * @param {Function} props.onBackdropPress - A callback to when the backdrop is pressed.
 * @param {String} props.drawerPosition - The position of the drawer. Either left or right.
 * @param {String} props.className - An additional class name for the root component.
 * @param {Function} props.onTransitionEnd - When the transition of the backdrop has finished.
 * @returns {JSX} - Returns the jsx for the drawer.
 */
export function DrawerContainer({
  classes,
  drawerContent,
  mainContent,
  backdropEnabled,
  isNarrow,
  opened,
  className,
  drawerPosition,
  onBackdropPress,
  onTransitionEnd,
  ...props
}) {
  const rootClassName = classnames(
    classes.drawer,
    { 'drawer--position-right': drawerPosition === 'right' },
    className,
  );
  const drawerContentClassName = classnames(classes.drawerContent, {
    [classes.drawerContentNarrow]: isNarrow,
    [classes.drawerContentNarrowOpened]: isNarrow && opened,
  }, drawerContent.props.className);
  const mainContentClassName = classnames(
    classes.mainContent,
    { [classes.mainContentNarrow]: isNarrow },
    mainContent.props.className,
  );
  const backdropClassName = classnames(
    classes.backdrop,
    { [classes.backdropActive]: backdropEnabled && isNarrow && opened },
  );

  return (
    <div
      {...getNotDeclaredProps(props, DrawerContainer)}
      className={rootClassName}
    >
      {React.cloneElement(drawerContent, { className: drawerContentClassName })}

      {React.cloneElement(mainContent, { className: mainContentClassName })}

      {backdropEnabled && (
        <EventHandler
          component="span"
          className={backdropClassName}
          onPress={onBackdropPress}
          onTransitionEnd={onTransitionEnd}
        />
      )}
    </div>
  );
}

DrawerContainer.propTypes = {
  classes: PropTypes.shape({
    drawer: PropTypes.string.isRequired,
    drawerContent: PropTypes.string.isRequired,
    mainContent: PropTypes.string.isRequired,
    backdrop: PropTypes.string.isRequired,
  }).isRequired,
  drawerContent: PropTypes.node.isRequired,
  mainContent: PropTypes.node.isRequired,
  backdropEnabled: PropTypes.bool.isRequired,
  isNarrow: PropTypes.bool.isRequired,
  opened: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  drawerPosition: PropTypes.string.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  onTransitionEnd: PropTypes.func.isRequired,
};

DrawerContainer.styles = ({ drawer: theme }) => {
  return {
    drawer: {
      composes: 'drawer',
      position: 'relative',
      height: '100%',
      width: '100%',
      overflow: 'hidden',

      // Drawer position right styles
      '&.drawer--position-right $mainContent': {
        paddingLeft: 0,
        paddingRight: theme.drawerWidth,
      },

      '&.drawer--position-right $drawerContent': {
        left: 'auto',
        right: -theme.drawerWidth,
        transform: 'translateX(-100%)',
      },

      '&.drawer--position-right.drawer--narrow-mode $drawerContent': { transform: 'translateX(0)' },

      // eslint-disable-next-line max-len
      '&.drawer--position-right.drawer--narrow-mode.drawer--opened $drawerContent': { transform: 'translateX(-100%)' },

      '&.drawer--position-right.drawer--narrow-mode $mainContent': { paddingRight: 0 },
    },

    drawerContent: {
      composes: 'drawer--drawer-content',
      height: '100%',
      display: 'inline',
      position: 'absolute',
      boxSizing: 'border-box',
      backgroundColor: theme.drawerBgColor,
      top: 0,
      left: -theme.drawerWidth,
      bottom: 0,
      width: theme.drawerWidth,
      transform: 'translateX(100%)',
      willChange: 'transform',
      transition: `transform ${theme.transitionDuration}ms ${easeInOutQuad}`,
    },

    drawerContentNarrow: {
      composes: 'drawer--drawer-content-narrow',
      transform: 'translateX(0)',
      zIndex: theme.drawerZIndex,
    },

    drawerContentNarrowOpened: {
      composes: 'drawer--drawer-content-narrow-opened',
      transform: 'translateX(100%)',
    },

    mainContent: {
      composes: 'drawer--main-content',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      paddingLeft: theme.drawerWidth,
    },

    mainContentNarrow: {
      composes: 'drawer--main-content-narrow',
      paddingLeft: 0,
    },

    backdrop: {
      composes: 'drawer--backdrop',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.backdropBgColor,
      zIndex: theme.backdropZIndex,
      opacity: 0,
      transform: 'scale(0)',
      willChange: 'opacity',
      transition: `opacity ${theme.transitionDuration}ms ${easeInOutQuad}`,
    },

    backdropActive: {
      composes: 'drawer--backdrop-active',
      opacity: theme.backdropActiveOpacity,
      transform: 'scale(1)',
    },
  };
};

export default injectSheet(DrawerContainer.styles)(DrawerContainer);
