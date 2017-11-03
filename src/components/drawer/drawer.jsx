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
 * @param {Boolean} props.isNarrow - Whether or not the drawer is currently in narrow mode.
 * @param {Boolean} props.opened - Whether or not the drawer is opened.
 * Only applies when the drawer is also in narrow mode.
 * @param {Function} props.onBackdropPress - A callback to when the backdrop is pressed.
 * @param {String} props.drawerPosition - The position of the drawer. Either left or right.
 * @param {String} props.className - An additional class name for the root component.
 * @param {Function} props.onTransitionEnd - When the transition of the backdrop has finished.
 * @returns {JSX} - Returns the jsx for the drawer.
 */
function Drawer({
  classes,
  drawerContent,
  mainContent,
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
    { [classes.backdropActive]: isNarrow && opened },
  );

  return (
    <div
      {...getNotDeclaredProps(props, Drawer)}
      className={rootClassName}
    >
      <EventHandler
        component="span"
        className={backdropClassName}
        onPress={onBackdropPress}
        onTransitionEnd={onTransitionEnd}
      />

      {React.cloneElement(drawerContent, { className: drawerContentClassName })}

      {React.cloneElement(mainContent, { className: mainContentClassName })}
    </div>
  );
}

Drawer.propTypes = {
  classes: PropTypes.shape({
    drawer: PropTypes.string.isRequired,
    drawerContent: PropTypes.string.isRequired,
    mainContent: PropTypes.string.isRequired,
    backdrop: PropTypes.string.isRequired,
  }).isRequired,
  drawerContent: PropTypes.node.isRequired,
  mainContent: PropTypes.node.isRequired,
  isNarrow: PropTypes.bool.isRequired,
  opened: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  drawerPosition: PropTypes.string.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
  onTransitionEnd: PropTypes.func.isRequired,
};

Drawer.styles = (theme) => {
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
        paddingRight: 256,
      },

      '&.drawer--position-right $drawerContent': {
        left: 'auto',
        right: -256,
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
      backgroundColor: theme.sheetColor,
      top: 0,
      left: -256,
      bottom: 0,
      width: 256,
      transform: 'translateX(100%)',
      willChange: 'transform',
      transition: `transform 200ms ${easeInOutQuad}`,
    },

    drawerContentNarrow: {
      composes: 'drawer--drawer-content-narrow',
      transform: 'translateX(0)',
      zIndex: theme.zIndexes.drawer,
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
      paddingLeft: 256,
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
      backgroundColor: theme.backdropColor,
      zIndex: theme.zIndexes.drawer,
      opacity: 0,
      transform: 'scale(0)',
      willChange: 'opacity',
      transition: 'opacity 200ms',
    },

    backdropActive: {
      composes: 'drawer--backdrop-active',
      opacity: 1,
      transform: 'scale(1)',
    },
  };
};

export default injectSheet(Drawer.styles)(Drawer);
