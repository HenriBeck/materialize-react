// @flow strict

import React from 'react';

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/schema';

type Props = {
  vertical: boolean,
  className: string,
};
type Data = { vertical: boolean };

const Sheet = createSheet('Divider', (theme: Theme) => {
  return {
    divider: {
      backgroundColor: theme.divider,
      height: (data: Data) => (data.vertical ? '100%' : 1),
      width: (data: Data) => (data.vertical ? 1 : '100%'),
    },
  };
});

function Divider({
  vertical,
  className,
  ...props
}: Props) {
  const data: Data = { vertical };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <div
          {...props}
          className={`${classes.divider} ${className}`}
        />
      )}
    </Sheet>
  );
}

Divider.defaultProps = {
  className: '',
  vertical: false,
};

export default Divider;
