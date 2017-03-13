import React, { PropTypes } from 'react';

import Stylesheet from 'styles/stylesheet';
import omit from 'object.omit';

export default function Label({
  children,
  style,
  className,
  disabled,
  ...otherProps
}, { theme }) {
  const compiledStyle = Stylesheet.compile({
    typo: theme.label.typo,
    userSelect: 'none',
    padding: '0 8px',
    color: disabled ? theme.label.disabledColor : theme.label.color,
    ...style,
  });

  return (
    <label
      htmlFor={otherProps.for}
      className={`label ${className}`}
      style={compiledStyle}
      {...omit(otherProps, 'for')}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  for: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Label.defaultProps = {
  style: {},
  className: '',
  disabled: false,
};

Label.contextTypes = { theme: PropTypes.object };
