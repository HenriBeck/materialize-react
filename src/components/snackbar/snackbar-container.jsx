import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { position } from 'polished';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import noop from 'lodash.noop';

import { body1 } from '../../styles/typography';
import breakpoints from '../../styles/breakpoints';
import getNotDeclaredProps from '../../get-not-declared-props';
import {
  whiteText,
  blackText,
} from '../../styles/colors';

const uppercase = str => `${str[0].toUpperCase()}${str.slice(1)}`;

/**
 * A component which renders an array of snackbars.
 *
 * @class
 */
export class SnackbarContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      snackbar: PropTypes.string.isRequired,
      positionStart: PropTypes.string.isRequired,
      positionCenter: PropTypes.string.isRequired,
      positionEnd: PropTypes.string.isRequired,
      hideContainer: PropTypes.string.isRequired,
    }).isRequired,
    snackbars: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.node,
        autoCloseTimer: PropTypes.number,
        className: PropTypes.string,
      }),
    ).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    horizontalPosition: PropTypes.oneOf(['start', 'center', 'end']),
    animateInName: PropTypes.string,
    animateOutName: PropTypes.string,
    className: PropTypes.string,
    createRef: PropTypes.func,
    onRemoveSnackbar: PropTypes.func,
  };

  static defaultProps = {
    horizontalPosition: 'center',
    animateInName: 'snackbar--animate-in',
    animateOutName: 'snackbar--animate-out',
    className: '',
    createRef: noop,
    onRemoveSnackbar: noop,
  };

  /**
   * The styles for the container and the actual snackbar.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.snackbar - The actual theme for the snackbar.
   * @returns {Object} - Returns the styles.
   */
  static styles(theme) {
    const isDark = theme.type === 'dark';

    return {
      '@keyframes snackbar--animate-in': {
        from: { transform: 'translateY(0)' },
        to: { transform: 'translateY(-100%)' },
      },

      '@keyframes snackbar--animate-out': {
        from: { transform: 'translateY(-100%)' },
        to: { transform: 'translateY(0)' },
      },

      container: {
        composes: 'snackbar--container',
        ...position('fixed', null, '0px', '0px', '0px'),
        height: 80,
        display: 'flex',
        zIndex: theme.zIndexes.snackbar,

        '&.snackbar--pos-start': { justifyContent: 'flex-start' },
        '&.snackbar--pos-center': { justifyContent: 'center' },
        '&.snackbar--pos-end': { justifyContent: 'flex-end' },

        [breakpoints.up('tablet')]: { padding: '0 24px' },
      },

      positionStart: { justifyContent: 'flex-start' },
      positionCenter: { justifyContent: 'center' },
      positionEnd: { justifyContent: 'flex-end' },

      hideContainer: {
        composes: 'snackbar--hide-container',
        transform: 'scale(0)',
      },

      snackbar: {
        composes: 'snackbar',
        ...body1,
        color: isDark ? blackText : whiteText,
        boxSizing: 'border-box',
        padding: '14px 24px',
        height: 48,
        backgroundColor: isDark ? '#ffffff' : '#323232',
        position: 'absolute',
        bottom: -48,
        display: 'flex',
        animationDuration: 300,
        animationFillMode: 'forwards',
        justifyContent: 'space-between',
        alignItems: 'center',

        [breakpoints.only('mobile')]: { width: '100%' },

        [breakpoints.up('tablet')]: {
          borderRadius: 2,
          minWidth: 288,
          maxWidth: 568,
        },

        '& > .button': {
          margin: 0,
          color: isDark ? blackText : whiteText,
          marginLeft: 24,

          [breakpoints.up('tablet')]: { marginLeft: 48 },
        },
      },
    };
  }

  /**
   * Call the createRef prop because ref's don't work because of the Jss HoC.
   *
   * @param {Object} props - The props for the component.
   */
  constructor(props) {
    super(props);

    props.createRef(this);
  }

  state = { animatingOut: false };

  /**
   * Change the animationOut state if we finished animating out
   * and the length of the snackbars array has changed.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.snackbars.length !== this.props.snackbars.length && this.finishedAnimatingOut) {
      this.finishedAnimatingOut = false;

      this.setState({ animatingOut: false });
    }
  }

  /**
   * Clear the timeout if necessary.
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  finishedAnimatingOut = false;

  timeout = null;

  /**
   * Set the animationOut state to true so the current snackbar leaves the visible viewport.
   */
  removeCurrentSnackbar = () => {
    this.setState({ animatingOut: true });

    clearTimeout(this.timeout);
  };

  /**
   * When the animation finishes we wan't to either start a timeout
   * if the snackbar has an auto close timer
   * or call the onRemoveSnackbar prop.
   */
  handleAnimationEnd = () => {
    if (this.state.animatingOut) {
      this.finishedAnimatingOut = true;

      this.props.onRemoveSnackbar();
    } else {
      const snackbar = this.props.snackbars[0];

      if (snackbar.autoCloseTimer) {
        this.timeout = setTimeout(this.removeCurrentSnackbar, snackbar.autoCloseTimer);
      }
    }
  };

  /**
   * Render the current snackbar.
   *
   * @returns {JSX} - Returns the snackbar element.
   */
  renderCurrentSnackbar() {
    const snackbar = this.props.snackbars[0];
    const {
      animateInName,
      animateOutName,
    } = this.props;
    const { animatingOut } = this.state;

    return (
      <span // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={classnames(
          this.props.classes.snackbar,
          snackbar.className,
        )}
        style={{ animationName: animatingOut ? animateOutName : animateInName }}
        onAnimationEnd={this.handleAnimationEnd}
      >
        {snackbar.content}
      </span>
    );
  }

  render() {
    return (
      <div
        className={classnames(
          this.props.classes.container,
          this.props.className,
          this.props.classes[`position${uppercase(this.props.horizontalPosition)}`],
          { [this.props.classes.hideContainer]: this.props.snackbars.length === 0 },
        )}
        {...getNotDeclaredProps(this.props, SnackbarContainer)}
      >
        {this.props.snackbars.length > 0 ? this.renderCurrentSnackbar() : null}
      </div>
    );
  }
}

export default injectSheet(SnackbarContainer.styles)(SnackbarContainer);
