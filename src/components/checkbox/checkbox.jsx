import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import { easeInOutCubic } from '../../styles/timings';
import Label from '../label';
import Ripple from '../ripple';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import EventHandler from '../event-handler';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * The actual visual component of the checkbox.
 *
 * @private
 * @class
 * @extends PureComponent
 */
export class Checkbox extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    labelPosition: PropTypes.string.isRequired,
  };

  /**
   * Set the border color of the checkmark to the background-color from the root element.
   * If the checked props is initially true we want to animate the checkmark in.
   */
  componentDidMount() {
    const bgColor = window.getComputedStyle(this.root)['background-color'];

    this.checkmark.style.borderColor = bgColor;

    if (this.props.checked) {
      this.animateCheckmark();
    }
  }

  /**
   * Animate the checkmark when the checked prop changes.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.animateCheckmark();
    }
  }

  /**
   * Compute the color for the ripple and the focusColor based on the props.
   *
   * @returns {{ color: String, focusColor: String }} - Returns an object with the colors.
   */
  getRippleProps() {
    const {
      theme,
      checked,
    } = this.props;

    return {
      color: checked ? theme.checkedBorderColor : theme.uncheckedBorderColor,
      focusColor: checked ? theme.checkedBorderColor : theme.uncheckedBorderColor,
    };
  }

  /**
   * Animate the checkmark either in or out.
   */
  animateCheckmark() {
    const animations = this.props.checked ? {
      opacity: [1, 1],
      transform: ['scale(0, 0) rotate(-45deg)', 'scale(1, 1) rotate(45deg)'],
    } : { opacity: [1, 0] };

    this.checkmark.animate(animations, {
      easing: easeInOutCubic,
      fill: 'forwards',
      duration: this.props.theme.animationDuration,
    });
  }

  /**
   * A function which will be called with the element from EventHandler.
   *
   * @param {Object} element - The root element from EventHandler.
   */
  createRef = (element) => {
    this.root = element;
  };

  render() {
    const {
      disabled,
      classes,
      checked,
    } = this.props;

    const className = classnames(
      this.props.className,
      classes.checkbox,
      { 'checkbox--label-left': this.props.labelPosition === 'left' },
    );

    return (
      <EventHandler
        {...getNotDeclaredProps(this.props, Checkbox)}
        component="span"
        role="checkbox"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-checked={checked}
        className={className}
        createRef={this.createRef}
        onKeyPress={this.props.onKeyPress}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      >
        <EventHandler
          component="span"
          role="presentation"
          className={classes.container}
          onPress={this.props.onPress}
        >
          <span
            className={classes.checkboxContainer}
            ref={(element) => { this.checkbox = element; }}
          >
            <span
              className={classes.checkmark}
              ref={(element) => { this.checkmark = element; }}
            />
          </span>

          <Ripple
            round
            center
            className={classes.ripple}
            isFocused={this.props.isFocused}
            {...this.getRippleProps()}
          />
        </EventHandler>

        <Label
          className={classes.label}
          htmlFor={this.props.id}
          disabled={disabled}
        >
          {this.props.children}
        </Label>
      </EventHandler>
    );
  }
}

const styles = {
  checkbox: {
    composes: 'checkbox',
    boxSizing: 'border-box',
    outline: 'none',
    border: 0,
    backgroundColor: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    padding: props => props.theme.padding,
    height: props => props.theme.rippleSize + (props.theme.padding * 2),

    '&[aria-disabled=false] $label': { cursor: 'pointer' },

    '&[aria-disabled=true]': { pointerEvents: 'none' },

    '&[aria-disabled=true] $checkboxContainer': {
      borderColor: props => props.theme.disabledBorderColor,
      backgroundColor: props => props.theme.disabledBgColor,
    },

    '&[aria-disabled=true][aria-checked=true] $checkboxContainer': {
      backgroundColor(props) {
        return props.theme.disabledCheckedBgColor;
      },
    },

    '&.checkbox--label-left': { flexDirection: 'row-reverse' },

    '&[aria-disabled=false][aria-checked=true] $checkboxContainer': {
      borderColor: props => props.theme.checkedBorderColor,
      backgroundColor: props => props.theme.checkedBgColor,
    },
  },

  container: {
    composes: 'checkbox--container',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    borderRadius: '50%',
    boxSizing: 'border-box',
    zIndex: 1,
    height: props => props.theme.rippleSize,
    width: props => props.theme.rippleSize,
  },

  label: { composes: 'checkbox--label' },

  checkboxContainer: {
    composes: 'checkbox--checkbox-container',
    display: 'inline-block',
    position: 'relative',
    borderStyle: 'solid',
    margin: props => (props.theme.rippleSize - props.theme.size) / 2,
    height: props => props.theme.size - props.theme.borderWidth * 2,
    width: props => props.theme.size - props.theme.borderWidth * 2,
    borderWidth: props => props.theme.borderWidth,
    borderRadius: props => props.theme.borderWidth,
    borderColor: props => props.theme.uncheckedBorderColor,
    backgroundColor: props => props.theme.uncheckedBgColor,
    transitionDuration: props => props.theme.animationDuration,
    transitionProperty: 'background-color, border-color',
  },

  checkmark: {
    composes: 'checkbox--checkmark',
    width: '36%',
    height: '70%',
    left: -1,
    position: 'absolute',
    border: `${8 / 3}px solid`,
    borderTop: 0,
    borderLeft: 0,
    transformOrigin: '97% 86%',
    boxSizing: 'content-box',
    willChange: 'opacity, transform',
    opacity: 0,
  },
};

export default connectWithTheme(injectSheet(styles)(Checkbox), 'checkbox');
