import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

/**
 * A component which adds the appropriate styles for the content inside a dialog.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {String} props.className - Additional className.
 * @param {JSX} props.children - The actual content for the dialog.
 * @returns {JSX} - Returns the jsx.
 */
export function ModalContent({
  classes,
  className,
  children,
  ...props
}) {
  return (
    <main
      className={`${classes.content} ${className}`}
      {...props}
    >
      {children}
    </main>
  );
}

ModalContent.propTypes = {
  classes: PropTypes.shape({ content: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalContent.defaultProps = { className: '' };

ModalContent.styles = ({ dialog: theme }) => {
  return {
    content: {
      composes: 'dialog--content',
      padding: theme.padding,
    },
  };
};

export default injectSheet(ModalContent.styles)(ModalContent);
