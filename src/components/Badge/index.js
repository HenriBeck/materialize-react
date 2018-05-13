// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  content: Node,
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
          className={`${classes.container} ${props.className}`}
          {...getNotDeclaredProps(props, Badge)}
        >
          {props.children}

          <span className={classes.badge}>
            {props.content}
          </span>
        </span>
      )}
    </Sheet>
  );
}

Badge.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'accent']),
};

Badge.defaultProps = {
  className: '',
  color: 'primary',
};

export default Badge;
