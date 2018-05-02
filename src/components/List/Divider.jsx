// @flow strict

import React from 'react';

// eslint-disable-next-line import/no-named-default
import { default as DividerComponent } from '../Divider';
import createSheet from '../../styles/create-sheet';

type Props = {
  inset: boolean,
  className: string,
};

const Sheet = createSheet('Divider', { divider: { paddingLeft: 72 } });

function Divider({
  inset,
  className,
  ...props
}: Props) {
  if (!inset) {
    return (
      <DividerComponent />
    );
  }

  return (
    <Sheet>
      {({ classes }) => (
        <li
          className={`${classes.divider} ${className}`}
          {...props}
        >
          <DividerComponent />
        </li>
      )}
    </Sheet>
  );
}

Divider.defaultProps = {
  inset: false,
  className: '',
};

export default Divider;
