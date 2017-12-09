import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

import Wave from './wave';
import {
  getCoords,
  getCenter,
  getDistanceToFarthestCorner,
} from './utils';

/**
 * The presentation container for the ripple.
 *
 * @private
 * @class
 * @extends PureComponent
 */
export class Ripple extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      ripple: PropTypes.string.isRequired,
      focus: PropTypes.string.isRequired,
      waveContainer: PropTypes.string.isRequired,
      wave: PropTypes.string.isRequired,
      round: PropTypes.string.isRequired,
      noWaves: PropTypes.string.isRequired,
    }).isRequired,
    isFocused: PropTypes.bool,
    focusOpacity: PropTypes.number,
    focusColor: PropTypes.string,
    initialOpacity: PropTypes.number,
    className: PropTypes.string,
    center: PropTypes.bool,
    color: PropTypes.string,
    round: PropTypes.bool,
    nowaves: PropTypes.bool,
  };

  static defaultProps = {
    isFocused: false,
    focusOpacity: 0.2,
    focusColor: 'currentColor',
    initialOpacity: 0.25,
    className: '',
    center: false,
    color: 'currentColor',
    round: false,
    nowaves: false,
  };

  // Measured in pixels
  static MAX_RADIUS = 300;

  static styles = {
    '@keyframes ripple--scale-in': {
      from: { transform: 'scale(0)' },
      to: { transform: 'scale(1)' },
    },

    ripple: {
      composes: 'ripple',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'block',
      borderRadius: 'inherit',
      overflow: 'hidden',
      cursor: 'pointer',
    },

    noWaves: {
      composes: 'ripple--no-waves',
      pointerEvents: 'none',
    },

    focus: {
      composes: 'ripple--focus',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transitionProperty: 'background-color, opacity, transform',
      transition: '140ms linear',
    },

    waveContainer: {
      composes: 'ripple--wave-container',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      overflow: 'hidden',
    },

    round: {
      composes: 'ripple--round',
      borderRadius: '50%',
    },

    wave: {
      composes: 'ripple--wave',
      position: 'absolute',
      pointerEvents: 'none',
      overflow: 'hidden',
      borderRadius: '50%',
      transform: 'scale(0)',
      willChange: 'opacity, transform',
      animationFillMode: 'forwards',
      transition: 'opacity 140ms linear',
      animationName: 'ripple--scale-in',
    },
  };

  state = { waves: [] };

  wavesCount = 0;

  ignoreNextEvent = false;

  /**
   * Add a wave when the user pressed the ripple.
   */
  handlePress = (ev) => {
    if (ev.type === 'mousedown' && ev.button !== 0) {
      return;
    }

    if (this.ignoreNextEvent && ev.type === 'mousedown') {
      this.ignoreNextEvent = false;

      return;
    }

    if (ev.type === 'touchstart') {
      this.ignoreNextEvent = true;
    }

    const rect = this.ripple.getBoundingClientRect();
    const coords = getCoords(ev);
    const isCentered = this.props.center || !coords;
    const startPos = isCentered ? getCenter(rect) : {
      x: coords.x - rect.left,
      y: coords.y - rect.top,
    };
    const distanceToCorner = isCentered
      ? (startPos.x ** 2 + startPos.y ** 2) ** 0.5
      : getDistanceToFarthestCorner(startPos, rect);
    const radius = Math.min(distanceToCorner, Ripple.MAX_RADIUS);

    this.wavesCount += 1;

    const newWave = {
      id: this.wavesCount,
      animatingOut: false,
      style: {
        height: radius * 2,
        width: radius * 2,
        left: startPos.x - radius,
        top: startPos.y - radius,
        animationDuration: `${140 + radius * 0.11}ms`,
        opacity: this.props.initialOpacity,
        backgroundColor: this.props.color,
      },
    };

    this.setState(({ waves }) => {
      return { waves: waves.concat([newWave]) };
    });
  };

  /**
   * Emit up actions to all of the waves when the user removes the finger.
   *
   * @private
   */
  handleRelease = () => {
    this.setState(({ waves }) => {
      return { waves: waves.map(wave => Object.assign(wave, { animatingOut: true })) };
    });
  };

  /**
   * When the fade out animation finishes for a ripple, we remove the ripple from the queue.
   */
  handleAnimationFinish = (id) => {
    this.setState(({ waves }) => {
      return { waves: waves.filter(wave => wave.id !== id) };
    });
  };

  /**
   * Render the waves with all of the required props.
   *
   * @private
   * @returns {JSX[]} - Returns the waves as an array.
   */
  renderWaves() {
    return this.state.waves.map(wave => (
      <Wave
        key={wave.id}
        className={this.props.classes.wave}
        onFinish={this.handleAnimationFinish}
        {...wave}
      />
    ));
  }

  render() {
    return (
      <span
        {...getNotDeclaredProps(this.props, Ripple)}
        role="presentation"
        className={classnames(
          this.props.className,
          this.props.classes.ripple,
          { [this.props.classes.noWaves]: this.props.nowaves },
        )}
        ref={(element) => { this.ripple = element; }}
        onMouseUp={this.handleRelease}
        onMouseDown={this.handlePress}
        onMouseLeave={this.handleRelease}
        onTouchEnd={this.handleRelease}
        onTouchStart={this.handlePress}
      >
        <span
          className={classnames(
            this.props.classes.focus,
            { [this.props.classes.round]: this.props.round },
          )}
          style={{
            backgroundColor: this.props.focusColor,
            opacity: this.props.isFocused ? this.props.focusOpacity : 0,
          }}
        />

        <span
          className={classnames(
            this.props.classes.waveContainer,
            { [this.props.classes.round]: this.props.round },
          )}
        >
          {this.renderWaves()}
        </span>
      </span>
    );
  }
}

export default injectSheet(Ripple.styles)(Ripple);
