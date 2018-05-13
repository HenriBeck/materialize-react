// @flow strict

import React from 'react';

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';

type Props = {
  color: 'primary' | 'accent',
  disabled: boolean,
  hasError: boolean,
  isFocused: boolean,
};
type Data = {
  color: 'primary' | 'accent',
  disabled: boolean,
  hasError: boolean,
  active: boolean,
};

const Sheet = createSheet('TextField-Underline', (theme: Theme) => {
  return {
    underline: {
      width: '100%',
      height: 1,
      position: 'relative',
      margin: '8px 0 9px',
      backgroundColor: (data: Data) => (data.disabled ? theme.disabled : theme.text.secondary),

      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: -1,
        transformOrigin: 'center center',
        transitionDuration: 200,
        transitionProperty: 'transform',
        transform: (data: Data) => `scaleX(${data.active ? 1 : 0})`,
        backgroundColor(data: Data) {
          if (data.disabled) {
            return theme.disabled;
          } else if (data.hasError) {
            return theme.error;
          }

          return getActiveColor(theme, data.color);
        },
      },
    },
  };
});

function Underline(props: Props) {
  const data: Data = {
    disabled: props.disabled,
    hasError: props.hasError,
    color: props.color,
    active: props.isFocused || props.hasError,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <span className={classes.underline} />
      )}
    </Sheet>
  );
}

export default Underline;
