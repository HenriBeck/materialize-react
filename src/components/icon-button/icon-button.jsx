import React, {
  PureComponent,
  PropTypes,
} from 'react';

import Ripple from '../ripple';
import Icon from '../icon';
import getNotDeclaredProps from 'utils/react/get-not-declared-props';
import Stylesheet from 'styles/stylesheet';

export default class IconButton extends PureComponent {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    onPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onMouseDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
    style: {},
    className: '',
    onPress: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onTouchStart: () => {},
    onMouseDown: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  static keyCodes = [13, 32];

  keyDown = false;

  get theme() {
    return this.context.theme.iconButton;
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        position: 'relative',
        size: this.theme.size,
        margin: this.theme.margin,
        backgroundColor: 'inherit',
        borderRadius: '50%',
        outline: 0,
        border: 0,
        pointerEvents: this.props.disabled && 'none',
        padding: (this.theme.size - this.theme.iconSize) / 2,
        ...this.props.style,
      },

      icon: {
        fontSize: this.theme.iconSize,
        display: 'inline-flex',
      },
    });
  }

  handleKeyDown = (ev) => {
    this.props.onKeyDown(ev);

    if (IconButton.keyCodes.includes(ev.keyCode) && !this.keyDown) {
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

    this.props.onPress();
  };

  handleTouchStart = (ev) => {
    this.props.onTouchStart(ev);

    this.props.onPress();
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
    const styles = this.styles;

    return (
      <button
        {...getNotDeclaredProps(this)}
        className={`icon-button ${this.props.className}`}
        style={styles.root}
        aria-disabled={disabled}
        tabIndex={this.props.disabled ? -1 : 0}
        onTouchStart={this.handleTouchStart}
        onMouseDown={this.handleMouseDown}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Ripple
          round
          center
          className="icon-button--ripple"
          color={this.context.theme.icon.color}
          focusColor={this.context.theme.icon.color}
          focusOpacity={0.12}
          nowaves={this.props.noink}
          ref={(element) => { this.ripple = element; }}
        />

        <Icon
          className="icon-button--icon"
          icon={this.props.icon}
          disabled={disabled}
          style={styles.icon}
        />
      </button>
    );
  }
}
