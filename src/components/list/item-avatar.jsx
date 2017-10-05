import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which renders an avatar in a list item.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes for the component provided by Jss.
 * @param {JSX} props.children - The content for the avatar.
 * @param {String} props.className - An additional class name for the root component.
 * @returns {JSX} - Returns the JSX.
 */
export function ListItemAvatar({
  classes,
  children,
  className,
  ...props
}) {
  return (
    <div
      className={`${classes.avatar} ${className}`}
      {...getNotDeclaredProps(props, ListItemAvatar)}
    >
      {children}
    </div>
  );
}

ListItemAvatar.propTypes = {
  classes: PropTypes.shape({ avatar: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ListItemAvatar.defaultProps = { className: '' };

ListItemAvatar.styles = {
  avatar: {
    composes: 'list--item-avatar',
    minWidth: 40,
    minHeight: 40,
    paddingTop: 8,
    paddingBottom: 8,
    position: 'relative',
    borderRadius: '50%',

    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
};

export default injectSheet(ListItemAvatar.styles)(ListItemAvatar);
