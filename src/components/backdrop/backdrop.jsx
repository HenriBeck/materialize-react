import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which renders a backdrop.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Backdrop(props) {
  return (
    <span
      className={classnames(
        props.classes.backdrop,
        { [props.classes.backdropActive]: props.active },
        props.className,
      )}
      {...getNotDeclaredProps(props, Backdrop)}
    />
  );
}

Backdrop.propTypes = {
  classes: PropTypes.shape({
    backdrop: PropTypes.string.isRequired,
    backdropActive: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
};

Backdrop.defaultProps = {
  className: '',
  active: false,
};

Backdrop.styles = (theme) => {
  return {
    '@keyframes backdrop--fade-out': {
      from: {
        opacity: 1,
        transform: 'scale(1)',
      },

      '99%': { transform: 'scale(1)' },
      to: {
        opacity: 0,
        transform: 'scale(0)',
      },
    },

    '@keyframes backdrop--fade-in': {
      from: {
        opacity: 0,
        transform: 'scale(1)',
      },
      to: { opacity: 1 },
    },

    backdrop: {
      composes: 'backdrop',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.backdropColor,
      zIndex: theme.zIndexes.backdrop,
      willChange: 'opacity',
      animationFillMode: 'forwards',
      animationName: 'backdrop--fade-out',
      animationDuration: 200,
      opacity: 0,
    },

    backdropActive: {
      composes: 'backdrop--active',
      animationName: 'backdrop--fade-in',
    },
  };
};

export default injectSheet(Backdrop.styles)(Backdrop);
