import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';
import { easeInOutCubic } from '../../styles/timings';
import warning from '../../utils/warning';

/**
 * A component to render a material design progress bar.
 *
 * @class
 * @extends PureComponent
 */
export class Progress extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      progress: PropTypes.string.isRequired,
      container: PropTypes.string.isRequired,
      primaryBar: PropTypes.string.isRequired,
      secondaryBar: PropTypes.string.isRequired,
    }).isRequired,
    theme: PropTypes.shape({ progress: PropTypes.object.isRequired }).isRequired,
    indeterminate: PropTypes.bool,
    disabled: PropTypes.bool,
    progress: PropTypes.number,
    secondaryProgress: PropTypes.number,
    className: PropTypes.string,
    active: PropTypes.bool,
  };

  static defaultProps = {
    indeterminate: false,
    progress: 0,
    className: '',
    active: false,
    secondaryProgress: 0,
    disabled: false,
  };

  /**
   * Make sure the value that the user passed in is valid and is between 0 and 100.
   *
   * @param {Number} value - The value to validate.
   * @returns {Number} - Returns the value when it's valid.
   * Returns the min or max value when it's not valid.
   */
  static clamp(value) {
    return Math.max(0, Math.min(value, 100));
  }

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.progress - The actual theme for the progress component.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles({ progress: theme }) {
    return {
      '@keyframes progress--bar': {
        '0%': { transform: 'scaleX(1) translateX(-100%)' },
        '50%': { transform: 'scaleX(1) translateX(0%)' },
        '75%': {
          transform: 'scaleX(1) translateX(0%)',
          animationTimingFunction: 'cubic-bezier(.28, .62, .37, .91)',
        },
        '100%': { transform: 'scaleX(0) translateX(0%)' },
      },

      '@keyframes progress--splitter': {
        '0%': { transform: 'scaleX(.75) translateX(-125%)' },
        '30%': {
          transform: 'scaleX(.75) translateX(-125%)',
          animationTimingFunction: 'cubic-bezier(.42, 0, .6, .8)',
        },
        '90%': { transform: 'scaleX(.75) translateX(125%)' },
        '100%': { transform: 'scaleX(.75) translateX(125%)' },
      },

      progress: {
        composes: 'progress',
        display: 'block',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',

        '&.progress--indeterminate $primaryBar': {
          transformOrigin: 'right center',
          animationIterationCount: 'infinite',
          animationDuration: theme.indeterminateDuration,
        },

        '&.progress--indeterminate $primaryBar::after': {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          content: '""',
          transformOrigin: 'center center',
          animationIterationCount: 'infinite',
          height: theme.barHeight,
          backgroundColor: theme.backgroundColor,
          animationDuration: theme.indeterminateDuration,
        },

        '&.progress--indeterminate[data-active] $primaryBar': {
          animationName: 'progress--bar',

          '&::after': { animationName: 'progress--splitter' },
        },

        '&[aria-disabled=true] $primaryBar': { backgroundColor: theme.disabledPrimaryBarColor },

        '&[aria-disabled=true] $secondaryBar': { backgroundColor: theme.disabledSecondaryBarColor },
      },

      container: {
        composes: 'progress--container',
        position: 'relative',
        width: '100%',
        height: theme.barHeight,
        backgroundColor: theme.backgroundColor,
      },

      primaryBar: {
        composes: 'progress--primary-bar',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transformOrigin: 'left center',
        willChange: 'transform',
        transform: 'scaleX(0)',
        transition: `transform ${easeInOutCubic}`,
        backgroundColor: theme.primaryBarColor,
      },

      secondaryBar: {
        composes: 'progress--secondary-bar',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transformOrigin: 'left center',
        willChange: 'transform',
        transform: 'scaleX(0)',
        transition: `transform ${easeInOutCubic}`,
        backgroundColor: theme.secondaryBarColor,
      },
    };
  }

  /**
   * Animate the bars to initial values.
   */
  componentDidMount() {
    if (!this.props.indeterminate) {
      if (this.props.progress !== 0) {
        this.animateBar(this.primaryBar, 0, this.props.progress);
      }

      if (this.props.secondaryProgress !== 0) {
        this.animateBar(this.secondaryBar, 0, this.props.secondaryProgress);
      }
    }
  }

  /**
   * Warn if the user changes the mode prop.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.indeterminate !== this.props.indeterminate,
      'You should not change the mode of the progress bar!',
    );
  }

  /**
   * Animate the bars when the props changed.
   */
  componentDidUpdate(prevProps) {
    if (!this.props.indeterminate) {
      const { secondaryProgress } = this.props;

      if (this.props.progress !== prevProps.progress) {
        this.animateBar(this.primaryBar, prevProps.progress, this.props.progress);
      }

      if (secondaryProgress !== prevProps.secondaryProgress) {
        this.animateBar(this.secondaryBar, prevProps.secondaryProgress, secondaryProgress);
      }
    }
  }

  /**
   * Animate one of the bars.
   *
   * @private
   * @param {Object} elem - The element to animate.
   * @param {Number} prevProgress - The previous progress.
   * @param {Number} newProgress - The new progress to animate too.
   */
  animateBar(elem, prevProgress, newProgress) {
    const clampNewValue = Progress.clamp(newProgress);
    const clampPrevValue = Progress.clamp(prevProgress);
    const { fullAnimationDuration } = this.props.theme.progress;
    const duration = Math.abs((clampPrevValue - clampNewValue) / 100) * fullAnimationDuration;

    /* eslint-disable no-param-reassign */
    elem.style.transitionDuration = `${duration}ms`;
    elem.style.transform = `matrix(${clampNewValue / 100}, 0, 0, 1, 0, 0)`;
    /* eslint-enable no-param-reassign */
  }

  render() {
    const {
      classes,
      indeterminate,
      disabled,
      progress,
      active,
      ...props
    } = this.props;
    const additionalProps = indeterminate ? { 'data-active': active } : {
      'aria-valuenow': Progress.clamp(progress),
      'aria-valuemin': 0,
      'aria-valuemax': 100,
    };
    const className = classnames(
      this.props.className,
      classes.progress,
      indeterminate && 'progress--indeterminate',
    );

    return (
      <span
        {...getNotDeclaredProps(props, Progress)}
        role="progressbar"
        aria-disabled={disabled}
        className={className}
        ref={(element) => { this.root = element; }}
        {...additionalProps}
      >
        <div className={classes.container}>
          <div
            className={classes.secondaryBar}
            ref={(element) => { this.secondaryBar = element; }}
          />

          <div
            className={classes.primaryBar}
            ref={(element) => { this.primaryBar = element; }}
          />
        </div>
      </span>
    );
  }
}

export default injectSheet(Progress.styles)(Progress);
