import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

/**
 * The label component for the TextField.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Label(props) {
  return (
    <label
      htmlFor={props.id}
      className={props.classes.label}
    >
      {props.children}
    </label>
  );
}

Label.styles = (theme) => {
  return {
    label: {
      position: 'absolute',
      transitionDuration: 140,
      transitionProperty(props) {
        if (props.isFloating) {
          return 'opacity, transform, color';
        }

        return 'opacity, color';
      },
      zIndex: 5,
      left: 0,
      right: 0,
      lineHeight: 1,

      top(props) {
        return props.isFloating ? 16 : 0;
      },

      fontSize(props) {
        return (props.hasValue || props.isFocused) && props.isFloating ? 12 : 16;
      },

      opacity(props) {
        return props.hasValue && !props.isFloating ? 0 : 1;
      },

      transform(props) {
        if ((props.hasValue || props.isFocused) && props.isFloating) {
          return 'translateY(0)';
        }

        return `translate(${props.translateX}px, ${props.isFloating ? 20 : 16}px)`;
      },

      color(props) {
        if (props.disabled) {
          return theme.type === 'light'
            ? 'rgba(0, 0, 0, 0.38)'
            : 'rgba(255, 255, 255, 0.5)';
        }

        if (props.hasError) {
          return theme.errorColor;
        }

        return props.isFocused ? theme.primaryBase : theme.secondaryTextColor;
      },
    },
  };
};

Label.propTypes = {
  classes: PropTypes.shape({ label: PropTypes.string.isRequired }).isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default injectSheet(Label.styles)(Label);
