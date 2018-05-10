// @flow strict

import React, { type Node } from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  children: Node,
  color: 'primary' | 'accent',
  className: string,
};

function Badge(props: Props) {
  const data: Data = { color: props.color };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <span
          className={`${classes.badge} ${props.className}`}
          {...getNotDeclaredProps(props, Badge)}
        >
          {props.children}
        </span>
      )}
    </Sheet>
  );
}

Badge.propTypes = {};

Badge.defaultProps = {
  className: '',
  color: 'primary',
};

export default Badge;
