import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import elevation from '../../styles/elevation';

import Container from './dialog-container';
import Header from './dialog-header';
import Content from './dialog-content';
import Actions from './dialog-actions';

/**
 * Render a dialog.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Dialog(props) {
  return (
    <div
      role="dialog"
      className={classnames(props.classes.dialog, {
        [props.classes.fullscreen]: props.fullscreen,
        [props.classes.animateOut]: props.isAnimatingOut,
        [props.classes.animateOutFullscreen]: props.isAnimatingOut && props.fullscreen,
      }, props.className)}
      onAnimationEnd={props.onAnimationEnd}
    >
      {props.children}
    </div>
  );
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    dialog: PropTypes.string.isRequired,
    fullscreen: PropTypes.string.isRequired,
    animateOut: PropTypes.string.isRequired,
    animateOutFullscreen: PropTypes.string.isRequired,
  }).isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
  isAnimatingOut: PropTypes.bool.isRequired,
  fullscreen: PropTypes.bool,
  className: PropTypes.string,
};

Dialog.defaultProps = {
  fullscreen: false,
  className: '',
};

Dialog.Container = Container;
Dialog.Header = Header;
Dialog.Content = Content;
Dialog.Actions = Actions;

Dialog.styles = (theme) => {
  return {
    '@keyframes dialog--animate-in': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },

    '@keyframes dialog--animate-out': {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },

    '@keyframes dialog--animate-in-fullscreen': {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' },
    },

    '@keyframes dialog--animate-out-fullscreen': {
      from: { transform: 'translateY(0)' },
      to: { transform: 'translateY(100%)' },
    },

    dialog: {
      composes: 'dialog',
      backgroundColor: theme.sheetColor,
      borderRadius: 2,
      boxShadow: elevation(24),
      animationDuration: 250,
      animationFillMode: 'forwards',
      zIndex: theme.zIndexes.dialog,
      opacity: 0,
      animationName: 'dialog--animate-in',
    },

    animateOut: { animationName: 'dialog--animate-out' },

    fullscreen: {
      composes: 'dialog--fullscreen',
      boxShadow: 'none',
      borderRadius: 0,
      opacity: 1,
      position: 'absolute',
      animationName: 'dialog--animate-in-fullscreen',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    animateOutFullscreen: { animationName: 'dialog--animate-out-fullscreen' },
  };
};

export default injectSheet(Dialog.styles)(Dialog);
