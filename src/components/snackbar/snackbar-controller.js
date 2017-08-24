import {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

/**
 * The controller for the snackbars. It connects the actual snackbars to the container.
 *
 * @class
 */
export default class SnackbarController extends PureComponent {
  static propTypes = { children: PropTypes.node.isRequired };

  static childContextTypes = {
    snackbarController: PropTypes.shape({
      initiateContainer: PropTypes.func.isRequired,
      addSnackbar: PropTypes.func.isRequired,
      removeContainer: PropTypes.func.isRequired,
      closeSnackbar: PropTypes.func.isRequired,
    }).isRequired,
  };

  /**
   * Get the context for the snackbar and the snackbar container.
   *
   * @returns {Object} - Returns the context.
   */
  getChildContext() {
    return {
      snackbarController: {
        initiateContainer: this.initiateContainer,
        addSnackbar: this.addSnackbar,
        removeContainer: this.removeContainer,
        closeSnackbar: this.closeSnackbar,
      },
    };
  }

  hasController = false;
  addSnackbarCallback = null;
  closeSnackbarCallback = null;

  /**
   * Initiate a controller.
   *
   * @param {Function} addSnackbar - The callback for when a new snackbar should be added.
   * @param {Function} closeSnackbar - The callback for when a snackbar should be closed.
   */
  initiateContainer(addSnackbar, closeSnackbar) {
    warning(
      !this.hasController,
      'A snackbar container is already registered. Only one container can be active at a time.',
    );

    this.hasController = true;

    this.addSnackbarCallback = addSnackbar;
    this.closeSnackbarCallback = closeSnackbar;
  }

  /**
   * Remove the current container and reset the state.
   */
  removeContainer() {
    this.hasController = false;
    this.addSnackbarCallback = null;
    this.closeSnackbarCallback = null;
  }

  /**
   * Add a snackbar to the container.
   *
   * @param {Object} component - The snackbar component.
   */
  addSnackbar(component) {
    warning(
      this.addSnackbarCallback,
      [
        'No snackbar container has been registered.',
        'For snackbars to work correctly you will need a snackbar container.',
      ].join(' '),
    );

    this.addSnackbarCallback(component);
  }

  /**
   * Close a snackbar with the provided id.
   *
   * @param {String} id - The id of the snackbar.
   */
  closeSnackbar(id) {
    warning(
      this.closeSnackbarCallback,
      [
        'No snackbar container has been registered.',
        'For snackbars to work correctly you will need a snackbar container.',
      ].join(' '),
    );

    this.closeSnackbarCallback(id);
  }

  render() {
    return Children.only(this.props.children);
  }
}
