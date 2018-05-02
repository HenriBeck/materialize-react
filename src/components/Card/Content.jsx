// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('Content', {
  content: {
    padding: '0 16px',
    margin: '16px 0',

    '&:last-child': { marginBottom: 24 },
  },
});

function Content({
  className,
  children,
  ...props
}: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div
          className={`${classes.content} ${className}`}
          {...props}
        >
          {children}
        </div>
      )}
    </Sheet>
  );
}

Content.defaultProps = { className: '' };

export default Content;
