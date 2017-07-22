import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Ripple from './ripple';
import {
  getCoords,
  getCenter,
  getDistanceToFarthestCorner,
} from './utils';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * The container for the ripple.
 *
 * @class
 * @extends PureComponent
 */
export default class RippleContainer extends PureComponent {
  static propTypes = {
    isFocused: PropTypes.bool,
    focusOpacity: PropTypes.number,
    focusColor: PropTypes.string,
    initialOpacity: PropTypes.number,
    className: PropTypes.string,
    center: PropTypes.bool,
    color: PropTypes.string,
    round: PropTypes.bool,
    nowaves: PropTypes.bool,
    onMouseLeave: PropTypes.func,
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
    onMouseLeave: () => {},
  };

  static MAX_RADIUS = 300;

  state = { waves: [] };

  wavesCount = 0;

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
   * So we get a reference to the root component that we render for some computations.
   *
   * @param {Object} element - The element reference.
   */
  createRef = (element) => {
    this.ripple = element;
  };

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
    const {
      focusOpacity,
      isFocused,
      focusColor,
      initialOpacity,
      color,
      className,
      round,
      nowaves,
      onMouseLeave,
      ...props
    } = this.props;

    return (
      <Ripple
        {...getNotDeclaredProps(props, RippleContainer)}
        focusOpacity={focusOpacity}
        isFocused={isFocused}
        focusColor={focusColor}
        initialOpacity={initialOpacity}
        color={color}
        waves={this.state.waves}
        className={className}
        round={round}
        nowaves={nowaves}
        createRef={this.createRef}
        onAnimationFinish={this.handleAnimationFinish}
        onDownAction={this.handleDownAction}
        onMouseLeave={onMouseLeave}
      />
    );
  }
}
