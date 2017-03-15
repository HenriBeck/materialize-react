import React, {
  PureComponent,
  PropTypes,
} from 'react';

import getNotDeclaredProps from '/src/utils/react/get-not-declared-props';
import Ripple from '../ripple';
import Icon from '../icon';
import Stylesheet from '/src/styles/stylesheet';
import { easeInOutCubic } from '/src/styles/timings';

export default class FAB extends PureComponent {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    noink: PropTypes.bool,
    disabled: PropTypes.bool,
    mini: PropTypes.bool,
    animateIn: PropTypes.bool,
    onPress: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    style: {},
    noink: false,
    disabled: false,
    mini: false,
    animateIn: false,
    onPress: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
    onTouchStart: () => {},
    onTouchEnd: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  static keyCodes = [13, 32];

  state = {
    pressed: false,
    focused: false,
  };

  componentDidMount() {
    if (this.props.animateIn) {
      this.animateIn();
    }
  }

  get theme() {
    return this.context.theme.fab;
  }

  get styles() {
    const {
      mini,
      disabled,
    } = this.props;
    const size = mini ? this.theme.miniSize : this.theme.normalSize;

    return Stylesheet.compile({
      root: {
        elevation: disabled ? this.theme.disabledElevation : this.theme.elevation,
        size,
        zIndex: 16,
        position: 'relative',
        boxSizing: 'border-box',
        padding: (size - this.theme.iconSize) / 2,
        backgroundColor: disabled ? this.theme.disabledBgColor : this.theme.bgColor,
        borderRadius: '50%',
        border: 0,
        outline: 'none',
        pointerEvents: disabled && 'none',
        color: this.theme.iconColor,
        ...this.props.style,
      },

      icon: {
        userSelect: 'none',
        size: 24,
        color: disabled ? this.theme.disabledIconColor : this.theme.iconColor,
      },

      shadow: {
        position: ['absolute', 0],
        borderRadius: 'inherit',
        elevation: this.theme.focusedElevation,
        opacity: this.state.pressed || this.state.focused ? 1 : 0,
        transition: `opacity ${this.context.theme.variables.transitionTime}ms linear`,
      },
    });
  }

  animateIn = () => {
    this.root.animate({
      transform: [
        'scale(0) rotate(-45deg)',
        'scale(1) rotate(0deg)',
      ],
    }, {
      duration: this.context.theme.variables.transitionTime * 2,
      easing: easeInOutCubic,
      fill: 'forwards',
    });
  };

  togglePress(stateUpdatedCallback = () => {}) {
    return () => this.setState(({ pressed }) => {
      return { pressed: !pressed };
    }, stateUpdatedCallback);
  }

  toggleFocus() {
    this.setState(({ focused }) => {
      return { focused: !focused };
    });
  }

  handlePress = this.togglePress(this.props.onPress);
  handleRelease = this.togglePress();

  handleKeyDown = (ev = {}) => {
    this.props.onKeyDown(ev);

    if (FAB.keyCodes.includes(ev.keyCode) && !this.state.pressed) {
      this.handlePress();
    }
  };

  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.handleRelease();
  };

  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.toggleFocus();
  };

  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.toggleFocus();
  };

  handleMouseDown = (ev) => {
    this.props.onMouseDown(ev);

    this.handlePress();
  };

  handleMouseUp = (ev) => {
    this.props.onMouseUp(ev);

    this.handleRelease();
  };

  handleTouchStart = (ev) => {
    this.props.onTouchStart(ev);

    this.handlePress();
  };

  handleTouchEnd = (ev) => {
    this.props.onTouchEnd(ev);

    this.handleRelease();
  };

  render() {
    const { disabled } = this.props;
    const styles = this.styles;

    return (
      <button
        {...getNotDeclaredProps(this, FAB)}
        className={`fab ${this.props.className}`}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        ref={(element) => { this.root = element; }}
        style={styles.root}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        <span
          className="fab--shadow"
          style={styles.shadow}
        />

        <Ripple
          round
          center
          className="fab--ripple"
          nowaves={this.props.noink}
          ref={(element) => { this.ripple = element; }}
        />

        <Icon
          className="fab--icon"
          icon={this.props.icon}
          disabled={disabled}
          style={styles.icon}
        />
      </button>
    );
  }
}
