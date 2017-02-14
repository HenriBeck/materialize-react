import React, {
  PropTypes,
  PureComponent,
} from 'react';

import Wave from './wave.jsx';
import getNotDeclaredProps from 'utils/react/get-not-declared-props';
import ElementRect from './element-rect';
import Stylesheet from 'styles/stylesheet';
import Event from 'utils/event';

export default class Ripple extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    round: PropTypes.bool,
    center: PropTypes.bool,
    initialOpacity: PropTypes.number,
    color: PropTypes.string,
    focusColor: PropTypes.string,
    focusOpacity: PropTypes.number,
    nowaves: PropTypes.bool,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    round: false,
    center: false,
    initialOpacity: 0.25,
    color: '',
    focusColor: null,
    focusOpacity: 0.2,
    nowaves: false,
    onMouseDown: () => {},
    onMouseUp: () => {},
    onTouchStart: () => {},
    onTouchEnd: () => {},
  };

  static MAX_RADIUS = 300;

  static focusAnimationOptions = {
    fill: 'forwards',
    duration: 140,
  };

  state = { waves: [] };

  componentDidMount() {
    const { zIndex } = window.getComputedStyle(this.root);

    this.root.style.zIndex = isNaN(parseInt(zIndex, 10)) ? 1 : parseInt(zIndex, 10) + 1;

    this.focus.style.backgroundColor = this.props.focusColor || this.focusColor;
  }

  wavesCount = 0;
  waves = {};
  isFocused = false;

  /**
   * Get the computed color of the root node.
   *
   * @returns {String} - Returns the color.
   */
  get color() {
    return window.getComputedStyle(this.root).color;
  }

  /**
   * Get the focus color. Either the color passed as a prop or the inherited color.
   *
   * @returns {String} - Returns the focus color.
   */
  get focusColor() {
    return this.props.focusColor || this.color;
  }

  /**
   * Set the current focus color and animate to it.
   *
   * @param {String} color - The new focus color.
   */
  set focusColor(color) {
    this.focus.animate({
      backgroundColor: [
        window.getComputedStyle(this.focus).backgroundColor,
        color,
      ],
    }, Ripple.focusAnimationOptions);
  }

  get styles() {
    const { round } = this.props;

    return Stylesheet.compile({
      root: {
        position: ['absolute', 0],
        display: 'block',
        borderRadius: 'inherit',
        overflow: 'hidden',
        cursor: 'pointer',
        zIndex: 'inherit',
        pointerEvents: this.props.nowaves ? 'none' : 'inherit',
        ...this.props.style,
      },

      focus: {
        position: ['absolute', 0],
        borderRadius: round ? '50%' : 'inherit',
        opacity: 0,
      },

      waveContainer: {
        position: ['absolute', 0, 'auto', 'auto', 0],
        size: '100%',
        pointerEvents: 'none',
        borderRadius: round ? '50%' : 'inherit',
        overflow: 'hidden',
      },
    });
  }

  downAction = (ev) => {
    this.addWave(ev);
  };

  upAction = () => {
    this.state.waves.forEach((wave) => {
      this.waves[wave.id].upAction();
    });
  };

  addWave(ev) {
    const containerRect = new ElementRect(this.root);
    const center = containerRect.center;
    const currentCords = new Event(ev).getCords();
    const isCentered = this.props.center || !currentCords;
    const startPosition = isCentered ? center : {
      x: currentCords.x - containerRect.boundingRect.left,
      y: currentCords.y - containerRect.boundingRect.top,
    };
    const distanceToCorner = isCentered
      ? (center.x ** 2 + center.y ** 2) ** 0.5
      : containerRect.distanceToFarthestCorner(startPosition);
    const radius = Math.min(distanceToCorner, Ripple.MAX_RADIUS);

    this.wavesCount += 1;

    const newWave = {
      id: this.wavesCount,
      radius,
      style: {
        height: radius * 2,
        width: radius * 2,
        left: startPosition.x - radius,
        top: startPosition.y - radius,
        backgroundColor: this.props.color || this.color,
      },
    };

    this.setState((state) => {
      return { waves: state.waves.concat([newWave]) };
    });
  }

  addFocus = () => {
    if (!this.isFocused) {
      const animation = { opacity: [0, this.props.focusOpacity] };

      if (this.props.round) {
        animation.transform = ['scale(0)', 'scale(1)'];
      }

      this.focus.animate(animation, Ripple.focusAnimationOptions);

      this.isFocused = true;
    }
  };

  removeFocus = () => {
    if (this.isFocused) {
      const animation = { opacity: [this.props.focusOpacity, 0] };

      if (this.props.round) {
        animation.transform = ['scale(1)', 'scale(0)'];
      }

      this.focus.animate(animation, Ripple.focusAnimationOptions);

      this.isFocused = false;
    }
  };

  handleRemoveWave = (waveId) => {
    this.setState(({ waves }) => {
      return { waves: waves.filter(wave => wave.id !== waveId) };
    });
  };

  handleMouseDown = (ev) => {
    this.props.onMouseDown(ev);

    this.downAction(ev);
  };

  handleMouseUp = (ev) => {
    this.props.onMouseUp(ev);

    this.upAction();
  };

  handleTouchStart = (ev) => {
    this.props.onTouchStart(ev);

    this.downAction(ev);
  };

  handleTouchEnd = (ev) => {
    this.props.onTouchEnd(ev);

    this.upAction();
  };

  renderWaves() {
    return this.state.waves.map(wave => (
      <Wave
        initialOpacity={this.props.initialOpacity}
        style={wave.style}
        radius={wave.radius}
        id={wave.id}
        onFinish={this.handleRemoveWave}
        key={wave.id}
        ref={(element) => { this.waves[wave.id] = element; }}
      />
    ));
  }

  render() {
    const styles = this.styles;

    return (
      <span
        {...getNotDeclaredProps(this)}
        ref={(element) => { this.root = element; }}
        style={styles.root}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        <span
          ref={(element) => { this.focus = element; }}
          style={styles.focus}
        />

        <span style={styles.waveContainer}>
          {this.renderWaves()}
        </span>
      </span>
    );
  }
}
