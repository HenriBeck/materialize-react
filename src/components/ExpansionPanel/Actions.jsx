// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('ExpansionPanelActions', (theme: Theme) => {
  return {
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '16px 8px',

      '&::before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        backgroundColor: theme.divider,
      },
    },
  };
});

function Actions({
  className,
  children,
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
