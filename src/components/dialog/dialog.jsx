import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';

import Controller from './dialog-controller';
import Container from './dialog-container';
import Header from './dialog-header';
import Content from './dialog-content';
import Buttons from './dialog-buttons';

/**
 * Render a dialog in the dialog container.
 * This creates the dialog object and exposes open and close methods for the specific dialog.
 *
 * @class
 */
export default class Dialog extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    hasBackdrop: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
    fullscreen: PropTypes.bool,
  };

  static defaultProps = {
    hasBackdrop: true,
    closeOnOutsideClick: true,
    className: '',
    fullscreen: false,
    onClose: () => {},
  };

  static contextTypes = {
    dialogController: PropTypes.shape({
      openDialog: PropTypes.func.isRequired,
      closeDialog: PropTypes.func.isRequired,
    }).isRequired,
  };

  static Controller = Controller;

  static Container = Container;

  static Header = Header;

  static Content = Content;

  static Buttons = Buttons;

  /**
   * Open the dialog.
   */
  open() {
    const {
      component,
      hasBackdrop,
      closeOnOutsideClick,
      className,
      fullscreen,
      onClose,
      ...props
    } = this.props;

    this.context.dialogController.openDialog({
      backdrop: hasBackdrop,
      closeOnOutsideClick,
      component,
      fullscreen,
      className,
      additionalProps: getNotDeclaredProps(props, Dialog),
      onClose,
    });
  }

  /**
   * Close the dialog.
   */
  close() {
    this.context.dialogController.closeDialog();
  }

  render() {
    return null;
  }
}
