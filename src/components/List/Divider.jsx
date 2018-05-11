// @flow strict

import React from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

// eslint-disable-next-line import/no-named-default
import { default as DividerComponent } from '../Divider';
import createSheet from '../../styles/create-sheet';

type Props = {
  inset: boolean,
  className: string,
};

const Sheet = createSheet('Divider', { divider: { paddingLeft: 72 } });

function Divider(props: Props) {
  if (!props.inset) {
    return (
      <DividerComponent />
    );
  }

  return (
    <Sheet>
      {({ classes }) => (
        <li
          className={`${classes.divider} ${props.className}`}
          {...getNotDeclaredProps(props, Divider)}
        >
          <DividerComponent />
        </li>
      )}
    </Sheet>
  );
}

Divider.propTypes = {};

Divider.defaultProps = {
  inset: false,
  className: '',
};

export default Divider;
