import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component to place the children into the main area of the drawer.
 *
 * @param {Object} props - The props for the component.
 * @param {JSX} props.children - The children which will be rendered inside.
 * @returns {JSX} - Returns the wrapped children.
 */
function MainContent({
  children,
  ...props
}) {
  return (
    <main {...props}>
      {children}
    </main>
  );
}

MainContent.propTypes = { children: PropTypes.node.isRequired };

export default MainContent;

