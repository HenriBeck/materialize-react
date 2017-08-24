import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import SnackbarController from './snackbar-controller';
import SnackbarContainer from './snackbar-container';

/**
 * The actual snackbar.
 *
 * @class
 */
export default class Snackbar extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    autoShowOnMount: PropTypes.bool,
    autoCloseTimer: PropTypes.number,
    className: PropTypes.string,
  };

  static defaultProps = {
    onClose: () => {},
    autoShowOnMount: false,
    autoCloseTimer: 5 * 1000,
    className: '',
  };

  static contextTypes = {
    snackbarController: PropTypes.shape({
      addSnackbar: PropTypes.func.isRequired,
      closeSnackbar: PropTypes.func.isRequired,
    }).isRequired,
  };

  /**
   * When the user passed autoShowOnMount.
   */
  componentDidMount() {
    if (this.props.autoShowOnMount) {
      this.show();
    }
  }

  id = randomstring.generate();

  /**
   * Show the current snackbar.
   */
  show() {
    this.context.snackbarController.addSnackbar({
      id: this.id,
      content: this.props.children,
      onClose: this.props.onClose,
      autoCloseTimer: this.props.autoCloseTimer,
      className: this.props.className,
    });
  }

  /**
   * To close the current snackbar.
   *
   * This is dangerous as the user doesn't know which snackbar is currently shown
   * and could remove the wrong snackbar.
   */
  close() {
    this.context.snackbarController.closeSnackbar(this.id);
  }

  render() {
    return null;
  }
}

Snackbar.Controller = SnackbarController;
Snackbar.Container = SnackbarContainer;
