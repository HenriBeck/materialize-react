// @flow strict

import React, { type Node } from 'react';

import Sheet from './Sheet';

type Props = {
  children: Node,
  color: 'primary' | 'default',
  className: string,
};

function StatusBar({
  color,
  children,
  className,
  ...props
}: Props) {
  return (
    <Sheet data={{ color }}>
      {({ classes }) => (
        <div
          className={`${classes.statusBar} ${className}`}
          {...props}
        >
          {children}
        </div>
      )}
    </Sheet>
  );
}

StatusBar.defaultProps = {
  color: 'default',
  className: '',
};

export default StatusBar;
