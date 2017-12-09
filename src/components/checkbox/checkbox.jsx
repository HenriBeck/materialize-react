import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import noop from 'lodash.noop';

import Ripple from '../ripple';
import getNotDeclaredProps from '../../get-not-declared-props';
import withKeyPress from '../../utils/with-key-press';
import { pipe } from '../../utils/functions';
import withFocusedState from '../../utils/with-focused-state';

/**
 * The actual visual component of the checkbox.
 *
 * @private
 * @class
 * @extends PureComponent
 */
export class Checkbox extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      checkbox: PropTypes.string.isRequired,
      container: PropTypes.string.isRequired,
      checkmark: PropTypes.string.isRequired,
      ripple: PropTypes.string.isRequired,
    }).isRequired,
    checked: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,
    createKeyDownHandler: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    className: '',
    onChange: noop,
  };

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles(theme) {
    const isDark = theme.type === 'dark';
    const disabledColor = isDark ? '#717171' : '#b0b0b0';

    return {
      '@keyframes checkbox--animate-in': {
        from: {
          opacity: 0,
          transform: 'scale(0) rotate(-45deg)',
        },
        to: {
          opacity: 1,
          transform: 'scale(1) rotate(45deg)',
        },
      },

      '@keyframes checkbox--animate-out': {
        from: {
          opacity: 1,
          transform: 'scale(1) rotate(45deg)',
        },
        to: {
          opacity: 0,
          transform: 'scale(1) rotate(45deg)',
        },
      },

      checkbox: {
        composes: 'checkbox',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '50%',
        boxSizing: 'border-box',
        height: 48,
        width: 48,
        margin: 8,
        backgroundColor: 'inherit',

        '&:focus': { outline: 0 },

        '&[aria-disabled=true]': {
          pointerEvents: 'none',

          '&[aria-checked=true] $container': { backgroundColor: disabledColor },
        },

        '&[aria-disabled=true] $container': {
          borderColor: disabledColor,
          backgroundColor: disabledColor,
        },

        '&[aria-disabled=false][aria-checked=true] $container': {
          borderColor: theme.primaryBase,
          backgroundColor: theme.primaryBase,
        },

        '&[aria-checked=true] $ripple': { color: theme.primaryBase },
      },

      ripple: {
        composes: 'checkbox--ripple',
        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
      },

      container: {
        composes: 'checkbox--checkbox-container',
        display: 'inline-block',
        position: 'relative',
        border: 'solid 2px',
        boxSizing: 'border-box',
        margin: 15,
        height: 18,
        width: 18,
        borderRadius: 2,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
        transition: 'background-color, border-color, 160ms',
      },

      checkmark: {
        composes: 'checkbox--checkmark',
        width: '36%',
        height: '70%',
        position: 'absolute',
        border: '2.4px solid',
        left: -0.5,
        borderTop: 0,
        borderLeft: 0,
        transformOrigin: '97% 86%',
        willChange: 'opacity, transform',
        opacity: 0,
        boxSizing: 'content-box',
        animationDuration: 160,
        animationFillMode: 'forwards',
      },
    };
  }

  static keyCodes = [32];

  /**
   * Set the border color of the checkmark to the background-color from the root element.
   */
  componentDidMount() {
    const bgColor = window.getComputedStyle(this.root)['background-color'];

    this.checkmark.style.borderColor = bgColor;
  }

  handleKeyDown = this.props.createKeyDownHandler(this.props.onChange);

  render() {
    return (
      <span
        {...getNotDeclaredProps(this.props, Checkbox)}
        role="checkbox"
        tabIndex={this.props.disabled ? -1 : 0}
        aria-disabled={this.props.disabled}
        aria-checked={this.props.checked}
        className={classnames(
          this.props.classes.checkbox,
          this.props.className,
        )}
        ref={(element) => { this.root = element; }}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.props.onKeyUp}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onClick={this.props.onChange}
      >
        <span
          className={this.props.classes.container}
          ref={(element) => { this.checkbox = element; }}
        >
          <span
            className={this.props.classes.checkmark}
            style={{ animationName: `checkbox--animate-${this.props.checked ? 'in' : 'out'}` }}
            ref={(element) => { this.checkmark = element; }}
          />
        </span>

        <Ripple
          round
          center
          className={this.props.classes.ripple}
          isFocused={this.props.isFocused}
        />
      </span>
    );
  }
}

export default pipe(
  injectSheet(Checkbox.styles),
  withFocusedState,
  withKeyPress({ keyCodes: Checkbox.keyCodes }),
)(Checkbox);
