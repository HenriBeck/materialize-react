// @flow strict

import React, { type Node } from 'react';

import Sheet, { type Data } from './Sheet';

type Props = {
  children: Node,
  color: 'primary' | 'default',
  tall: boolean,
  className: string,
};

function AppBar({
  children,
  color,
  tall,
  className,
  ...props
}: Props) {
  const data: Data = {
    color,
    tall,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <div
          className={`${classes.appBar} ${className}`}
          {...props}
        >
          {children}
        </div>
      )}
    </Sheet>
  );
}

AppBar.defaultProps = {
  color: 'default',
  className: '',
  tall: false,
};

export default AppBar;
