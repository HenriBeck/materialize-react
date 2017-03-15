import React, {
  PropTypes,
  PureComponent,
} from 'react';

import Wave from './wave';
import getNotDeclaredProps from '/src/utils/react/get-not-declared-props';
import ElementRect from './element-rect';
import Stylesheet from '/src/styles/stylesheet';
import Event from '/src/utils/event';

export default class Ripple extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
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
    className: '',
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

  static contextTypes = { theme: PropTypes.object };

  static MAX_RADIUS = 300;

  state = { waves: [] };

  componentDidMount() {
    const { zIndex } = window.getComputedStyle(this.root);

    this.root.style.zIndex = isNaN(parseInt(zIndex, 10)) ? 1 : parseInt(zIndex, 10) + 1;

    this.focus.style.backgroundColor = this.props.focusColor || this.focusColor;
  }

  wavesCount = 0;
  waves = {};
  isFocused = false;
  focusAnimationOptions = {
    fill: 'forwards',
    duration: this.context.theme.variables.transitionTime,
  };

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
    if (this.isFocused) {
      this.focus.animate({
        backgroundColor: [
          window.getComputedStyle(this.focus).backgroundColor,
          color,
        ],
      }, this.focusAnimationOptions);
    } else {
      this.focus.style.backgroundColor = color;
    }
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

  toggleFocus(options) {
    const animation = { opacity: [0, this.props.focusOpacity] };

    if (this.props.round) {
      animation.transform = ['scale(0)', 'scale(1)'];
    }

    this.focus.animate(animation, {
      ...this.focusAnimationOptions,
      ...options,
    });
  }

  addFocus = () => {
    if (!this.isFocused) {
      this.toggleFocus({});

      this.isFocused = true;
    }
  };

  removeFocus = () => {
    if (this.isFocused) {
      this.toggleFocus({ direction: 'reverse' });

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
        {...getNotDeclaredProps(this, Ripple)}
        className={`ripple ${this.props.className}`}
        style={styles.root}
        ref={(element) => { this.root = element; }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        <span
          className="ripple--focus"
          style={styles.focus}
          ref={(element) => { this.focus = element; }}
        />

        <span
          className="ripple--wave-container"
          style={styles.waveContainer}
        >
          {this.renderWaves()}
        </span>
      </span>
    );
  }
}
