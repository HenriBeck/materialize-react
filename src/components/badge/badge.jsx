import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which renders a little badge in the top right corner.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The class names for the styles provided by Jss.
 * @param {JSX} props.children - The children for the component.
 * This will not be rendered inside the badge.
 * @param {String} props.className - An additional className for the root component.
 * @param {JSX} props.badgeContent - The content for the badge.
 * @returns {JSX} - Returns the JSX.
 */
export function Badge({
  classes,
  children,
  className,
  badgeContent,
  ...props
}) {
  return (
    <div
      className={`${classes.root} ${className}`}
      {...getNotDeclaredProps(props, Badge)}
    >
      {children}

      <span className={classes.badge}>
        {badgeContent}
      </span>
    </div>
  );
}

Badge.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  badgeContent: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Badge.defaultProps = { className: '' };

Badge.styles = ({ badge: theme }) => {
  return {
    root: {
      display: 'inline',
      position: 'relative',

      '& > *:not(.badge)': { display: 'inline-block' },
    },

    badge: {
      composes: 'badge',
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'no-wrap',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: theme.size,
      height: theme.size,
      top: theme.size / -2,
      right: theme.size / -2,
      borderRadius: '50%',
      lineHeight: 1,
      backgroundColor: theme.backgroundColor,
      color: theme.color,
      fontSize: 11,
    },
  };
};

export default injectSheet(Badge.styles)(Badge);
