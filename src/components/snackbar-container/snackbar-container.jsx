import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { position } from 'polished';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import { body1 } from '../../styles/typography';
import breakpoints from '../../styles/breakpoints';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which renders the currently active snackbar.
 *
 * @class
 */
export class SnackbarContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      snackbarContainer: PropTypes.string.isRequired,
      snackbar: PropTypes.string.isRequired,
      hideContainer: PropTypes.string.isRequired,
    }).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    horizontalPos: PropTypes.oneOf(['start', 'center', 'end']),
    animateInName: PropTypes.string,
    animateOutName: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    horizontalPos: 'center',
    animateInName: 'snackbar--animate-in',
    animateOutName: 'snackbar--animate-out',
    className: '',
  };

  static contextTypes = {
    snackbarController: PropTypes.shape({
      initiateContainer: PropTypes.func.isRequired,
      removeContainer: PropTypes.func.isRequired,
    }).isRequired,
  };

  /**
   * The styles for the container and the actual snackbar.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.snackbar - The actual theme for the snackbar.
   * @returns {Object} - Returns the styles.
   */
  static styles = ({ snackbar: theme }) => {
    return {
      '@keyframes snackbar--animate-in': {
        from: { transform: 'translateY(0)' },
        to: { transform: 'translateY(-100%)' },
      },

      '@keyframes snackbar--animate-out': {
        from: { transform: 'translateY(-100%)' },
        to: { transform: 'translateY(0)' },
      },

      snackbarContainer: {
        composes: 'snackbar--container',
        ...position('fixed', null, '0px', '0px', '0px'),
        height: theme.height,
        display: 'flex',

        '&.snackbar--pos-start': { justifyContent: 'flex-start' },
        '&.snackbar--pos-center': { justifyContent: 'center' },
        '&.snackbar--pos-end': { justifyContent: 'flex-end' },

        [breakpoints.up('tablet')]: { padding: '0 24px' },
      },

      hideContainer: {
        composes: 'snackbar--hide-container',
        transform: 'translateY(100%)',
      },

      snackbar: {
        composes: 'snackbar',
        ...body1,
        color: theme.color,
        boxSizing: 'border-box',
        padding: `${theme.verticalPadding}px ${theme.horizontalPadding}px`,
        height: theme.height,
        backgroundColor: theme.backgroundColor,
        position: 'absolute',
        bottom: -theme.height,
        zIndex: theme.zIndex,
        display: 'flex',
        animationDuration: 300,
        animationFillMode: 'forwards',
        justifyContent: 'space-between',
        alignItems: 'center',

        [breakpoints.only('mobile')]: { width: '100%' },

        [breakpoints.up('tablet')]: {
          borderRadius: theme.desktopBorderRadius,
          minWidth: theme.desktopMinWidth,
          maxWidth: theme.desktopMaxWidth,
        },

        '& > .button': {
          margin: 0,
          color: theme.color,
          marginLeft: theme.mobileLeftButtonMargin,

          [breakpoints.up('tablet')]: { marginLeft: theme.desktopLeftButtonMargin },
        },
      },
    };
  };

  state = {
    currentlyVisible: null,
    animatingOut: false,
  };

  /**
   * Initiate the container in the controller.
   */
  componentWillMount() {
    this.context.snackbarController.initiateContainer(this.addSnackbar, this.closeSnackbar);
  }

  /**
   * Create a new timeout to close the new snackbar when the currentlyVisible state changes.
   */
  componentDidUpdate(prevProps, prevState) {
    const { currentlyVisible } = this.state;

    if (prevState.currentlyVisible !== currentlyVisible && currentlyVisible !== null) {
      const snackbar = this.snackbars[0];

      if (snackbar.autoCloseTimer) {
        this.timeout = setTimeout(() => this.closeSnackbar(snackbar.id), snackbar.autoCloseTimer);
      }
    }
  }

  /**
   * Remove the container from the controller.
   */
  componentWillUnmount() {
    this.context.snackbarController.removeContainer();
  }

  timeout = null;
  snackbars = [];

  /**
   * When the controller adds an.
   *
   * @param {Object} snackbar - The snackbar.
   */
  addSnackbar = (snackbar) => {
    if (this.snackbars.find(({ id }) => id === snackbar.id)) {
      return;
    }

    this.snackbars.push(snackbar);

    if (this.state.currentlyVisible === null) {
      this.setState({ currentlyVisible: snackbar.id });
    }
  };

  /**
   * Close the snackbar with the current id.
   *
   * @param {String} id - The id of the snackbar.
   */
  closeSnackbar = (id) => {
    if (this.state.currentlyVisible === id) {
      this.setState({ animatingOut: true });

      clearTimeout(this.timeout);

      return;
    }

    this.snackbars = this.snackbars.filter(elem => elem.id !== id);
  };

  /**
   * When the snackbar finishes the animation,
   * we need to change the currentlyVisible to the next snackbar.
   */
  handleAnimationEnd = () => {
    this.setState(({ animatingOut }) => {
      if (animatingOut) {
        const oldSnackbar = this.snackbars.shift();

        oldSnackbar.onClose();

        return {
          currentlyVisible: this.snackbars.length > 0 ? this.snackbars[0].id : null,
          animatingOut: false,
        };
      }

      return null;
    });
  };

  render() {
    const {
      classes,
      animateInName,
      animateOutName,
      horizontalPos,
      className,
      ...props
    } = this.props;
    const {
      currentlyVisible,
      animatingOut,
    } = this.state;
    let content = null;
    const classNames = classnames(
      classes.snackbarContainer,
      className,
      `snackbar--pos-${horizontalPos}`,
      { [classes.hideContainer]: !currentlyVisible },
    );

    if (currentlyVisible) {
      const snackbar = this.snackbars[0];

      content = (
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          className={`${classes.snackbar} ${snackbar.className}`}
          style={{ animationName: animatingOut ? animateOutName : animateInName }}
          onAnimationEnd={this.handleAnimationEnd}
        >
          {snackbar.content}
        </div>
      );
    }

    return (
      <div
        className={classNames}
        {...getNotDeclaredProps(props, SnackbarContainer)}
      >
        {content}
      </div>
    );
  }
}

export default injectSheet(SnackbarContainer.styles)(SnackbarContainer);
