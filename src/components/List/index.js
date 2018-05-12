// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';

import Subheader from './Subheader';
import Divider from './Divider';
import Item from './Item';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('List', {
  list: {
    margin: 0,
    padding: '8px 0',
    listStyleType: 'none',
  },
});

function List(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <ul
          className={`${classes.list} ${props.className}`}
          {...getNotDeclaredProps(props, List)}
        >
          {props.children}
        </ul>
      )}
    </Sheet>
  );
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

List.defaultProps = { className: '' };

List.Subheader = Subheader;
List.Divider = Divider;
List.Item = Item;

export default List;
