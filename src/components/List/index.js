// @flow strict

import React, { type Node } from 'react';

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

function List({
  children,
  className,
  ...props
}: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <ul
          className={`${classes.list} ${className}`}
          {...props}
        >
          {children}
        </ul>
      )}
    </Sheet>
  );
}

List.defaultProps = { className: '' };

List.Subheader = Subheader;
List.Divider = Divider;
List.Item = Item;

export default List;
