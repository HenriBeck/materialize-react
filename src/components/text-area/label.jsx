import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

/**
 * The label for the textarea component.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Label(props) {
  return (
    <label
      htmlFor={props.id}
      className={classnames(props.classes.label, {
        [props.classes.focused]: props.isFocused,
        [props.classes.withError]: props.hasError,
        [props.classes.expanded]: !props.isFocused && !props.hasValue,
        [props.classes.disabled]: props.disabled,
      })}
    >
      {props.children}
    </label>
  );
}

Label.propTypes = {
  classes: PropTypes.shape({
    label: PropTypes.string.isRequired,
    withError: PropTypes.string.isRequired,
    focused: PropTypes.string.isRequired,
    expanded: PropTypes.string.isRequired,
    disabled: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  hasValue: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

Label.styles = (theme) => {
  return {
    label: {
      lineHeight: 1,
      fontSize: 12,
      padding: '4px 0',
      transformOrigin: 'left center',
      color: theme.secondaryTextColor,
      transition: 'transform 140ms',
      transform: 'scale(1) translateY(0px)',
    },

    focused: { color: theme.primaryBase },

    withError: { color: theme.errorColor },

    disabled: { color: theme.disabledColor },

    expanded: { transform: 'scale(1.25) translateY(4px)' },
  };
};

export default injectSheet(Label.styles)(Label);
