import React, { PropTypes } from 'react';

export default function Divider({
  style,
  className,
  ...props
}, { theme }) {
  return (
    <div
      className={`divider ${className}`}
      style={{
        height: theme.divider.height,
        backgroundColor: theme.divider.backgroundColor,
        ...style,
      }}
      {...props}
    />
  );
}

Divider.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

Divider.defaultProps = {
  style: {},
  className: '',
};

Divider.contextTypes = { theme: PropTypes.object };
