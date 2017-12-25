import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * The underline for the textfield component.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Underline(props) {
  return (
    <span
      className={classnames(props.classes.underline, {
        [props.classes.underlineDisabled]: props.disabled,
        [props.classes.withError]: props.hasError,
        [props.classes.underlineActive]: props.isFocused || props.hasError,
      })}
    />
  );
}

Underline.propTypes = {
  classes: PropTypes.shape({
    underline: PropTypes.string.isRequired,
    underlineDisabled: PropTypes.string.isRequired,
    withError: PropTypes.string.isRequired,
    underlineActive: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

Underline.styles = (theme) => {
  const bgColor = {
    light: 'rgba(0, 0, 0, 0.42)',
    dark: 'rgba(255, 255, 255, 0.7)',
  };

  return {
    underline: {
      width: '100%',
      height: 1,
      position: 'relative',
      backgroundColor: bgColor[theme.type],
      margin: '9px 0 8px',

      '&::after': {
        content: '""',
        position: 'absolute',
        top: -1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.primaryBase,
        transform: 'scaleX(0)',
        transformOrigin: 'center center',
        transitionDuration: 140,
        transitionProperty: 'transform, background-color',
      },
    },

    underlineActive: { '&::after': { transform: 'scaleX(1)' } },

    withError: { '&::after': { backgroundColor: theme.errorColor } },

    underlineDisabled: { backgroundColor: theme.disabledColor },
  };
};

export default injectSheet(Underline.styles)(Underline);
