/* eslint-disable require-jsdoc */

import React, { PropTypes } from 'react';

export default function Divider({
  style,
  ...props
}, { theme }) {
  return (
    <div
      style={{
        height: theme.divider.height,
        backgroundColor: theme.divider.backgroundColor,
        ...style,
      }}
      {...props}
    />
  );
}

Divider.propTypes = { style: PropTypes.object };

Divider.defaultProps = { style: {} };

Divider.contextTypes = { theme: PropTypes.object };
