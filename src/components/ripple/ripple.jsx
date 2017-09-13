import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import EventHandler from '../event-handler';
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

    round: { borderRadius: '50%' },

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
    },
  };

  state = { waves: [] };

  wavesCount = 0;
  waves = {};

  /**
   * Create a new wave.
   *
   * @private
   * @param {Object} ev - The event the wave is created from.
   */
  addWave = (ev) => {
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
      radius,
      style: {
        height: radius * 2,
        width: radius * 2,
        left: startPos.x - radius,
        top: startPos.y - radius,
        opacity: this.props.initialOpacity,
        backgroundColor: this.props.color,
      },
    };

    this.setState(({ waves }) => {
      return { waves: waves.concat([newWave]) };
    });
  };

  /**
   * Remove a wave when the wave is animated out.
   *
   * @private
   * @param {Number} waveId - The id of the wave.
   */
  removeWave(waveId) {
    this.setState(({ waves }) => {
      return { waves: waves.filter(wave => wave.id !== waveId) };
    });
  }

  /**
   * Emit an event to all of the current active ripples.
   *
   * @private
   */
  emitUpAction() {
    this.state.waves.forEach((wave) => {
      this.waves[wave.id].startFadeOutAnimation();
    });
  }

  /**
   * Create a reference to the root element.
   *
   * @param {Object} element - The root element reference.
   */
  createRef = (element) => {
    this.ripple = element;
  };

  handlePress = ev => this.addWave(ev);

  /**
   * Emit up actions to all of the waves when the user removes the finger.
   *
   * @private
   */
  handleRelease = () => this.emitUpAction();

  handleOnFinishAnimation = id => this.removeWave(id);

  /**
   * Emit up actions to all of the waves when the user moves the mouse away from the ripple.
   * This solves a bug where you click the ripple and move the mouse while still pressed down
   * and then release the mouse. This won't remove the ripple so we remove them when to user
   * moves the mouse away.
   *
   * @private
   */
  handleMouseLeave = () => this.emitUpAction();

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
        ref={(element) => { this.waves[wave.id] = element; }}
        onFinish={this.handleOnFinishAnimation}
        {...wave}
      />
    ));
  }

  render() {
    const {
      classes,
      nowaves,
      isFocused,
      focusOpacity,
      focusColor,
      className,
      round,
      ...props
    } = this.props;
    const classNames = classnames(className, classes.ripple, { [classes.noWaves]: nowaves });

    return (
      <EventHandler
        {...getNotDeclaredProps(props, Ripple)}
        component="span"
        role="presentation"
        className={classNames}
        createRef={this.createRef}
        onPress={this.handlePress}
        onRelease={this.handleRelease}
        onMouseLeave={this.handleMouseLeave}
      >
        <span
          className={`${classes.focus} ${round ? classes.round : ''}`}
          style={{
            backgroundColor: focusColor,
            opacity: isFocused ? focusOpacity : 0,
          }}
        />

        <span className={`${classes.waveContainer} ${round ? classes.round : ''}`}>
          {this.renderWaves()}
        </span>
      </EventHandler>
    );
  }
}

export default injectSheet(Ripple.styles)(Ripple);
