// @flow strict

import React from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

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

function Divider(props: Props) {
  const data: Data = { vertical: props.vertical };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <div
          className={`${classes.divider} ${props.className}`}
          {...getNotDeclaredProps(props, Divider)}
        />
      )}
    </Sheet>
  );
}

Divider.propTypes = {};

Divider.defaultProps = {
  className: '',
  vertical: false,
};

export default Divider;
