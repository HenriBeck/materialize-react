import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { commonBase } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * Render a subheader for a list.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes for the component provided by Jss.
 * @param {JSX} props.children - The content for the subheader.
 * @param {Boolean} props.inset - Whether or not the subheader should have an inset.
 * This will not be added by the list component
 * because subheaders do not always need to have an inset.
 * @param {String} props.className - An additional class name for the subheader.
 * @returns {JSX} - Returns the JSX.
 */
export function ListSubheader({
  classes,
  children,
  inset,
  className,
  ...props
}) {
  return (
    <li
      className={`${classes.subheader} ${inset ? classes.inset : ''} ${className}`}
      {...getNotDeclaredProps(props, ListSubheader)}
    >
      {children}
    </li>
  );
}

ListSubheader.propTypes = {
  classes: PropTypes.shape({ subheader: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  inset: PropTypes.bool,
  className: PropTypes.string,
};

ListSubheader.defaultProps = {
  inset: false,
  className: '',
};

ListSubheader.styles = ({ list: theme }) => {
  return {
    subheader: {
      composes: 'list--subheader',
      ...commonBase,
      height: theme.item.minHeight,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: theme.item.horizontalPadding,
      paddingRight: theme.item.horizontalPadding,
      paddingTop: theme.item.oneLineVerticalPadding,
      paddingBottom: theme.item.oneLineVerticalPadding,
      color: theme.subheader.color,
      fontSize: theme.subheader.fontSize,
      lineHeight: '16px',
    },

    inset: {
      composes: 'list--subheader-inset',
      paddingLeft: theme.insetWidth,
    },
  };
};

export default injectSheet(ListSubheader.styles)(ListSubheader);
