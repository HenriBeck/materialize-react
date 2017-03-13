import React, {
  PureComponent,
  PropTypes,
} from 'react';

import getNotDeclaredProps from 'utils/react/get-not-declared-props';
import Stylesheet from 'styles/stylesheet';
import { easeInOutCubic } from 'styles/timings';
import warning from 'utils/warning';

/**
 * A progress bar which follows the material design guidelines.
 */
export default class Progress extends PureComponent {
  static propTypes = {
    mode: PropTypes.oneOf([
      'normal',
      'indeterminate',
    ]),
    progress: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    active: PropTypes.bool,
  };

  static defaultProps = {
    mode: 'normal',
    progress: 0,
    className: '',
    style: {},
    active: false,
  };

  static contextTypes = { theme: PropTypes.object };

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

  componentDidMount() {
    // Check if the component is in normal mode and if the progress is not 0
    // elsewise check if the component is in indeterminate mode and active
    // to start the indeterminate animation
    if (this.isNormal && Progress.clamp(this.props.progress) !== 0) {
      this.animateBar(0, this.props.progress);
    } else if (this.isIndeterminate && this.props.active) {
      this.startIndeterminate();
    }
  }

  shouldComponentUpdate(nextProps) {
    const modeChanged = nextProps.mode !== this.props.mode;

    warning(modeChanged, 'You should not change the mode of the progress bar!');

    return !modeChanged;
  }

  componentDidUpdate(prevProps) {
    const animOptions = {
      duration: this.context.theme.variables.defaultTransitionTime,
      fill: 'forwards',
    };

    if (this.isNormal && prevProps.progress !== this.props.progress) {
      this.animateBar(prevProps.progress, this.props.progress);
    }

    if (this.isIndeterminate && prevProps.active !== this.props.active) {
      if (!this.barAnimation && !this.indeterminateAnimation) {
        this.startIndeterminate();
      } else {
        this.bar.animate({ opacity: this.props.active ? [0, 1] : [1, 0] }, animOptions);
      }
    }
  }

  barAnimation = null;
  indeterminateAnimation = null;

  get theme() {
    return this.context.theme.progress;
  }

  /**
   * Check if the component is in normal mode.
   *
   * @returns {Boolean} - Returns whether the component is in the normal mode.
   */
  get isNormal() {
    return this.props.mode === 'normal';
  }

  /**
   * Check if the component is in indeterminate mode.
   *
   * @returns {Boolean} - Returns whether the component is in the indeterminate mode.
   */
  get isIndeterminate() {
    return this.props.mode === 'indeterminate';
  }

  /**
   * Compile the styles for the component.
   *
   * @returns {Object} - Returns the styles.
   */
  get styles() {
    return Stylesheet.compile({
      root: {
        display: 'block',
        position: 'relative',
        size: ['100%', this.theme.barHeight],
        backgroundColor: this.theme.bgColor,
        overflow: 'hidden',
        ...this.props.style,
      },

      bar: {
        position: ['absolute', 0],
        size: ['100%', this.theme.barHeight],
        backgroundColor: this.theme.barColor,
        transform: 'scaleX(0.5)',
        transformOrigin: this.isIndeterminate ? 'right center' : 'left center',
      },

      indeterminate: {
        backgroundColor: this.theme.backgroundColor,
        height: this.theme.barHeight,
        position: ['absolute', 0],
        transformOrigin: 'center center',
      },
    }, { variables: this.context.theme.variables });
  }

  /**
   * Animate the progress bar to the new value.
   *
   * @param {Number} prevProgress - The previous progress.
   * We need it to compute the animation duration.
   * @param {Number} progress - The progress to animate to.
   * @returns {Object} - Returns the animation object.
   */
  animateBar(prevProgress, progress) {
    // Get the current progress
    // We get it in a matrix form so we have to
    const transform = window.getComputedStyle(this.bar).transform;
    const clampNew = Progress.clamp(progress);
    const clampPrev = Progress.clamp(prevProgress);

    // Animate the bar
    this.bar.animate({
      transform: [
        transform,
        `matrix(${clampNew / 100}, 0, 0, 1, 0, 0)`,
      ],
    }, {
      fill: 'forwards',
      // Compute the duration based on the difference
      duration: Math.abs((clampNew - clampPrev) / 100) * 800,
      easing: easeInOutCubic,
    });
  }

  /**
   * Start the indeterminate animation.
   *
   * @returns {undefined} - Returns nothing.
   */
  startIndeterminate() {
    const animationOptions = {
      duration: 2 * 1000,
      iterations: Infinity,
    };

    this.barAnimation = this.bar.animate([{
      offset: 0,
      transform: 'scaleX(1) translateX(-100%)',
    }, {
      offset: 0.5,
      transform: 'scaleX(1) translateX(0%)',
    }, {
      offset: 0.75,
      transform: 'scaleX(1) translateX(0%)',
      easing: 'cubic-bezier(.28,.62,.37,.91)',
    }, {
      offset: 1,
      transform: 'scaleX(0) translateX(0%)',
    }], animationOptions);

    this.indeterminateAnimation = this.indeterminate.animate([{
      offset: 0,
      transform: 'scaleX(.75) translateX(-125%)',
    }, {
      offset: 0.3,
      transform: 'scaleX(.75) translateX(-125%)',
      easing: 'cubic-bezier(.42,0,.6,.8)',
    }, {
      offset: 0.9,
      transform: 'scaleX(.75) translateX(125%)',
    }, {
      offset: 1,
      transform: 'scaleX(.75) translateX(125%)',
    }], animationOptions);
  }

  render() {
    const styles = this.styles;
    const props = {};

    if (this.isNormal) {
      props['aria-valuenow'] = Progress.clamp(this.props.progress);
      props['aria-valuemin'] = 0;
      props['aria-valuemax'] = 100;
    }

    if (this.isIndeterminate) {
      props['data-active'] = this.props.active;
    }

    return (
      <span
        {...getNotDeclaredProps(this, Progress)}
        role="progressbar"
        data-mode={this.props.mode}
        className={`progress ${this.props.className}`}
        style={styles.root}
        {...props}
      >
        <span
          style={styles.bar}
          className="progress--bar"
          ref={(element) => { this.bar = element; }}
        />

        {this.isIndeterminate && (
          <span
            style={styles.indeterminate}
            className="progress--indeterminate"
            ref={(element) => { this.indeterminate = element; }}
          />
        )}
      </span>
    );
  }
}
