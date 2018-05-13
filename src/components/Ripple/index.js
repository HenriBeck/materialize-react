// @flow strict

import React, { type Node } from 'react';
import noop from 'lodash.noop';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';
import getCoords from '../../utils/get-coords';

import Wave from './Wave';
import {
  getCenter,
  getDistanceToFarthestCorner,
} from './utils';

type Event = SyntheticMouseEvent<HTMLDivElement> | SyntheticTouchEvent<HTMLDivElement>;
type Props = {
  isFocused: boolean,
  focusOpacity: number,
  focusColor: string,
  initialOpacity: number,
  className: string,
  center: boolean,
  color: string,
  round: boolean,
  nowaves: boolean,
  onPress: (ev: Event) => void,
};
type State = {
  waves: $ReadOnlyArray<{
    id: number,
    animatingOut: boolean,
    radius: number,
    startPosX: number,
    startPosY: number,
  }>,
};
type Data = {
  round: boolean,
  focusColor: string,
  isFocused: boolean,
  focusOpacity: number,
};

const Sheet = createSheet('Ripple', {
  ripple: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'block',
    overflow: 'hidden',
    cursor: 'pointer',
    borderRadius: (data: Data) => (data.round ? '50%' : 'inherit'),
  },

  focus: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: 'opacity 140ms linear',
    borderRadius: 'inherit',
    backgroundColor: (data: Data) => data.focusColor,
    opacity: (data: Data) => (data.isFocused ? data.focusOpacity : 0),
  },

  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    overflow: 'hidden',
    borderRadius: 'inherit',
  },
});

export default class Ripple extends React.PureComponent<Props, State> {
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
    onPress: PropTypes.func,
  };

  static defaultProps = {
    isFocused: false,
    focusOpacity: 0.12,
    focusColor: 'currentColor',
    initialOpacity: 0.2,
    className: '',
    center: false,
    color: 'currentColor',
    round: false,
    nowaves: false,
    onPress: noop,
  };

  // Measured in pixels
  static MAX_RADIUS = 300;

  state = { waves: [] };

  wavesCount = 0;

  ignoreNextEvent = false;

  ripple = React.createRef();

  handlePress = (ev: Event) => {
    ev.preventDefault();

    if (ev.type === 'mousedown' && (ev.button !== 0 || this.ignoreNextEvent)) {
      this.ignoreNextEvent = false;

      return;
    }

    if (ev.type === 'touchstart') {
      this.ignoreNextEvent = true;
    }

    this.props.onPress(ev);

    if (this.props.nowaves || !this.ripple.current) {
      return;
    }

    const rect = this.ripple.current.getBoundingClientRect();
    const coords = getCoords(ev);
    const startPos = coords === null || this.props.center ? getCenter(rect) : {
      x: coords.x - rect.left,
      y: coords.y - rect.top,
    };
    const distanceToCorner = this.props.center || coords === null
      ? (startPos.x ** 2 + startPos.y ** 2) ** 0.5
      : getDistanceToFarthestCorner(startPos, rect);
    const radius = Math.min(distanceToCorner, Ripple.MAX_RADIUS);

    this.wavesCount += 1;

    const wave = {
      id: this.wavesCount,
      animatingOut: false,
      radius,
      startPosX: startPos.x,
      startPosY: startPos.y,
    };

    this.setState(({ waves }: State): State => {
      return { waves: [...waves, wave] };
    });
  };

  handleRelease = () => {
    this.setState(({ waves }: State): State | null => {
      if (waves.length === 0) {
        return null;
      }

      return { waves: waves.map(wave => Object.assign({}, wave, { animatingOut: true })) };
    });
  };

  handleTransitionEnd = (ev: SyntheticTransitionEvent<HTMLSpanElement>) => {
    const id = parseInt(ev.currentTarget.id, 10);

    this.setState(({ waves }: State): State => {
      return { waves: waves.filter(wave => wave.id !== id) };
    });
  };

  renderWaves(): Node {
    return this.state.waves.map(wave => (
      <Wave
        key={wave.id}
        color={this.props.color}
        initialOpacity={this.props.initialOpacity}
        onTransitionEnd={this.handleTransitionEnd}
        {...wave}
      />
    ));
  }

  render() {
    const data: Data = {
      round: this.props.round,
      isFocused: this.props.isFocused,
      focusColor: this.props.focusColor,
      focusOpacity: this.props.focusOpacity,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span
            {...getNotDeclaredProps(this.props, Ripple)}
            role="presentation"
            className={`ripple ${classes.ripple} ${this.props.className}`}
            ref={this.ripple}
            onMouseUp={this.handleRelease}
            onMouseDown={this.handlePress}
            onMouseLeave={this.handleRelease}
            onTouchEnd={this.handleRelease}
            onTouchStart={this.handlePress}
          >
            <span className={classes.focus} />

            <span className={classes.waveContainer}>
              {this.renderWaves()}
            </span>
          </span>
        )}
      </Sheet>
    );
  }
}

