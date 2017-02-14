import React, {
  PureComponent,
  PropTypes,
} from 'react';
import Chance from 'chance';

import getNotDeclaredProps from 'utils/react/get-not-declared-props';
import Ripple from 'components/ripple';
import Label from 'components/label';
import Stylesheet from 'styles/stylesheet';
import Checkbox from './checkbox.jsx';

export default class CheckboxContainer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    noink: PropTypes.bool,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    name: '',
    defaultChecked: false,
    style: {},
    disabled: false,
    noink: false,
    labelPosition: 'right',
    children: '',
    onChange: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  static keyCodes = [32];

  state = { checked: this.props.defaultChecked };

  componentId = new Chance().string();

  get theme() {
    return this.context.theme.checkbox;
  }

  get rippleColors() {
    return {
      color: this.state.checked ? this.theme.checkedRippleColor : this.theme.uncheckedRippleColor,
      focusColor: this.props.defaultChecked
        ? this.theme.checkedRippleFocusColor
        : this.theme.uncheckedRippleFocusColor,
    };
  }

  get checked() {
    return this.state.checked;
  }

  set checked(checked) {
    this.setState({ checked });
  }

  get styles() {
    const { disabled } = this.props;

    return Stylesheet.compile({
      root: {
        layout: {
          direction: 'horizontal',
          inline: true,
          crossAlign: 'center',
          reverse: this.props.labelPosition === 'left',
        },
        pointerEvents: disabled && 'none',
        boxSizing: 'border-box',
        outline: 'none',
        border: 0,
        padding: this.theme.padding,
        height: this.theme.height + (this.theme.padding * 2),
        backgroundColor: 'inherit',
        ...this.props.style,
      },

      container: {
        size: this.theme.height,
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '50%',
        boxSizing: 'border-box',
        pointerEvents: disabled && 'none',
      },

      label: {
        cursor: !disabled && 'pointer',
        color: disabled ? this.theme.disabledLabelColor : this.theme.labelColor,
      },
    });
  }

  handleToggle = () => {
    this.setState(
      (prevState) => { return { checked: !prevState.checked }; },
      () => this.props.onChange(this.props.name, this.state.checked),
    );
  };

  handleKeyDown = (ev = {}) => {
    this.props.onKeyDown(ev);

    if (CheckboxContainer.keyCodes.includes(ev.keyCode) && !this.keyDown) {
      this.handleToggle();

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
    const { checked } = this.state;
    const styles = this.styles;

    return (
      <button
        {...getNotDeclaredProps(this)}
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled}
        role="checkbox"
        style={styles.root}
        id={this.componentId}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={(element) => { this.root = element; }}
      >
        <span
          onMouseDown={this.handleToggle}
          onTouchStart={this.handleToggle}
          style={styles.container}
        >
          <Checkbox
            checked={this.state.checked}
            disabled={this.props.disabled}
          />

          <Ripple
            round
            center
            nowaves={this.props.noink}
            ref={(element) => { this.ripple = element; }}
            {...this.rippleColors}
          />
        </span>

        <Label
          style={styles.label}
          for={this.componentId}
          onMouseDown={this.handleToggle}
          onTouchStart={this.handleToggle}
        >
          {this.props.children}
        </Label>
      </button>
    );
  }
}
