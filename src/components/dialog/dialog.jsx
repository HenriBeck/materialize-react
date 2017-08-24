import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import getNotDeclaredProps from '../../get-not-declared-props';

import DialogController from './dialog-controller';
import DialogContainer from './dialog-container';
import DialogHeader from './dialog-header';
import DialogContent from './dialog-content';
import DialogButtons from './dialog-buttons';

/**
 * Render a dialog in the dialog container.
 * This creates the dialog object and exposes open and close methods for the specific modal.
 *
 * @class
 */
export default class Dialog extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    hasBackdrop: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    hasBackdrop: true,
    closeOnOutsideClick: true,
    onClose: () => {},
  };

  static contextTypes = {
    dialogController: PropTypes.shape({
      openDialog: PropTypes.func.isRequired,
      closeDialog: PropTypes.func.isRequired,
    }).isRequired,
  };

  static Controller = DialogController;
  static Container = DialogContainer;
  static Header = DialogHeader;
  static Content = DialogContent;
  static Buttons = DialogButtons;

  isOpened = false;

  /**
   * Open the dialog.
   */
  open() {
    const {
      component,
      hasBackdrop,
      closeOnOutsideClick,
      onClose,
      ...props
    } = this.props;

    this.isOpened = this.context.dialogController.openDialog({
      backdrop: hasBackdrop,
      closeOnOutsideClick,
      component,
      additionalProps: getNotDeclaredProps(props, Dialog),
      onClose: () => {
        this.isOpened = false;

        onClose();
      },
    });
  }

  /**
   * Close the dialog.
   */
  close() {
    warning(
      !this.isOpened,
      'You are closing the current dialog from a different dialog which is not the opened one!',
    );

    this.context.dialogController.closeDialog();
  }

  render() {
    return null;
  }
}
