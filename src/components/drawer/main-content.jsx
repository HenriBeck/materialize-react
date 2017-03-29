import React, { PropTypes } from 'react';

export default function MainContent({
  children,
  ...props
}) {
  return (
    <div {...props}>
      {children}
    </div>
  );
}

MainContent.propTypes = { children: PropTypes.node.isRequired };
