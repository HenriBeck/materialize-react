import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';
import Modal from './dialog';
import ModalHeader from './dialog-header';
import ModalContent from './dialog-content';
import ModalButtons from './dialog-buttons';

/**
 * A component to render a dialog.
 *
 * @class
 */
export default class DialogContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    hasBackdrop: PropTypes.bool,
    closeOnBackdropClick: PropTypes.bool,
  };

  static defaultProps = {
    hasBackdrop: false,
    closeOnBackdropClick: false,
  };

  static ModalHeader = ModalHeader;
  static ModalContent = ModalContent;
  static ModalButtons = ModalButtons;

  state = { opened: false };

  /**
   * Open the dialog.
   */
  open() {
    this.setState({ opened: true });
  }

  /**
   * Close the dialog.
   */
  close() {
    this.setState({ opened: false });
  }

  /**
   * Close the dialog when the user clicks on the backdrop.
   */
  onBackdropClick() {
    this.close();
  }

  render() {
    const {
      hasBackdrop,
      closeOnBackdropClick,
      children,
      ...props
    } = this.props;

    return (
      <Modal
        {...getNotDeclaredProps(props, DialogContainer)}
        hasBackdrop={hasBackdrop}
        closeOnBackdropClick={closeOnBackdropClick}
      >
        {children}
      </Modal>
    );
  }
}
