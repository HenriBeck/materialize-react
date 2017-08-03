import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';
import { easeInOutCubic } from '../../styles/timings';

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
   * @param {Object} theme.spinner - The actual theme for the spinner component.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles({ spinner: theme }) {
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
        width: theme.size,
        height: theme.size,
        padding: 8,
        boxSizing: 'border-box',
        opacity: 0,
        transition: `opacity ${theme.fadeInOutDuration / 2}ms ${easeInOutCubic}`,

        '&.spinner--active $container': { animationName: 'spinner--container-rotate' },

        '&.spinner--active $layer': { animationName: 'spinner--fill-unfill-rotate' },

        '&.spinner--active $clipperLeft::after': { animationName: 'spinner--left-spin' },

        '&.spinner--active $clipperRight::after': { animationName: 'spinner--right-spin' },
      },

      container: {
        composes: 'spinner--container',
        width: '100%',
        height: '100%',
        direction: 'ltr',
        animationDuration: `${theme.containerRotationDuration}ms`,
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
        animationDuration: theme.fullCycleDuration,
        borderColor: theme.color,

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
          borderWidth: theme.strokeWidth,
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
          borderWidth: theme.strokeWidth,
          animationDuration: theme.expandContractDuration,
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
  }

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
  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      if (this.props.active) {
        this.fadeIn();
      } else {
        this.fadeOut();
      }
    }
  }

  removeActiveClass = false;

  /**
   * Fade the spinner in.
   *
   * @private
   */
  fadeIn() {
    this.root.classList.add('spinner--active');

    this.root.style.opacity = 1;
  }

  /**
   * Fade the spinner out.
   *
   * @private
   */
  fadeOut() {
    this.removeActiveClass = true;

    this.root.style.opacity = 0;
  }

  /**
   * When the transition ends we need to check if we should handle the event
   * and remove the .spinner--active class.
   */
  handleTransitionEnd = () => {
    if (this.removeActiveClass) {
      this.removeActiveClass = false;

      this.root.classList.remove('spinner--active');
    }
  };

  render() {
    const {
      classes,
      className,
      ...props
    } = this.props;

    return (
      <div
        {...getNotDeclaredProps(props, Spinner)}
        role="presentation"
        className={`${classes.spinner} ${className}`}
        ref={(element) => { this.root = element; }}
        onTransitionEnd={this.handleTransitionEnd}
      >
        <div className={classes.container}>
          <div className={classes.layer}>
            <div className={`${classes.clipper} ${classes.clipperLeft}`} />
            <div className={`${classes.clipper} ${classes.clipperRight}`} />
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(Spinner.styles)(Spinner);
