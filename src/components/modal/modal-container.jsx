import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';
import Modal from './modal';

/**
 * A component to render a modal.
 *
 * @class
 */
export default class ModalContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    hasBackdrop: PropTypes.bool,
    closeOnBackdropClick: PropTypes.bool,
  };

  static defaultProps = {
    hasBackdrop: false,
    closeOnBackdropClick: false,
  };

  state = { opened: false };

  /**
   * Open the modal.
   */
  open() {
    this.setState({ opened: true });
  }

  /**
   * Close the modal.
   */
  close() {
    this.setState({ opened: false });
  }

  /**
   * Close the modal when the user clicks on the backdrop.
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
        {...getNotDeclaredProps(props, ModalContainer)}
        hasBackdrop={hasBackdrop}
        closeOnBackdropClick={closeOnBackdropClick}
      >
        {children}
      </Modal>
    );
  }
}
