// @flow strict

import React, { type Node } from 'react';

import Typography from '../Typography';
import createSheet from '../../styles/create-sheet';

type Props = {
  error: Node,
  children: Node,
};

const Sheet = createSheet('TextArea-HelperText', {
  helperText: {
    fontSize: 12,
    lineHeight: 1,
    height: 12,
    padding: '0 6px',
  },
});

function HelperText(props: Props) {
  if (!props.error && !props.children) {
    return null;
  }

  return (
    <Sheet>
      {({ classes }) => (
        <Typography
          color={props.error ? 'error' : 'secondary'}
          typography="body"
          className={classes.helperText}
        >
          {props.error ? props.error : props.children}
        </Typography>
      )}
    </Sheet>
  );
}

export default HelperText;
