import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * The prefix for the textfield component.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Prefix(props) {
  return (
    <span
      className={classnames(
        props.classes.prefix,
        { [props.classes.disabled]: props.disabled },
      )}
      ref={props.createRef}
    >
      {props.children}
    </span>
  );
}

Prefix.propTypes = {
  classes: PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    disabled: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  createRef: PropTypes.func.isRequired,
};

Prefix.styles = (theme) => {
  return {
    prefix: {
      height: 16,
      fontSize: 16,
      lineHeight: 1,
      boxSizing: 'border-box',
      color: theme.secondaryTextColor,
    },

    disabled: { color: theme.disabledColor },
  };
};

export default injectSheet(Prefix.styles)(Prefix);
