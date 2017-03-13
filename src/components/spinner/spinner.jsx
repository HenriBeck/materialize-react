import React, {
  PureComponent,
  PropTypes,
} from 'react';

import getNotDeclaredProps from 'utils/react/get-not-declared-props';
import Stylesheet from 'styles/stylesheet';
import { easeInOutCubic } from 'styles/timings';

/**
 * A spinner that follows the material guidelines.
 */
export default class Spinner extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    active: false,
    style: {},
    className: '',
  };

  static contextTypes = { theme: PropTypes.object };

  componentDidMount() {
    this.setupAnimations();

    if (this.props.active) {
      this.fadeIn();
    } else {
      this.fadeOut();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      if (this.props.active) {
        this.fadeIn();
      } else {
        this.fadeOut();
      }
    }
  }

  get theme() {
    return this.context.theme.spinner;
  }

  setupAnimations() {
    const {
      radius,
      arctime,
      arcsize,
      arcStartRotate,
    } = this.theme;

    this.container.animate({
      transform: [
        'rotate(0deg)',
        'rotate(360deg)',
      ],
    }, {
      duration: 360 * arctime / (arcStartRotate + 360 - arcsize),
      iterations: Infinity,
    });

    this.spinner.animate({
      strokeDashoffset: [
        2 * radius * Math.PI * arcsize / 360 - 0.1,
        0,
        -(2 * radius * Math.PI * arcsize / 360 - 0.5),
      ],
    }, {
      iterations: Infinity,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      fill: 'forwards',
      duration: arctime,
    });

    this.spinner.animate({
      transform: [
        'rotate(0deg)',
        'rotate(-360deg)',
      ],
    }, {
      iterations: Infinity,
      fill: 'forwards',
      duration: arctime * 4,
      easing: 'steps(4)',
    });
  }

  get styles() {
    const arrayAndOffset = 2 * this.theme.radius * Math.PI * this.theme.arcsize / 360;

    return Stylesheet.compile({
      root: {
        size: 64,
        display: 'inline-block',
        position: 'relative',
        margin: 8,
        opacity: 0,
        padding: 8,
        boxSizing: 'border-box',
        ...this.props.style,
      },

      container: {
        strokeWidth: this.theme.strokeWidth,
        transformOrigin: '50% 50%',
        size: 64,
      },

      spinner: {
        strokeDasharray: arrayAndOffset,
        strokeDashoffset: arrayAndOffset,
        transformOrigin: '50% 50%',
        stroke: this.theme.color,
      },
    });
  }

  fadeIn() {
    this.root.animate({ opacity: [0, 1] }, {
      duration: this.theme.arctime / 2,
      easing: easeInOutCubic,
      fill: 'forwards',
    });
  }

  fadeOut() {
    this.root.animate({ opacity: [1, 0] }, {
      duration: this.theme.arctime / 2,
      easing: easeInOutCubic,
      fill: 'forwards',
    });
  }

  render() {
    const styles = this.styles;
    const {
      radius,
      strokeWidth,
    } = this.theme;

    return (
      <div
        {...getNotDeclaredProps(this, Spinner)}
        className={`spinner ${this.props.className}`}
        style={styles.root}
        ref={(element) => { this.root = element; }}
      >
        <svg
          width="48px"
          height="48px"
          viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}
          className="spinner--svg"
        >
          <g
            style={styles.container}
            className="spinner--container"
            ref={(element) => { this.container = element; }}
          >
            <path
              fill="none"
              d="M 14,1.5 A 12.5,12.5 0 1 1 1.5,14"
              strokeLinecap="round"
              style={styles.spinner}
              className="spinner--spinner"
              ref={(element) => { this.spinner = element; }}
            />
          </g>
        </svg>
      </div>
    );
  }
}
