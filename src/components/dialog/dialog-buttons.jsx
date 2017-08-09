import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

/**
 * A component which adds the appropriate styles for a button row inside a dialog.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {String} props.className - Additional className.
 * @param {JSX} props.children - The buttons for the row.
 * @returns {JSX} - Returns the jsx.
 */
export function ModalButtons({
  classes,
  className,
  children,
  ...props
}) {
  return (
    <div
      className={`${classes.buttons} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

ModalButtons.propTypes = {
  classes: PropTypes.shape({ content: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalButtons.defaultProps = { className: '' };

ModalButtons.styles = {
  buttons: {
    composes: 'dialog--buttons',
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};

export default injectSheet(ModalButtons.styles)(ModalButtons);
