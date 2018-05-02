// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('DialogActions', {
  actions: {
    padding: 8,
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

function Actions({
  children,
  className,
  ...props
}: Props) {
  return (
    <Sheet>
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

Actions.defaultProps = { className: '' };

export default Actions;
