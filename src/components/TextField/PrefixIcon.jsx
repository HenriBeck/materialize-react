// @flow strict

import React, {
  type Element,
  type ElementType,
} from 'react';

import createSheet from '../../styles/create-sheet';
import { cloneElement } from '../../utils/react';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';

type Props = {
  isFocused: boolean,
  withFloatingLabel: boolean,
  color: 'primary' | 'accent',
  hasError: boolean,
  disabled: boolean,
  children: Element<ElementType>,
};
type Data = {
  isFocused: boolean,
  withFloatingLabel: boolean,
  color: 'primary' | 'accent',
  hasError: boolean,
};

const Sheet = createSheet('TextField-PrefixIcon', (theme: Theme) => {
  return {
    prefixIcon: {
      width: 24,
      height: 24,
      marginTop: (data: Data) => (data.withFloatingLabel ? 32 : 4),
      color(data: Data) {
        if (data.hasError) {
          return theme.error;
        }

        return data.isFocused ? getActiveColor(theme, data.color) : false;
      },
    },
  };
});

function PrefixIcon(props: Props) {
  const data: Data = {
    isFocused: props.isFocused,
    withFloatingLabel: props.withFloatingLabel,
    color: props.color,
    hasError: props.hasError,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => cloneElement(props.children, {
        disabled: props.disabled,
        className: classes.prefixIcon,
      })}
    </Sheet>
  );
}

export default PrefixIcon;
