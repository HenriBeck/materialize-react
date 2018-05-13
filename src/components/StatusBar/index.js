// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  children: Node,
  color: 'primary' | 'default',
  className: string,
};

function StatusBar(props: Props) {
  const data: Data = { color: props.color };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <div
          className={`${classes.statusBar} ${props.className}`}
          {...getNotDeclaredProps(props, StatusBar)}
        >
          {props.children}
        </div>
      )}
    </Sheet>
  );
}

StatusBar.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'default',
  ]),
  className: PropTypes.string,
};

StatusBar.defaultProps = {
  color: 'default',
  className: '',
};

export default StatusBar;
