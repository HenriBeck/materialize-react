// @flow strict

import React, { type Node } from 'react';

import Sheet from './Sheet';

type Props = {
  children: Node,
  className: string,
};

function Background({
  className,
  children,
  ...props
}: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div
          className={`${classes.background} ${className}`}
          {...props}
        >
          {children}
        </div>
      )}
    </Sheet>
  );
}

Background.defaultProps = { className: '' };

export default Background;
