// @flow strict

import React, { type Node } from 'react';

import Typography from '../Typography';
import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('DialogContent', {
  content: {
    padding: 24,
    paddingBottom: 20,
    width: '100%',
    boxSizing: 'border-box',
  },
});

function Header({
  className,
  children,
  ...props
}: Props): Node {
  return (
    <Sheet>
      {({ classes }) => (
        <Typography
          typography="title"
          element="header"
          className={`${classes.header} ${className}`}
          {...props}
        >
          {children}
        </Typography>
      )}
    </Sheet>
  );
}

Header.defaultProps = { className: '' };

export default Header;
