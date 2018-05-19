// @flow strict-local

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';
import Typography from '../Typography';

type Props = {
  disabled: boolean,
  hasError: boolean,
  isFocused: boolean,
  hasValue: boolean,
  id: string,
  children: Node,
  color: 'primary' | 'accent',
};
type Data = { expanded: boolean };

const Sheet = createSheet('TextArea-Label', {
  label: {
    lineHeight: 1,
    fontSize: 12,
    padding: '4px 0',
    transformOrigin: 'left center',
    transition: 'transform 140ms',
    transform: (data: Data) => (
      data.expanded
        ? 'scale(1.25) translateY(4px)'
        : 'scale(1) translateY(0)'
    ),
  },
});

function getColor({
  disabled,
  hasError,
  isFocused,
  color,
}) {
  if (disabled) {
    return 'disabled';
  } else if (hasError) {
    return 'error';
  } else if (isFocused) {
    return color;
  }

  return 'secondary';
}

function Label(props: Props): Node {
  const data: Data = { expanded: !props.isFocused && !props.hasValue };
  const color = getColor({
    color: props.color,
    disabled: props.disabled,
    hasError: props.hasError,
    isFocused: props.isFocused,
  });

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <Typography
          typography="body2"
          color={color}
          htmlFor={props.id}
          className={classes.label}
        >
          {props.children}
        </Typography>
      )}
    </Sheet>
  );
}

export default Label;
