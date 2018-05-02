// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('DialogContent', {
  content: {
    padding: 24,
    paddingTop: 0,
    width: '100%',
    boxSizing: 'border-box',
  },
});

function Content({
  children,
  className,
  ...props
}: Props): Node {
  return (
    <Sheet>
      {({ classes }) => (
        <main
          className={`${classes.content} ${className}`}
          {...props}
        >
          {children}
        </main>
      )}
    </Sheet>
  );
}

Content.defaultProps = { className: '' };

export default Content;
