import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import EventHandler from '../event-handler';
import getNotDeclaredProps from '../../get-not-declared-props';
import elevation from '../../styles/elevation';

/**
 * A component to render a dialog.
 *
 * @class
 */
export class DialogContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      dialogContainer: PropTypes.string.isRequired,
      backdrop: PropTypes.string.isRequired,
    }).isRequired,
    className: PropTypes.string,
    animateInName: PropTypes.string,
    animateOutName: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    animateInName: 'dialog--animate-in',
    animateOutName: 'dialog--animate-out',
  };

  static contextTypes = {
    dialogController: PropTypes.shape({
      initiateContainer: PropTypes.func.isRequired,
      removeContainer: PropTypes.func.isRequired,
    }).isRequired,
  };

  /**
   * The styles for the dialog component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.dialog - The actual theme for the dialog component.
   * @returns {Object} - Returns the styles.
   */
  static styles({ dialog: theme }) {
    return {
      '@keyframes dialog--animate-in': {
        from: {
          transform: 'translateY(40%)',
          opacity: 0,
        },
        to: {
          transform: 'translateY(0)',
          opacity: 1,
        },
      },

      '@keyframes dialog--animate-out': {
        from: {
          transform: 'translateY(0)',
          opacity: 1,
        },
        to: {
          transform: 'translateY(40%)',
          opacity: 0,
        },
      },

      dialogContainer: {
        composes: 'dialog--container',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'scale(1)',
        zIndex: theme.zIndex,

        '& > .modal': {
          backgroundColor: theme.backgroundColor,
          borderRadius: theme.borderRadius,
          boxShadow: elevation(theme.elevation),
          animationDuration: theme.animationDuration,
          animationFillMode: 'forwards',
        },
      },

      hideContainer: {
        composes: 'dialog--container-hidden',
        transform: 'scale(0)',
      },

      backdrop: {
        composes: 'dialog--backdrop',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        backgroundColor: theme.backdropColor,
        transition: `opacity ${theme.animationDuration}ms linear`,
      },

      backdropActive: { opacity: 1 },

      modal: {
        backgroundColor: theme.backgroundColor,
        borderRadius: theme.borderRadius,
        boxShadow: elevation(theme.elevation),
        animationDuration: theme.animationDuration,
        animationFillMode: 'forwards',
        opacity: 0,
      },
    };
  }

  state = {
    currentDialog: null,
    animatingOut: false,
  };

  /**
   * Initiate the container in the controller.
   */
  componentWillMount() {
    this.context.dialogController.initiateContainer(this.openDialog, this.closeDialog);
  }

  /**
   * Remove the container from the controller.
   */
  componentWillUnmount() {
    this.context.dialogController.removeContainer();
  }

  /**
   * The callback for when a modal should be opened.
   *
   * @param {Object} dialog - The dialog object.
   * @returns {Boolean} - Returns whether or not the dialog will be opened.
   */
  openDialog = (dialog) => {
    if (this.state.currentDialog) {
      warning(false, 'There is already a dialog currently opened!');

      return false;
    }

    this.setState(() => {
      return { currentDialog: dialog };
    });

    return true;
  };

  /**
   * Close the current dialog.
   * This will only change the animationOut state so the dialog animates out correctly.
   */
  closeDialog = () => {
    warning(
      !this.state.currentDialog,
      'There is currently no open dialog! This action will have no effect',
    );

    this.setState(({ currentDialog }) => {
      if (currentDialog) {
        return { animatingOut: true };
      }

      return null;
    });
  };

  /**
   * When the backdrop is pressed and the dialog is supposed to close on that,
   * we close the dialog.
   */
  handleBackdropPress = () => {
    if (this.state.currentDialog.closeOnOutsideClick) {
      this.closeDialog();
    }
  };

  /**
   * When the out animation ends, we call the onClose handler of the modal
   * and set the currentDialog state to null again.
   */
  handleAnimationEnd = () => {
    this.setState(({
      animatingOut,
      currentDialog,
    }) => {
      if (animatingOut) {
        currentDialog.onClose();

        return {
          currentDialog: null,
          animatingOut: false,
        };
      }

      return null;
    });
  };

  render() {
    const {
      classes,
      className,
      animateInName,
      animateOutName,
      ...props
    } = this.props;
    const {
      currentDialog,
      animatingOut,
    } = this.state;
    const classNames = classnames(
      classes.dialogContainer,
      className,
      { [classes.hideContainer]: !currentDialog },
    );

    let dialog = null;
    let backdrop = null;

    if (currentDialog) {
      const Element = currentDialog.component;

      dialog = (
        <div
          role="dialog"
          className={classes.modal}
          style={{ animationName: animatingOut ? animateOutName : animateInName }}
          onAnimationEnd={this.handleAnimationEnd}
        >
          <Element
            {...currentDialog.additionalProps}
            close={this.closeDialog}
          />
        </div>
      );

      const backdropClasses = classnames(
        classes.backdrop,
        { [classes.backdropActive]: currentDialog.backdrop && !animatingOut },
      );

      backdrop = (
        <EventHandler
          component="span"
          className={backdropClasses}
          onPress={this.handleBackdropPress}
        />
      );
    }

    return (
      <div
        aria-modal
        className={classNames}
        {...getNotDeclaredProps(props, DialogContainer)}
      >
        {backdrop}
        {dialog}
      </div>
    );
  }
}

export default injectSheet(DialogContainer.styles)(DialogContainer);
