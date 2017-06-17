import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import { easeInOutCubic } from '../../styles/timings';
import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';

/**
 * A material design spinner.
 *
 * @class
 * @extends PureComponent
 */
export class Spinner extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    active: false,
    style: {},
    className: '',
  };

  /**
   * Fade the spinner in if the active prop is passed.
   */
  componentDidMount() {
    if (this.props.active) {
      this.root.classList.add('active');

      this.fadeIn();
    }
  }

  /**
   * Fade the spinner in/out when the active prop changes.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      if (this.props.active) {
        this.fadeIn();
      } else {
        this.fadeOut();
      }
    }
  }

  animationOptions = {
    duration: this.props.theme.expandContractDuration / 2,
    easing: easeInOutCubic,
    fill: 'forwards',
  };

  /**
   * Fade the spinner in.
   *
   * @private
   */
  fadeIn() {
    this.root.classList.add('active');

    this.root.animate({ opacity: [0, 1] }, this.animationOptions);
  }

  /**
   * Fade the spinner out.
   *
   * @private
   */
  fadeOut() {
    this.anim = this.root.animate({ opacity: [1, 0] }, this.animationOptions);

    this.anim.onfinish = () => this.root.classList.remove('active');
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        {...getNotDeclaredProps(this, Spinner)}
        className={`${classes.spinner} ${this.props.className}`}
        ref={(element) => { this.root = element; }}
      >
        <div
          className={classes.container}
          ref={(element) => { this.container = element; }}
        >
          <div className={classes.layer}>
            <div className={`${classes.clipper} ${classes.clipperLeft}`} />
            <div className={`${classes.clipper} ${classes.clipperRight}`} />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
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
    width: props => props.theme.size,
    height: props => props.theme.size,
    padding: 8,
    boxSizing: 'border-box',

    '&.active $container': { animationName: 'spinner--container-rotate' },

    '&.active $layer': { animationName: 'spinner--fill-unfill-rotate' },

    '&.active $clipperLeft::after': { animationName: 'spinner--left-spin' },

    '&.active $clipperRight::after': { animationName: 'spinner--right-spin' },
  },

  container: {
    composes: 'spinner--container',
    width: '100%',
    height: '100%',
    direction: 'ltr',
    animationDuration: props => `${props.theme.containerRotationDuration}ms`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },

  layer: {
    composes: 'spinner--layer',
    position: 'absolute',
    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
    animationTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    animationIterationCount: 'infinite',
    animationDuration: props => props.theme.fullCycleDuration,
    borderColor: props => props.theme.color,

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
      borderWidth: props => props.theme.strokeWidth,
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
      borderWidth: props => props.theme.strokeWidth,
      animationDuration: props => props.theme.expandContractDuration,
    },
  },

  clipperLeft: {
    composes: 'left',

    '&::after': {
      left: 0,
      borderRightColor: 'transparent',
      transform: 'rotate(129deg)',
    },
  },

  clipperRight: {
    composes: 'right',

    '&::after': {
      left: '-100%',
      borderLeftColor: 'transparent',
      transform: 'rotate(-129deg)',
    },
  },
};

export default connectWithTheme(injectSheet(styles)(Spinner), 'spinner');
