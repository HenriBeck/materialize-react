import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import { commonBase } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';

import Avatar from './item-avatar';

/**
 * A component to render a list item.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes for the component provided by Jss.
 * @param {JSX} props.children - The children for the list item.
 * @param {JSX} props.leftItem - An optional left item for the list item.
 * This will only be rendered when the whole list is inset.
 * @param {JSX} props.rightItem - An optional right item.
 * @param {JSX} props.secondaryContent - An optional secondary text content for the list item.
 * @param {Boolean} props.inset - Whether or not the list item should be inset.
 * This will be applied by the parent list component.
 * @param {String} props.className - An additional class name for the list.
 * @returns {JSX} - Returns the JSX.
 */
export function Item({
  classes,
  children,
  leftItem,
  rightItem,
  secondaryContent,
  inset,
  className,
  ...props
}) {
  const contentClassName = classnames(
    classes.content,
    { [classes.withSecondaryContent]: secondaryContent },
  );

  return (
    <li
      className={`${classes.item} ${className}`}
      {...getNotDeclaredProps(props, Item)}
    >
      {inset && (
        <span className={classes.leftItem}>
          {leftItem}
        </span>
      )}

      <span className={contentClassName}>
        {children}

        {secondaryContent && (
          <span className={classes.secondaryContent}>
            {secondaryContent}
          </span>
        )}
      </span>

      {rightItem && (
        <span className={classes.rightItem}>
          {rightItem}
        </span>
      )}
    </li>
  );
}

Item.propTypes = {
  classes: PropTypes.shape({
    item: PropTypes.string.isRequired,
    withSecondaryContent: PropTypes.string.isRequired,
    leftItem: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    secondaryContent: PropTypes.string.isRequired,
    rightItem: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  inset: PropTypes.bool.isRequired,
  leftItem: PropTypes.node,
  rightItem: PropTypes.node,
  secondaryContent: PropTypes.node,
  className: PropTypes.string,
};

Item.defaultProps = {
  leftItem: null,
  rightItem: null,
  secondaryContent: null,
  className: '',
};

Item.Avatar = Avatar;

Item.styles = (theme) => {
  return {
    item: {
      composes: 'list--item',
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
    },

    leftItem: {
      composes: 'list--item-left-item',
      minWidth: 56,
      maxWidth: 56,
      paddingRight: 16,
      boxSizing: 'border-box',
    },

    content: {
      composes: 'list--item-content',
      display: 'flex',
      flexDirection: 'column',
      ...commonBase,
      flex: 1,
      fontSize: 16,
      lineHeight: '16px',
      paddingTop: 16,
      paddingBottom: 16,
    },

    withSecondaryContent: {
      composes: 'list--item-with-secondary-content',
      paddingTop: 20,
      paddingBottom: 20,
    },

    secondaryContent: {
      composes: 'list--item-secondary-content',
      color: theme.secondaryTextColor,
      fontSize: 14,
    },

    rightItem: {
      composes: 'list--item-right-item',
      paddingLeft: 16,
      maxWidth: 24,
      minWidth: 24,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
};

export default injectSheet(Item.styles)(Item);
