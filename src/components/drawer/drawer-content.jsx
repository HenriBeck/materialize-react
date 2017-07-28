import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component to place the children into the drawer area of the drawer.
 *
 * @param {Object} props - The props for the component.
 * @param {JSX} props.children - The children which will be rendered inside.
 * @returns {JSX} - Returns the wrapped children.
 */
export default function DrawerContent({
  children,
  ...props
}) {
  return (
    <aside {...props}>
      {children}
    </aside>
  );
}

DrawerContent.propTypes = { children: PropTypes.node.isRequired };
