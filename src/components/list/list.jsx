import React, { Children } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

import Subheader from './list-subheader';
import Divider from './list-divider';
import Item from './list-item';

const validListChildren = [
  Divider,
  Item,
];

/**
 * The main list component.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes for the component provided by Jss.
 * @param {JSX} props.children - The children for the list.
 * @param {Boolean} props.inset - Whether or not the list items should be inset.
 * @param {String} props.className - An additional class name for the list.
 * @returns {JSX} - Returns the JSX.
 */
function List({
  classes,
  children,
  inset,
  className,
  ...props
}) {
  const clonedChildren = Children.map(children, (child) => {
    if (validListChildren.includes(child.type)) {
      return React.cloneElement(child, { inset });
    }

    return child;
  });

  return (
    <ul
      className={`${classes.list} ${className}`}
      {...getNotDeclaredProps(props, List)}
    >
      {clonedChildren}
    </ul>
  );
}

List.propTypes = {
  classes: PropTypes.shape({ list: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  inset: PropTypes.bool,
  className: PropTypes.string,
};

List.defaultProps = {
  inset: false,
  className: '',
};

List.styles = {
  list: {
    composes: 'list',
    margin: 0,
    padding: '8px 0',
    listStyleType: 'none',
  },
};

List.Subheader = Subheader;
List.Divider = Divider;
List.Item = Item;

export default injectSheet(List.styles)(List);
