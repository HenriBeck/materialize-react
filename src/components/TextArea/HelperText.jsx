// @flow strict

import React, { type Node } from 'react';

import Typography from '../Typography';
import createSheet from '../../styles/create-sheet';

type Props = {
  error: Node,
  children: Node,
};

const Sheet = createSheet('HelperText', {
  helperText: {
    fontSize: 12,
    lineHeight: 1,
    height: 12,
    padding: '0 6px',
  },
});

function HelperText({
  error,
  children,
}: Props) {
  if (!error && !children) {
    return null;
  }

  return (
    <Sheet>
      {({ classes }) => (
        <Typography
          color={error ? 'error' : 'secondary'}
          typography="body"
          className={classes.helperText}
        >
          {error ? error : children}
        </Typography>
      )}
    </Sheet>
  );
}

export default HelperText;
