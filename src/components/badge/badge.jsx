import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which renders a little badge in the top right corner.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Badge(props) {
  return (
    <span
      className={`${props.classes.badge} ${props.className}`}
      {...getNotDeclaredProps(props, Badge)}
    >
      {props.children}
    </span>
  );
}

Badge.propTypes = {
  classes: PropTypes.shape({ badge: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Badge.defaultProps = { className: '' };

Badge.styles = (theme) => {
  return {
    badge: {
      composes: 'badge',
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 20,
      height: 20,
      top: -10,
      right: -10,
      borderRadius: '50%',
      lineHeight: 1,
      backgroundColor: theme.primaryBase,
      color: theme.textColor,
      fontSize: 11,
    },
  };
};

export default injectSheet(Badge.styles)(Badge);
