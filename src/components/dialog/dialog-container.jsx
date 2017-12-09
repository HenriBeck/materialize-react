import React, {
  PureComponent,
  Children,
} from 'react';
import injectSheet from 'react-jss';
import noop from 'lodash.noop';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Backdrop from '../backdrop';
import breakpoints from '../../styles/breakpoints';

/**
 * The component for the dialog container.
 *
 * @class
 */
class DialogContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({
      dialogContainer: PropTypes.string.isRequired,
      showContainer: PropTypes.string.isRequired,
    }).isRequired,
    dialog: PropTypes.string,
    className: PropTypes.string,
    onCloseRequest: PropTypes.func,
  };

  static defaultProps = {
    dialog: null,
    className: '',
    onCloseRequest: noop,
  };

  /**
   * The styles for the Dialog Container.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles.
   */
  static styles(theme) {
    return {
      dialogContainer: {
        composes: 'dialog-container',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'scale(0)',
        zIndex: theme.zIndexes.dialog,
        padding: 32,

        [breakpoints.up('tablet')]: { padding: 64 },
      },

      showContainer: {
        composes: 'dialog-container--hidden',
        transform: 'scale(1)',
      },
    };
  }

  state = {
    currentDialog: this.props.dialog,
    animatingOut: false,
    nextDialog: null,
  };

  /**
   * Update the state when the dialog prop changes.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.dialog !== this.props.dialog) {
      this.setState((state) => {
        if (state.currentDialog) {
          return {
            animatingOut: true,
            nextDialog: nextProps.dialog,
          };
        }

        return { currentDialog: nextProps.dialog };
      });
    }
  }

  /**
   * Get the current dialog child.
   *
   * @returns {JSX} - Returns the child.
   */
  getDialog() {
    return Children
      .toArray(this.props.children)
      .find(child => child.props.name === this.state.currentDialog);
  }

  /**
   * Calculate the active status of the dialog.
   *
   * @param {Object} dialog - The current dialog element.
   * @returns {Boolean} - Returns whether we need to show the backdrop.
   */
  isDialogActive(dialog) {
    return dialog
           && (dialog.props.backdrop && !dialog.props.fullscreen)
           && (!this.state.animatingOut || this.state.nextDialog);
  }

  /**
   * Update the state when the animation ends on the current dialog.
   * When the animatingOut state is set to true, we can animate the next dialog in.
   */
  handleAnimationEnd = () => {
    this.setState((state) => {
      if (!state.animatingOut) {
        return null;
      }

      return {
        animatingOut: false,
        currentDialog: state.nextDialog,
        nextDialog: null,
      };
    });
  };

  /**
   * Call the onCloseRequest prop when the backdrop is clicked.
   */
  handleBackdropClick = () => {
    const dialog = this.getDialog();

    if (dialog.props.closeOnBackdropClick) {
      this.props.onCloseRequest();
    }
  };

  render() {
    const dialog = this.getDialog();

    return (
      <div
        aria-modal="true"
        className={classnames(
          this.props.classes.dialogContainer,
          { [this.props.classes.showContainer]: dialog },
          this.props.className,
        )}
      >
        <Backdrop
          className="dialog-container--backdrop"
          active={this.isDialogActive(dialog)}
          onClick={this.handleBackdropClick}
        />

        {dialog ? React.cloneElement(dialog, {
          role: 'dialog',
          onAnimationEnd: this.handleAnimationEnd,
          isAnimatingOut: this.state.animatingOut,
        }) : null}
      </div>
    );
  }
}

export default injectSheet(DialogContainer.styles)(DialogContainer);
