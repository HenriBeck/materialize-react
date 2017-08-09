import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { position } from 'polished';

/**
 * The markup for the ModalContainer.
 *
 * @param {Object} props - Props for the component.
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {JSX} props.children - The content for the dialog.
 * @returns {JSX} - Returns the JSX.
 */
export function Modal({
  classes,
  children,
}) {
  return (
    <div className={classes.modal}>
      {children}
    </div>
  );
}

Modal.propTypes = {
  classes: PropTypes.shape({
    modal: PropTypes.string.isRequired,
    backdrop: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

Modal.styles = ({ dialog: theme }) => {
  return {
    modal: {
      position: 'relative',

      '&[aria-opened=true] $backdrop': { opacity: 1 },
    },

    backdrop: {
      ...position('absolute', -1000),
      backgroundColor: theme.backdropColor,
      opacity: 0,
      transition: `opacity ${theme.transitionDuration}`,

    },
  };
};

export default injectSheet(Modal.styles)(Modal);
