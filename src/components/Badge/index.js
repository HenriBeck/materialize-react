// @flow strict

import React, { type Node } from 'react';

import Sheet, { type Data } from './Sheet';

type Props = {
  children: Node,
  color: 'primary' | 'accent',
  className: string,
};

function Badge({
  children,
  color,
  className,
  ...props
}: Props) {
  const data: Data = { color };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <span
          className={`${classes.badge} ${className}`}
          {...props}
        >
          {children}
        </span>
      )}
    </Sheet>
  );
}

Badge.defaultProps = {
  className: '',
  color: 'primary',
};

export default Badge;
