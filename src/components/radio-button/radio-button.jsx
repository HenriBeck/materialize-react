import React, {
  PureComponent,
  PropTypes,
} from 'react';
import Chance from 'chance';

import getNotDeclaredProps from 'utils/react/get-not-declared-props';
import Ripple from '../ripple';
import Stylesheet from 'styles/stylesheet';
import Label from '../label';

export default class RadioButton extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    noink: PropTypes.bool,
    defaultOn: PropTypes.bool,
    children: PropTypes.node,
    labelPosition: PropTypes.oneOf([
      'left',
      'right',
    ]),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
    defaultOn: false,
    labelPosition: 'right',
    children: '',
    style: {},
    onChange: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  state = { on: this.props.defaultOn };

  componentDidMount() {
    const { disabled } = this.props;

    this.ripple.focusColor = this.props.defaultOn ? this.theme.onColor : this.theme.offColor;

    this.circle.style.backgroundColor = disabled ? this.theme.disabledColor : this.theme.onColor;

    this.border.style.borderColor = this.color(this.props, this.state);

    if (this.props.defaultOn) {
      this.animateCircle();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const changedState = this.state.on !== prevState.on;
    const changedDisabled = this.props.disabled !== prevProps.disabled;
    const oldColor = this.color(prevProps, prevState);
    const newColor = this.color(this.props, this.state);

    if (changedState) {
      this.ripple.focusColor = this.state.on ? this.theme.onColor : this.theme.offColor;

      this.animateCircle();
    }

    if (oldColor !== newColor) {
      this.animateBorder(oldColor, newColor);
    }

    if (changedDisabled) {
      this.circle.style.backgroundColor = this.props.disabled
        ? this.theme.disabledColor
        : this.theme.onColor;
    }
  }

  id = new Chance().string();
  borderDiameter = this.theme.circleSize + 2 * (this.theme.borderDistance + this.theme.borderWidth);
  animationOptions = {
    duration: this.context.theme.variables.transitionTime,
    fill: 'forwards',
  };

  set on(state) {
    this.setState({ on: state });
  }

  get theme() {
    return this.context.theme.radioButton;
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        layout: {
          direction: 'horizontal',
          inline: true,
          crossAlign: 'center',
          reverse: this.props.labelPosition === 'left',
        },
        outline: 0,
        padding: this.theme.padding,
        backgroundColor: 'inherit',
        border: 0,
        ...this.props.style,
      },

      container: {
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        size: this.borderDiameter,
        margin: (this.theme.rippleSize - this.borderDiameter) / 2,
        borderRadius: '50%',
        zIndex: 1,
      },

      border: {
        position: ['absolute', 0],
        border: `${this.theme.borderWidth}px solid transparent`,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        borderRadius: '50%',
      },

      circle: {
        position: [
          'absolute',
          (this.borderDiameter - this.theme.circleSize) / 2,
          (this.borderDiameter - this.theme.circleSize) / 2,
          'auto',
          'auto',
        ],
        transform: 'scale(0)',
        size: this.theme.circleSize,
        borderRadius: '50%',
        backgroundColor: 'transparent',
      },

      ripple: {
        position: [
          'absolute',
          (this.theme.rippleSize - this.borderDiameter) / -2,
        ],
      },

      label: {
        typo: 'body1',
        userSelect: 'none',
        padding: this.theme.padding,
      },
    });
  }

  color(props, state) {
    const onPrefix = state.on ? 'on' : 'off';
    const prefix = props.disabled ? 'disabled' : onPrefix;

    return this.theme[`${prefix}Color`];
  }

  animateBorder(oldColor, newColor) {
    this.border.animate({
      borderColor: [
        oldColor,
        newColor,
      ],
    }, this.animationOptions);
  }

  animateCircle() {
    const transform = [
      'scale(0)',
      'scale(1)',
    ];

    this.circle.animate(
      { transform: this.state.on ? transform : transform.reverse() },
      this.animationOptions,
    );
  }

  focus = () => {
    this.ripple.addFocus();
  };

  blur = () => {
    this.ripple.removeFocus();
  };

  handleToggle = () => {
    if (!this.state.on) {
      this.setState((prevState) => {
        return { on: !prevState.on };
      }, () => this.props.onChange(this.props.name, this.state.on));
    }
  };

  render() {
    const { disabled } = this.props;
    const { on } = this.state;
    const styles = this.styles;

    return (
      <button
        {...getNotDeclaredProps(this)}
        role="radio"
        id={this.id}
        aria-checked={on}
        aria-disabled={disabled}
        style={styles.root}
      >
        <span
          className="radio-button--container"
          style={styles.container}
          onMouseDown={this.handleToggle}
          onTouchStart={this.handleToggle}
        >
          <Ripple
            round
            center
            className="radio-button--ripple"
            style={styles.ripple}
            nowaves={this.props.noink}
            ref={(element) => { this.ripple = element; }}
          />

          <span
            className="radio-button--circle"
            style={styles.circle}
            ref={(element) => { this.circle = element; }}
          />

          <span
            className="radio-button--border"
            style={styles.border}
            ref={(element) => { this.border = element; }}
          />
        </span>

        <Label
          for={this.id}
          className="radio-button--label"
          style={styles.label}
          onClick={this.handleToggle}
        >
          {this.props.children}
        </Label>
      </button>
    );
  }
}
