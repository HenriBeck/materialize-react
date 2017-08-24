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
export function DialogButtons({
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

DialogButtons.propTypes = {
  classes: PropTypes.shape({ buttons: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogButtons.defaultProps = { className: '' };

DialogButtons.styles = ({ dialog: theme }) => {
  return {
    buttons: {
      composes: 'dialog--buttons',
      padding: theme.buttonPadding,
      width: '100%',
      boxSizing: 'border-box',
      paddingLeft: theme.padding,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  };
};
export default injectSheet(DialogButtons.styles)(DialogButtons);
