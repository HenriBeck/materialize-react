// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';
import Typography from '../Typography';

type Props = {
  children: Node,
  inset: boolean,
  className: string,
};
type Data = { inset: boolean };

const Sheet = createSheet('Subheader', {
  subheader: {
    position: 'relative',
    padding: 16,
    height: 48,
    boxSizing: 'border-box',
    width: '100%',
    lineHeight: '16px',
    paddingLeft(data: Data): number | null {
      return data.inset ? 72 : null;
    },
  },
});

function Subheader({
  children,
  inset,
  className,
  ...props
}: Props) {
  const data: Data = { inset };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <Typography
          {...props}
          element="li"
          color="secondary"
          typography="body"
          className={`${classes.subheader} ${className}`}
        >
          {children}
        </Typography>
      )}
    </Sheet>
  );
}

Subheader.defaultProps = {
  inset: false,
  className: '',
};

export default Subheader;
