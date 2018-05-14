// @flow strict-local

import React, { type Node } from 'react';

import Typography from '../Typography';
import createSheet from '../../styles/create-sheet';

type Props = {
  isFloating: boolean,
  hasValue: boolean,
  isFocused: boolean,
  translateX: number,
  disabled: boolean,
  hasError: boolean,
  id: string,
  children: Node,
  color: 'primary' | 'accent',
};
type Data = {
  isFloating: boolean,
  hasValue: boolean,
  isFocused: boolean,
  isActive: boolean,
  translateX: number,
};

const Sheet = createSheet('TextField-Label', {
  label: {
    position: 'absolute',
    transitionDuration: 140,
    left: 0,
    right: 0,
    top: 0,
    lineHeight: 1,
    transitionProperty: (data: Data) => (data.isFloating ? 'transform' : 'opacity'),
    fontSize: (data: Data) => (data.isActive && data.isFloating ? 12 : 16),
    opacity: (data: Data) => (data.hasValue && !data.isFloating ? 0 : 1),
    transform(data: Data) {
      const translateX = data.isActive && data.isFloating ? 0 : data.translateX;
      const floatingTranslate = data.hasValue || data.isFocused ? 16 : 36;
      const translateY = data.isFloating ? floatingTranslate : 8;

      return `translate(${translateX}px, ${translateY}px)`;
    },
  },
});

function getColor(props) {
  if (props.disabled) {
    return 'disabled';
  } else if (props.hasError) {
    return 'error';
  } else if (props.isFocused) {
    return props.color;
  }

  return 'secondary';
}

function Label(props: Props) {
  const data: Data = {
    isActive: props.hasValue || props.isFocused,
    isFloating: props.isFloating,
    hasValue: props.hasValue,
    isFocused: props.isFocused,
    translateX: props.translateX,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <Typography
          element="label"
          typography="body"
          color={getColor({
            disabled: props.disabled,
            hasError: props.hasError,
            isFocused: props.isFocused,
            color: props.color,
          })}
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
