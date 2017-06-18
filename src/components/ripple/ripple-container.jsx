import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import injectSheet from '../../styles/jss';
import Ripple from './ripple';
import {
  getCoords,
  getCenter,
  getDistanceToFarthestCorner,
} from './utils';

/**
 * The container for the ripple.
 *
 * @class
 * @extends PureComponent
 */
export class RippleContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isFocused: PropTypes.bool,
    focusOpacity: PropTypes.number,
    focusColor: PropTypes.string,
    initialOpacity: PropTypes.number,
    className: PropTypes.string,
    center: PropTypes.bool,
    color: PropTypes.string,
    round: PropTypes.bool,
    nowaves: PropTypes.bool,
    onMouseDown: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
  };

  static defaultProps = {
    isFocused: false,
    focusOpacity: 0.2,
    focusColor: '',
    initialOpacity: 0.25,
    className: '',
    center: false,
    color: '',
    round: false,
    nowaves: false,
    onMouseDown: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
    onTouchStart: () => {},
    onTouchEnd: () => {},
  };

  static MAX_RADIUS = 300;

  state = { waves: [] };

  wavesCount = 0;

  /**
   * Compute the inherited color of the root element.
   *
   * @private
   * @returns {String} - Returns the color.
   */
  get color() {
    return window.getComputedStyle(this.ripple.root).color;
  }

  /**
   * Create a new wave.
   *
   * @private
   * @param {Object} ev - The event the wave is created from.
   */
  addWave = (ev) => {
    const rect = this.ripple.root.getBoundingClientRect();
    const coords = getCoords(ev);
    const isCentered = this.props.center || !coords;
    const startPos = isCentered ? getCenter(rect) : {
      x: coords.x - rect.left,
      y: coords.y - rect.top,
    };
    const distanceToCorner = isCentered
      ? (startPos.x ** 2 + startPos.y ** 2) ** 0.5
      : getDistanceToFarthestCorner(startPos, rect);
    const radius = Math.min(distanceToCorner, RippleContainer.MAX_RADIUS);

    this.wavesCount += 1;

    const newWave = {
      id: this.wavesCount,
      radius,
      style: {
        height: radius * 2,
        width: radius * 2,
        left: startPos.x - radius,
        top: startPos.y - radius,
        backgroundColor: this.props.color || this.color,
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

  handleDownAction = this.addWave;

  /**
   * Remove the wave when the wave has faded out.
   *
   * @private
   * @param {Number} waveId - The id of the wave.
   */
  handleAnimationFinish = (waveId) => {
    this.removeWave(waveId);
  };

  render() {
    return (
      <Ripple
        focusOpacity={this.props.focusOpacity}
        isFocused={this.props.isFocused}
        focusColor={this.props.focusColor}
        initialOpacity={this.props.initialOpacity}
        waves={this.state.waves}
        className={this.props.className}
        round={this.props.round}
        nowaves={this.props.nowaves}
        onAnimationFinish={this.handleAnimationFinish}
        onDownAction={this.handleDownAction}
        onMouseDown={this.props.onMouseDown}
        onMouseLeave={this.props.onMouseLeave}
        onMouseUp={this.props.onMouseUp}
        onTouchStart={this.props.onTouchStart}
        onTouchEnd={this.props.onTouchEnd}
        classes={this.props.classes}
        ref={(element) => { this.ripple = element; }}
      />
    );
  }
}

const styles = {
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
    zIndex: 'inherit',
    pointerEvents: props => (props.nowaves ? 'none' : 'inherit'),
  },

  focus: {
    composes: 'ripple--focus',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: props => (props.round ? '50%' : 'inherit'),
    opacity: 0,
  },

  waveContainer: {
    composes: 'ripple--wave-container',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    borderRadius: props => (props.round ? '50%' : 'inherit'),
    overflow: 'hidden',
  },

  wave: {
    composes: 'ripple--wave',
    position: 'absolute',
    pointerEvents: 'none',
    opacity: props => props.initialOpacity,
    overflow: 'hidden',
    borderRadius: '50%',
    transform: 'scale(0)',
    willChange: 'opacity, transform',
    zIndex: 1,
    animationFillMode: 'forwards',
    transition: 'opacity 140ms linear',
  },
};

export default injectSheet(styles)(RippleContainer);
