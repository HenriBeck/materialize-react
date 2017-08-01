import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

import { easeInOutQuad } from '../../styles/timings';

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
 * @param {String} props.drawerPosition - The position of the drawer. Either left or right.
 * @returns {JSX} - Returns the jsx for the drawer.
 */
export function DrawerContainer({
  classes,
  drawerContent,
  mainContent,
  backdropEnabled,
  isNarrow,
  opened,
  drawerPosition,
}) {
  const className = classNames(classes.drawer, {
    'drawer--backdrop-active': backdropEnabled && isNarrow && opened,
    'drawer--narrow-mode': isNarrow,
    'drawer--opened': isNarrow && opened,
    'drawer--position-right': drawerPosition === 'right',
  });

  return (
    <div className={className}>
      {React.cloneElement(drawerContent, { className: classes.drawerContent })}

      {React.cloneElement(mainContent, { className: classes.mainContent })}

      {backdropEnabled && <span className={classes.backdrop} />}
    </div>
  );
}

DrawerContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerContent: PropTypes.node.isRequired,
  mainContent: PropTypes.node.isRequired,
  backdropEnabled: PropTypes.bool.isRequired,
  isNarrow: PropTypes.bool.isRequired,
  opened: PropTypes.bool.isRequired,
  drawerPosition: PropTypes.string.isRequired,
};

DrawerContainer.styles = ({ drawer: theme }) => {
  return {
    drawer: {
      composes: 'drawer',
      position: 'relative',
      height: '100%',
      width: '100%',
      overflow: 'hidden',

      '&.backdrop--active $backdrop': { opacity: theme.backdropActiveOpacity },

      '&.drawer--narrow-mode $drawerContent': { transform: 'translateX(0)' },

      '&.drawer--narrow-mode $mainContent': { paddingLeft: 0 },

      '&.drawer--narrow-mode.drawer--opened $drawerContent': { transform: 'translateX(100%)' },

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
      composes: 'drawer--content',
      height: '100%',
      display: 'inline',
      position: 'absolute',
      top: 0,
      left: -theme.drawerWidth,
      bottom: 0,
      width: theme.drawerWidth,
      transform: 'translateX(100%)',
      willChange: 'transform',
      transition: `transform ${theme.transitionDuration}ms ${easeInOutQuad}`,
    },

    mainContent: {
      boxSizing: 'border-box',
      composes: 'main--content',
      width: '100%',
      height: '100%',
      paddingLeft: theme.drawerWidth,
    },

    backdrop: {
      composes: 'drawer--backdrop',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.backdropBgColor,
      opacity: 0,
      willChange: 'opacity',
      transition: `opacity ${theme.transitionDuration}ms ${easeInOutQuad}`,
    },
  };
};

export default injectSheet(DrawerContainer.styles)(DrawerContainer);
