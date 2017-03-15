import React, {
  PureComponent,
  PropTypes,
} from 'react';

import getNotDeclaredProps from '/src/utils/react/get-not-declared-props';
import Stylesheet from '/src/styles/stylesheet';
import Ripple from '../ripple';

export default class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    raised: PropTypes.bool,
    noink: PropTypes.bool,
    className: PropTypes.string,
    onPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    disabled: false,
    raised: false,
    noink: false,
    className: '',
    style: {},
    onPress: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onTouchStart: () => {},
    onTouchEnd: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  static normalRippleProps = {
    color: '#999999',
    initialOpacity: 0.4,
  };

  static raisedRippleProps = {
    focusColor: '#000000',
    focusOpacity: 0.12,
  };

  static keyCodes = [13, 32];

  state = { pressed: false };

  keyDown = false;

  get theme() {
    return this.context.theme.button;
  }

  get elevation() {
    if (this.props.raised && !this.props.disabled) {
      return this.state.pressed ? this.theme.pressedElevation : this.theme.elevation;
    }

    return 0;
  }

  get backgroundColor() {
    if (this.props.disabled) {
      return this.props.raised ? this.theme.raisedAndDisabledBgColor : this.theme.disabledBgColor;
    }

    return this.props.raised ? this.theme.raisedBgColor : this.theme.bgColor;
  }

  get styles() {
    const { disabled } = this.props;

    return Stylesheet.compile({
      typo: this.theme.typo,
      userSelect: 'none',
      elevation: this.elevation,
      display: 'inline-block',
      position: 'relative',
      backgroundColor: this.backgroundColor,
      cursor: disabled ? 'auto' : 'pointer',
      zIndex: 0,
      boxSizing: 'border-box',
      outline: 0,
      border: 0,
      borderRadius: 2,
      height: this.theme.height,
      minWidth: this.theme.minWidth,
      margin: '0 8px',
      color: disabled ? this.theme.disabledColor : this.theme.color,
      pointerEvents: disabled ? 'none' : 'auto',
      padding(styles) {
        return `${(styles.height - styles.lineHeight * styles.fontSize) / 2}px 8px`;
      },
      ...this.props.style,
    });
  }

  get rippleProps() {
    return this.props.raised ? Button.raisedRippleProps : Button.normalRippleProps;
  }

  toggleState(updatedStateCallback = () => {}) {
    this.setState(({ pressed }) => {
      return { pressed: !pressed };
    }, updatedStateCallback);
  }

  handlePress = () => {
    if (this.props.raised) {
      this.toggleState(this.props.onPress);
    } else {
      this.props.onPress();
    }
  };

  handleRelease = () => {
    if (this.props.raised) {
      this.toggleState();
    }
  };

  handleKeyDown = (ev = {}) => {
    this.props.onKeyDown(ev);

    if (Button.keyCodes.includes(ev.keyCode) && !this.keyDown) {
      this.keyDown = true;

      this.props.onPress();
    }
  };

  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.keyDown = false;
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

  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.ripple.addFocus(ev);
  };

  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.ripple.removeFocus(ev);
  };

  render() {
    const { disabled } = this.props;

    return (
      <button
        {...getNotDeclaredProps(this, Button)}
        className={`button ${this.props.className}`}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        style={this.styles}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={(element) => { this.root = element; }}
      >
        <Ripple
          className="button--ripple"
          ref={(element) => { this.ripple = element; }}
          nowaves={this.props.noink}
          {...this.rippleProps}
        />

        {this.props.children}
      </button>
    );
  }
}
