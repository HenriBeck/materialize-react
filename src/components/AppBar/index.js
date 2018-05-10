// @flow strict

import React, { type Node } from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  children: Node,
  color: 'primary' | 'default',
  tall: boolean,
  className: string,
};

function AppBar(props: Props) {
  const data: Data = {
    color: props.color,
    tall: props.tall,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <div
          className={`${classes.appBar} ${props.className}`}
          {...getNotDeclaredProps(props, AppBar)}
        >
          {props.children}
        </div>
      )}
    </Sheet>
  );
}

AppBar.propTypes = {};

AppBar.defaultProps = {
  color: 'default',
  className: '',
  tall: false,
};

export default AppBar;
