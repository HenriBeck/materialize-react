import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { position } from 'polished';

import EventHandler from '../event-handler';

/**
 * The markup for the ModalContainer.
 *
 * @param {Object} props - Props for the component.
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {Boolean} props.hasBackdrop - Whether or not the modal should have a backdrop.
 * @param {Boolean} props.closeOnBackdropClick - Whether or not the modal should be clicked
 * when the user clicks outside of the modal.
 * @param {Function} props.onBackdropPress - The callback when the user clicks outside of the modal.
 * @param {JSX} props.children - The content for the modal.
 * @returns {JSX} - Returns the JSX.
 */
export function Modal({
  classes,
  hasBackdrop,
  closeOnBackdropClick,
  onBackdropPress,
  children,
}) {
  let backdrop = null;

  if (hasBackdrop) {
    backdrop = closeOnBackdropClick ? (
      <EventHandler
        component="span"
        className={classes.backdrop}
        onPress={onBackdropPress}
      />
    ) : (
      <span className={classes.backdrop} />
    );
  }

  return (
    <div className={classes.modal}>
      {children}

      {backdrop}
    </div>
  );
}

Modal.propTypes = {
  classes: PropTypes.shape({
    modal: PropTypes.string.isRequired,
    backdrop: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  hasBackdrop: PropTypes.bool.isRequired,
  closeOnBackdropClick: PropTypes.bool.isRequired,
  onBackdropPress: PropTypes.func.isRequired,
};

Modal.styles = ({ modal: theme }) => {
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
