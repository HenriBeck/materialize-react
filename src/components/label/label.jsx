import React, { PropTypes } from 'react';

import Stylesheet from 'styles/stylesheet';
import omit from 'utils/object/omit';

export default function Label({
  children,
  style,
  ...otherProps
}, { theme }) {
  const compiledStyle = Stylesheet.compile({
    typo: theme.label.typo,
    userSelect: 'none',
    padding: '0 8px',
    ...style,
  });

  return (
    <label
      htmlFor={otherProps.for}
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
};

Label.defaultProps = { style: {} };

Label.contextTypes = { theme: PropTypes.object };
