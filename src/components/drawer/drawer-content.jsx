import React, { PropTypes } from 'react';

export default function DrawerContent({
  children,
  ...props
}) {
  return (
    <div {...props}>
      {children}
    </div>
  );
}

DrawerContent.propTypes = { children: PropTypes.node.isRequired };
