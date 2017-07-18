import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';
import { easeInOutCubic } from '../../styles/timings';
import warning from '../../utils/warning';
import connectWithTheme from '../../styles/theme/connect-with-theme';

/**
 * A component to render a material design progress bar.
 *
 * @class
 * @extends PureComponent
 */
export class Progress extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
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
    const transform = window.getComputedStyle(elem).transform;
    const clampNewValue = Progress.clamp(newProgress);
    const clampPrevValue = Progress.clamp(prevProgress);
    const { fullAnimationDuration } = this.props.theme;

    elem.animate({
      transform: [
        transform,
        `matrix(${clampNewValue / 100}, 0, 0, 1, 0, 0)`,
      ],
    }, {
      fill: 'forwards',
      duration: Math.abs((clampPrevValue - clampNewValue) / 100) * fullAnimationDuration,
      easing: easeInOutCubic,
    });
  }

  render() {
    const { classes } = this.props;
    const props = {};
    const isIndeterminate = this.props.indeterminate;
    const className = classnames(
      this.props.className,
      classes.progress,
      isIndeterminate && 'progress--indeterminate',
    );

    if (isIndeterminate) {
      props['data-active'] = this.props.active;
    } else {
      props['aria-valuenow'] = Progress.clamp(this.props.progress);
      props['aria-valuemin'] = 0;
      props['aria-valuemax'] = 100;
    }

    return (
      <span
        {...getNotDeclaredProps(this.props, Progress)}
        role="progressbar"
        aria-disabled={this.props.disabled}
        className={className}
        ref={(element) => { this.root = element; }}
        {...props}
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

const layoutFit = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const styles = {
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
      animationDuration: props => props.theme.indeterminateDuration,
    },

    '&.progress--indeterminate $primaryBar::after': {
      ...layoutFit,
      content: '""',
      transformOrigin: 'center center',
      animationIterationCount: 'infinite',
      height: props => props.theme.barHeight,
      backgroundColor: props => props.theme.backgroundColor,
      animationDuration: props => props.theme.indeterminateDuration,
    },

    '&.progress--indeterminate[data-active] $primaryBar': {
      animationName: 'progress--bar',

      '&::after': { animationName: 'progress--splitter' },
    },

    '&[aria-disabled=true] $primaryBar': {
      backgroundColor(props) {
        return props.theme.disabledPrimaryBarColor;
      },
    },

    '&[aria-disabled=true] $secondaryBar': {
      backgroundColor(props) {
        return props.theme.disabledSecondaryBarColor;
      },
    },
  },

  container: {
    composes: 'progress--container',
    position: 'relative',
    width: '100%',
    height: props => props.theme.barHeight,
    backgroundColor: props => props.theme.backgroundColor,
  },

  primaryBar: {
    composes: 'progress--primary-bar',
    ...layoutFit,
    transformOrigin: 'left center',
    willChange: 'transform',
    transform: 'scaleX(0)',
    backgroundColor: props => props.theme.primaryBarColor,
  },

  secondaryBar: {
    composes: 'progress--secondary-bar',
    ...layoutFit,
    transformOrigin: 'left center',
    willChange: 'transform',
    transform: 'scaleX(0)',
    backgroundColor: props => props.theme.secondaryBarColor,
  },
};

export default connectWithTheme(injectSheet(styles)(Progress), 'progress');
