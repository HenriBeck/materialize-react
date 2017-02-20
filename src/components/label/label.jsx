import React, { PropTypes } from 'react';

import Stylesheet from 'styles/stylesheet';
import omit from 'utils/object/omit';

export default function Label({
  children,
  style,
  className,
  ...otherProps
}, { theme }) {
  const compiledStyle = Stylesheet.compile({
    typo: theme.label.typo,
    userSelect: 'none',
    padding: '0 8px',
    color: 'var(textColor)',
    ...style,
  }, { variables: theme.variables });

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
};

Label.defaultProps = {
  style: {},
  className: '',
};

Label.contextTypes = { theme: PropTypes.object };
