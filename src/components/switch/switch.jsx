import React, {
  PureComponent,
  PropTypes,
} from 'react';
import Chance from 'chance';

import getNotDeclaredProps from 'utils/react/get-not-declared-props';
import Ripple from '../ripple';
import Stylesheet from 'styles/stylesheet';
import { easeInOutQuad } from 'styles/timings';
import Label from '../label';

export default class Switch extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    defaultToggled: PropTypes.bool,
    disabled: PropTypes.bool,
    labelPosition: PropTypes.oneOf([
      'left',
      'right',
    ]),
    noink: PropTypes.bool,
    children: PropTypes.node,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    name: '',
    defaultToggled: false,
    disabled: false,
    labelPosition: 'right',
    noink: false,
    children: '',
    onChange: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  static keyCodes = [
    13,
    32,
  ];

  state = { toggled: this.props.defaultToggled };

  componentDidMount() {
    const colors = this.colors(this.props, this.state);

    this.thumb.style.backgroundColor = colors.thumbColor;
    this.track.style.backgroundColor = colors.trackColor;

    if (this.props.defaultToggled) {
      this.thumb.style.transform = `translateX(${this.theme.trackWidth - this.theme.thumbSize}px)`;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const newState = prevState.toggled !== this.state.toggled;

    if (newState) {
      this.ripple.focusColor = this.state.toggled
        ? this.theme.activeThumbColor
        : this.theme.inactiveThumbColor;
    }

    if (newState || prevProps.disabled !== this.props.disabled) {
      const prevColors = this.colors(prevProps, prevState);
      const newColors = this.colors(this.props, this.state);

      this.animateTrack(prevColors, newColors);

      this.animateThumb(prevColors, newColors, newState);
    }
  }

  id = new Chance().hash();
  keyDown = false;
  animationOptions = {
    fill: 'forwards',
    easing: easeInOutQuad,
    duration: this.context.theme.variables.transitionTime,
  };

  get theme() {
    return this.context.theme.switch;
  }

  colors(props, state) {
    const toggledPrefix = state.toggled ? 'active' : 'inactive';
    const prefix = props.disabled ? 'disabled' : toggledPrefix;

    return {
      thumbColor: this.theme[`${prefix}ThumbColor`],
      trackColor: this.theme[`${prefix}TrackColor`],
    };
  }

  get styles() {
    const { disabled } = this.props;

    return Stylesheet.compile({
      root: {
        layout: {
          direction: 'horizontal',
          reverse: this.props.labelPosition === 'left',
          inline: true,
          crossAlign: 'center',
        },
        outline: 0,
        border: 0,
        pointerEvents: disabled && 'none',
        backgroundColor: 'inherit',
      },

      container: {
        position: 'relative',
        display: 'inline-block',
        size: [this.theme.trackWidth, this.theme.thumbSize],
        margin: (this.theme.rippleSize - this.theme.thumbSize) / 2 + 6,
      },

      ripple: { position: ['absolute', (this.theme.rippleSize - this.theme.thumbSize) / -2] },

      thumb: {
        position: ['absolute', 0, 'auto', 'auto', 0],
        size: this.theme.thumbSize,
        borderRadius: '50%',
        zIndex: 1,
        boxShadow: '0 1px 5px 0 rgba(0, 0, 0, .6)',
        cursor: 'grab',
        willChange: 'background-color, transform',
      },

      track: {
        position: ['absolute', (this.theme.thumbSize - this.theme.trackHeight) / 2, 0],
        borderRadius: this.theme.trackHeight / 2,
        cursor: 'auto',
        pointerEvents: 'none',
        willChange: 'background-color',
      },

      label: {
        padding: '5px 0',
        cursor: 'pointer',
      },
    });
  }

  animateTrack({ trackColor: prevColor }, { trackColor: newColor }) {
    this.track.animate({
      backgroundColor: [
        prevColor,
        newColor,
      ],
    }, this.animationOptions);
  }

  animateThumb({ thumbColor: prevColor }, { thumbColor: newColor }, moveThumb) {
    const keyframes = {
      backgroundColor: [
        prevColor,
        newColor,
      ],
    };

    if (moveThumb) {
      const styles = [
        'translateX(0)',
        `translateX(${this.theme.trackWidth - this.theme.thumbSize}px)`,
      ];

      keyframes.transform = this.state.toggled ? styles : styles.reverse();
    }

    this.thumb.animate(keyframes, this.animationOptions);
  }

  toggle = () => {
    this.setState((prevState) => {
      return { toggled: !prevState.toggled };
    }, () => this.props.onChange(this.props.name, this.state.toggled));
  };

  handleClick = this.toggle;

  handleKeyDown = (ev) => {
    this.props.onKeyDown(ev);

    if (Switch.keyCodes.includes(ev.keyCode) && !this.keyDown) {
      this.toggle();

      this.keyDown = true;
    }
  };

  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.keyDown = false;
  };

  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.ripple.addFocus();
  };

  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.ripple.removeFocus();
  };

  render() {
    const { disabled } = this.props;
    const { toggled } = this.state;
    const styles = this.styles;

    return (
      <button
        {...getNotDeclaredProps(this, Switch)}
        aria-pressed={toggled}
        aria-disabled={disabled}
        id={this.id}
        tabIndex={disabled ? -1 : 0}
        style={styles.root}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span
          style={styles.container}
          className="switch--container"
        >
          <span
            style={styles.thumb}
            className="switch--thumb"
            ref={(element) => { this.thumb = element; }}
            onMouseDown={this.handleClick}
            onTouchStart={this.handleClick}
          >
            <Ripple
              round
              center
              style={styles.ripple}
              className="switch--ripple"
              nowaves={this.props.noink}
              color={this.state.toggled
                ? this.theme.activeRippleColor
                : this.theme.inactiveRippleColor}
              ref={(element) => { this.ripple = element; }}
            />
          </span>

          <span
            style={styles.track}
            className="switch--track"
            ref={(element) => { this.track = element; }}
          />
        </span>

        <Label
          style={styles.label}
          for={this.id}
          disabled={this.props.disabled}
          className="switch--label"
        >
          {this.props.children}
        </Label>
      </button>
    );
  }
}
