import React, { PropTypes } from 'react';

function Background({
  style,
  children,
  ...props
}, { theme }) {
  return (
    <div
      style={{
        color: theme.variables.textColor,
        backgroundColor: theme.variables.backgroundColor,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

Background.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Background.defaultProps = { style: {} };

Background.contextTypes = { theme: PropTypes.object };

export default Background;
