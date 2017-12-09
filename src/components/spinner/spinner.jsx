import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import getNotDeclaredProps from '../../get-not-declared-props';

const containerRotationDuration = 1568;
const fullCycleDuration = 5332;
const expandContractDuration = 1333;

/**
 * A material design spinner.
 *
 * @class
 * @extends PureComponent
 */
export class Spinner extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      spinner: PropTypes.string.isRequired,
      spinnerActive: PropTypes.string.isRequired,
      container: PropTypes.string.isRequired,
      layer: PropTypes.string.isRequired,
      clipper: PropTypes.string.isRequired,
      clipperLeft: PropTypes.string.isRequired,
      clipperRight: PropTypes.string.isRequired,
    }).isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    active: false,
    className: '',
  };

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles(theme) {
    return {
      '@keyframes spinner--container-rotate': { to: { transform: 'rotate(360deg)' } },

      '@keyframes spinner--fill-unfill-rotate': {
        '12.5%': { transform: 'rotate(135deg)' },
        '25%': { transform: 'rotate(270deg)' },
        '37.5%': { transform: 'rotate(405deg)' },
        '50%': { transform: 'rotate(540deg)' },
        '62.5%': { transform: 'rotate(675deg)' },
        '75%': { transform: 'rotate(810deg)' },
        '87.5%': { transform: 'rotate(945deg)' },
        '100%': { transform: 'rotate(1080deg)' },
      },

      '@keyframes spinner--left-spin': {
        '0%': { transform: 'rotate(130deg)' },
        '50%': { transform: 'rotate(-5deg)' },
        '100%': { transform: 'rotate(130deg)' },
      },

      '@keyframes spinner--right-spin': {
        '0%': { transform: 'rotate(-130deg)' },
        '50%': { transform: 'rotate(5deg)' },
        '100%': { transform: 'rotate(-130deg)' },
      },

      spinner: {
        composes: 'spinner',
        display: 'inline-block',
        position: 'relative',
        width: 64,
        height: 64,
        padding: 8,
        boxSizing: 'border-box',
        opacity: 0,
        transition: 'opacity 200ms',
      },

      spinnerActive: {
        composes: 'spinner--active',

        '& $container': { animationName: 'spinner--container-rotate' },

        '& $layer': { animationName: 'spinner--fill-unfill-rotate' },

        '& $clipperLeft::after': { animationName: 'spinner--left-spin' },

        '& $clipperRight::after': { animationName: 'spinner--right-spin' },
      },

      container: {
        composes: 'spinner--container',
        width: '100%',
        height: '100%',
        direction: 'ltr',
        animationDuration: containerRotationDuration,
        animationIterationCount: 'infinite',
      },

      layer: {
        composes: 'spinner--layer',
        position: 'absolute',
        width: '100%',
        height: '100%',
        whiteSpace: 'nowrap',
        animationTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        animationIterationCount: 'infinite',
        animationDuration: fullCycleDuration,
        borderColor: theme.primaryBase,

        '&::after': {
          content: '""',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          borderColor: 'inherit',
          borderRadius: '50%',
          left: '45%',
          width: '10%',
          borderTopStyle: 'solid',
          borderWidth: 4,
        },
      },

      clipper: {
        composes: 'spinner--clipper',
        display: 'inline-block',
        position: 'relative',
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        borderColor: 'inherit',

        '&::after': {
          content: '""',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          borderColor: 'inherit',
          borderRadius: '50%',
          bottom: 0,
          width: '200%',
          borderStyle: 'solid',
          borderBottomColor: 'transparent',
          animationTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
          animationIterationCount: 'infinite',
          borderWidth: 4,
          animationDuration: expandContractDuration,
        },
      },

      clipperLeft: {
        composes: '$clipper left',

        '&::after': {
          left: 0,
          borderRightColor: 'transparent',
          transform: 'rotate(129deg)',
        },
      },

      clipperRight: {
        composes: '$clipper right',

        '&::after': {
          left: '-100%',
          borderLeftColor: 'transparent',
          transform: 'rotate(-129deg)',
        },
      },
    };
  }

  state = {
    active: false,
    opacity: 0,
  };

  /**
   * Fade the spinner in if the active prop is passed.
   */
  componentDidMount() {
    if (this.props.active) {
      this.fadeIn();
    }
  }

  /**
   * Fade the spinner in/out when the active prop changes.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active) {
        this.fadeIn();
      } else {
        this.fadeOut();
      }
    }
  }

  isAnimatingOut = false;

  /**
   * Fade the spinner in.
   *
   * @private
   */
  fadeIn() {
    this.setState({
      active: true,
      opacity: 1,
    });
  }

  /**
   * Fade the spinner out.
   *
   * @private
   */
  fadeOut() {
    this.isAnimatingOut = true;

    this.setState({ opacity: 0 });
  }

  /**
   * When the transition ends we need to check if we should handle the event
   * and remove the .spinner--active class.
   */
  handleTransitionEnd = () => {
    if (this.isAnimatingOut) {
      this.isAnimatingOut = false;

      this.setState({ active: false });
    }
  };

  render() {
    return (
      <div
        {...getNotDeclaredProps(this.props, Spinner)}
        role="presentation"
        className={classnames(
          this.props.classes.spinner,
          { [this.props.classes.spinnerActive]: this.state.active },
          this.props.className,
        )}
        style={{ opacity: this.state.opacity }}
        onTransitionEnd={this.handleTransitionEnd}
      >
        <div className={this.props.classes.container}>
          <div className={this.props.classes.layer}>
            <div className={this.props.classes.clipperLeft} />
            <div className={this.props.classes.clipperRight} />
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(Spinner.styles)(Spinner);
