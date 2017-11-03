import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which adds the appropriate styles for a button row inside a dialog.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {String} props.className - Additional className.
 * @param {JSX} props.children - The buttons for the row.
 * @returns {JSX} - Returns the jsx.
 */
function DialogButtons({
  classes,
  className,
  children,
  ...props
}) {
  return (
    <div
      className={`${classes.buttons} ${className}`}
      {...getNotDeclaredProps(props, DialogButtons)}
    >
      {children}
    </div>
  );
}

DialogButtons.propTypes = {
  classes: PropTypes.shape({ buttons: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogButtons.defaultProps = { className: '' };

DialogButtons.styles = {
  buttons: {
    composes: 'dialog--buttons',
    padding: 8,
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};

export default injectSheet(DialogButtons.styles)(DialogButtons);
