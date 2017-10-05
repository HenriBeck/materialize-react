import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

/**
 * The controller for the dialogs. It connects the actual dialog to the container.
 *
 * @class
 */
export default class DialogController extends PureComponent {
  static propTypes = { children: PropTypes.node.isRequired };

  static childContextTypes = {
    dialogController: PropTypes.shape({
      initiateContainer: PropTypes.func.isRequired,
      removeContainer: PropTypes.func.isRequired,
      openDialog: PropTypes.func.isRequired,
      closeDialog: PropTypes.func.isRequired,
    }).isRequired,
  };

  /**
   * Get the context for the dialog and the dialog container.
   *
   * @returns {Object} - Returns the context.
   */
  getChildContext() {
    return {
      dialogController: {
        initiateContainer: this.initiateContainer,
        removeContainer: this.removeContainer,
        openDialog: this.openDialog,
        closeDialog: this.closeDialog,
      },
    };
  }

  hasController = false;
  openDialogCallback = null;
  closeDialogCallback = null;

  /**
   * Initiate a controller.
   *
   * @param {Function} openDialog - The callback for when a new dialog should be opened.
   * @param {Function} closeDialog - The callback for when the current dialog should be closed.
   */
  initiateContainer = (openDialog, closeDialog) => {
    warning(
      !this.hasController,
      'A dialog container is already registered. Only one container can be active at a time.',
    );

    this.hasController = true;

    this.openDialogCallback = openDialog;
    this.closeDialogCallback = closeDialog;
  };

  /**
   * Remove the current container and reset the state.
   */
  removeContainer = () => {
    this.hasController = false;
    this.openDialogCallback = null;
    this.closeDialogCallback = null;
  };

  /**
   * Open a new dialog and call the callback from the container.
   *
   * @param {Object} dialog - The dialog object.
   * @returns {Boolean} - Returns whether or not the container will open the dialog.
   */
  openDialog = (dialog) => {
    warning(
      this.hasController,
      [
        'No dialog container has been registered.',
        'For dialogs to work correctly you will need a dialog container.',
      ].join(' '),
    );

    return this.openDialogCallback(dialog);
  };

  /**
   * Close the current opened dialog and call the callback from the container.
   */
  closeDialog = () => {
    warning(
      this.hasController,
      [
        'No dialog container has been registered.',
        'For dialogs to work correctly you will need a dialog container.',
      ].join(' '),
    );

    this.closeDialogCallback();
  };

  render() {
    return this.props.children;
  }
}

