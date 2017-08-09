import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

/**
 * A component which adds the appropriate styles for the header of a dialog.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {String} props.className - Additional className.
 * @param {JSX} props.children - The content for the header.
 * @returns {JSX} - Returns the jsx.
 */
export function ModalHeader({
  classes,
  className,
  children,
  ...props
}) {
  return (
    <header
      className={`${classes.header} ${className}`}
      {...props}
    >
      {children}
    </header>
  );
}

ModalHeader.propTypes = {
  classes: PropTypes.shape({ content: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalHeader.defaultProps = { className: '' };

ModalHeader.styles = {
  header: {
    composes: 'dialog--header',
    marginBottom: 20,
  },
};

export default injectSheet(ModalHeader.styles)(ModalHeader);
