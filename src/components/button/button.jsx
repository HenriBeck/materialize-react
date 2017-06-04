import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import injectSheet from '../../styles/jss';

import connectWithTheme from '../../styles/theme/connect-with-theme';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import Ripple from '../ripple';
import typo from '../../styles/plugins/typo';
import elevation from '../../styles/plugins/elevation';

export class Button extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
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

  static normalRippleProps = {
    color: '#999999',
    initialOpacity: 0.4,
  };

  static raisedRippleProps = {
    focusColor: '#000000',
    focusOpacity: 0.12,
  };

  static keyCodes = [13, 32];

  state = {
    pressed: false,
    isFocused: false,
  };

  keyDown = false;

  get rippleProps() {
    return this.props.raised ? Button.raisedRippleProps : Button.normalRippleProps;
  }

  handlePress = () => {
    if (this.props.raised) {
      this.setState({ pressed: true });
    }

    this.props.onPress();
  };

  handleRelease = () => {
    if (this.props.raised) {
      this.setState({ pressed: false });
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

    this.setState({ isFocused: true });
  };

  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ isFocused: false });
  };

  render() {
    const {
      disabled,
      classes,
    } = this.props;
    const className = classNames(
      classes.button,
      { [classes.buttonPressed]: this.state.pressed && !this.props.disabled },
      this.props.className,
    );

    return (
      <button
        {...getNotDeclaredProps(this, Button)}
        className={className}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Ripple
          className="button--ripple"
          isFocused={this.state.isFocused}
          nowaves={this.props.noink}
          {...this.rippleProps}
        />

        {this.props.children}
      </button>
    );
  }
}

const buttonTypo = typo('button');

const styles = {
  button: {
    ...buttonTypo,
    composes: 'button',
    userSelect: 'none',
    display: 'inline-block',
    position: 'relative',
    zIndex: 0,
    boxSizing: 'border-box',
    outline: 0,
    border: 0,
    borderRadius: 2,
    margin: '0 8px',
    cursor: props => (props.disabled ? 'auto' : 'pointer'),
    height: props => props.theme.height,
    minWidth: props => props.theme.minWidth,
    color: props => (props.disabled ? props.theme.disabledColor : props.theme.color),
    pointerEvents: props => (props.disabled ? 'none' : 'auto'),
    padding: props => `${(props.theme.height - buttonTypo.lineHeight) / 2}px 8px`,
    boxShadow(props) {
      return props.raised && !props.disabled ? elevation(props.theme.elevation) : 'none';
    },
    backgroundColor(props) {
      if (props.disabled) {
        return props.raised ? props.theme.raisedAndDisabledBgColor : props.theme.disabledBgColor;
      }

      return props.raised ? props.theme.raisedBgColor : props.theme.bgColor;
    },
  },

  buttonPressed: { boxShadow: props => elevation(props.theme.pressedElevation) },
};

export default connectWithTheme(injectSheet(styles)(Button), 'button');
