// @flow strict

import React, { type Node } from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet from './Sheet';

type Props = {
  children: Node,
  className: string,
};

function Background(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div
          className={`${classes.background} ${props.className}`}
          {...getNotDeclaredProps(props, Background)}
        >
          {props.children}
        </div>
      )}
    </Sheet>
  );
}

Background.propTypes = {};

Background.defaultProps = { className: '' };

export default Background;
