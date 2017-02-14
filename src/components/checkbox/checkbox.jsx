import React, {
  PureComponent,
  PropTypes,
} from 'react';

import { easeInOutCubic } from 'styles/timings';
import Stylesheet from 'styles/stylesheet';

export default class Checkbox extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  static contextTypes = { theme: PropTypes.object };

  componentDidMount() {
    const { borderColor } = this.colors;

    this.lastBorderColor = borderColor;
    this.checkbox.style.borderColor = borderColor;

    if (this.props.disabled) {
      this.updateCheckmarkColor();
    }

    if (this.props.checked) {
      this.animateCheckmark();
    }

    if (this.props.checked || this.props.disabled) {
      this.animateCheckbox();
    }
  }

  componentDidUpdate(prevProps) {
    this.animateCheckbox();

    if (prevProps.disabled !== this.props.disabled) {
      this.updateCheckmarkColor();
    }

    if (prevProps.checked !== this.props.checked) {
      this.animateCheckmark();
    }
  }

  lastBgColor = 'transparent';
  lastBorderColor = null;
  animationOptions = {
    easing: easeInOutCubic,
    duration: this.context.theme.variables.defaultTransitionTime,
    fill: 'forwards',
  };

  get theme() {
    return this.context.theme.checkbox;
  }

  get colors() {
    const { checked } = this.props;

    if (this.props.disabled) {
      return {
        bgColor: checked
          ? this.theme.disabledCheckedBackgroundColor
          : this.theme.disabledBackgroundColor,
        borderColor: this.theme.disabledBorderColor,
      };
    }

    return {
      bgColor: checked ? this.theme.checkedBackgroundColor : this.theme.uncheckedBackgroundColor,
      borderColor: checked ? this.theme.checkedBorderColor : this.theme.uncheckedBorderColor,
    };
  }

  get styles() {
    return Stylesheet.compile({
      checkbox: {
        display: 'inline-block',
        position: 'relative',
        margin: (this.theme.height - this.theme.checkboxSize) / 2,
        size: this.theme.checkboxSize - this.theme.checkboxBorderWidth * 2,
        border: `solid ${this.theme.checkboxBorderWidth}px`,
        borderRadius: this.theme.checkboxBorderWidth,
        willChange: 'background-color, border-color',
      },

      checkmark: {
        size: ['36%', '70%'],
        position: ['absolute', 0],
        border: `${40 / 15}px solid`,
        borderTop: 0,
        borderLeft: 0,
        transformOrigin: '97% 86%',
        boxSizing: 'content-box',
        willChange: 'opacity, transform',
        borderColor: this.theme.checkmarkColor,
        opacity: 0,
      },
    });
  }

  updateCheckmarkColor() {
    this.checkmark.style.borderColor = this.props.disabled
      ? window.getComputedStyle(this.checkbox).backgroundColor
      : this.theme.checkmarkColor;
  }

  animateCheckmark() {
    const { checked } = this.props;
    const animations = { opacity: [1, checked ? 1 : 0] };

    if (checked) {
      animations.transform = ['scale(0, 0) rotate(-45deg)', 'scale(1, 1) rotate(45deg)'];
    }

    this.checkmark.animate(animations, this.animationOptions);
  }

  animateCheckbox() {
    const colors = this.colors;

    this.checkbox.animate({
      backgroundColor: [this.lastBgColor, colors.bgColor],
      borderColor: [this.lastBorderColor, colors.borderColor],
    }, this.animationOptions);

    this.lastBgColor = colors.bgColor;
    this.lastBorderColor = colors.borderColor;
  }

  render() {
    const styles = this.styles;

    return (
      <span
        style={styles.checkbox}
        ref={(element) => { this.checkbox = element; }}
      >
        <span
          style={styles.checkmark}
          ref={(element) => { this.checkmark = element; }}
        />
      </span>
    );
  }
}
