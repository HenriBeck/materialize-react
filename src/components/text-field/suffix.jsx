import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * The suffix for the textfield component.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Suffix(props) {
  return (
    <span
      className={classnames(
        props.classes.suffix,
        { [props.classes.disabled]: props.disabled },
      )}
    >
      {props.children}
    </span>
  );
}

Suffix.propTypes = {
  classes: PropTypes.shape({
    suffix: PropTypes.string.isRequired,
    disabled: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

Suffix.styles = (theme) => {
  return {
    suffix: {
      height: 16,
      fontSize: 16,
      lineHeight: 1,
      boxSizing: 'border-box',
      color: theme.secondaryTextColor,
    },

    disabled: { color: theme.disabledColor },
  };
};

export default injectSheet(Suffix.styles)(Suffix);
