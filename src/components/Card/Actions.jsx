// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
  stacked: boolean,
};
type Data = { stacked: boolean };

const Sheet = createSheet('Actions', {
  actions: {
    gridGap: '0 4px',
    padding: '8px 0',
    display: (data: Data) => (data.stacked ? 'grid' : 'flex'),
    gridTemplateColumns: (data: Data) => (data.stacked ? 'min-content' : null),
  },
});

function Actions({
  children,
  className,
  stacked,
  ...props
}: Props) {
  return (
    <Sheet data={{ stacked }}>
      {({ classes }) => (
        <div
          className={`${classes.actions} ${className}`}
          {...props}
        >
          {children}
        </div>
      )}
    </Sheet>
  );
}

Actions.defaultProps = {
  stacked: false,
  className: '',
};

export default Actions;
