import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import EventListener from 'react-event-listener';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import { getCoords } from '../ripple/utils';
import getNotDeclaredProps from '../../get-not-declared-props';
import { pipe } from '../../utils/functions';
import withFocusedState from '../../utils/with-focused-state';

const clamp = value => Math.max(0, Math.min(Math.floor(value), 100));

/**
 * The slider component.
 *
 * @class
 */
class Slider extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      slider: PropTypes.string.isRequired,
      track: PropTypes.string.isRequired,
      trackFocused: PropTypes.string.isRequired,
      trackDisabled: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      thumbFocused: PropTypes.string.isRequired,
      thumbActive: PropTypes.string.isRequired,
      thumbDisabled: PropTypes.string.isRequired,
      thumbActiveDisabled: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.number.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    onChange: noop,
    className: '',
  };

  static keyCodes = {
    37: -2,
    38: 2,
    39: 2,
    40: -2,
  };

  /**
   * The styles for the slider.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.slider - The actual theme object for the slider.
   * @returns {Object} - Returns the styles for the component.
   */
  static styles(theme) {
    const isDark = theme.type === 'dark';
    const disabledColor = theme.type === 'dark' ? '#525252' : '#b6b6b6';

    return {
      slider: {
        composes: 'slider',
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        height: 3,
        margin: '20px 15px',
        backgroundColor: 'inherit',

        '&:focus': { outline: 0 },

        '&[aria-disabled=true]': { pointerEvents: 'none' },
      },

      track: {
        composes: 'slider--track',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: isDark ? '#5c5c5c' : '#c3c3c3',
        transition: 'background-color 100ms linear',

        '&::after': {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          content: '""',
          transformOrigin: 'left center',
          backgroundColor: theme.primaryBase,
          transform: props => `scaleX(${props.value / 100})`,
          transition: 'transform 100ms linear',
        },
      },

      trackFocused: { backgroundColor: !isDark && '#b1b1b1' },

      trackDisabled: { '&::after': { backgroundColor: 'transparent' } },

      thumb: {
        composes: 'slider--thumb',
        width: 8,
        position: 'absolute',
        top: -4.5,
        bottom: -4.5,
        left: -11.5,
        border: 'solid 2px',
        borderColor: isDark ? '#5c5c5c' : '#c3c3c3',
        borderRadius: '50%',
        cursor: '-webkit-drag',
        transition: 'background-color, border-color, transform 100ms linear',

        '&::after': {
          position: 'absolute',
          content: '""',
          top: -10,
          left: -10,
          right: -10,
          bottom: -10,
          backgroundColor: isDark ? '#5c5c5c' : '#c3c3c3',
          opacity: 0,
          transition: 'opacity 100ms linear',
          borderRadius: '50%',
        },
      },

      thumbActive: {
        composes: 'slider--thumb-active',
        backgroundColor: theme.primaryBase,
        borderColor: theme.primaryBase,

        '&::after': { backgroundColor: theme.primaryBase },
      },

      thumbFocused: { '&::after': { opacity: 0.25 } },

      thumbDisabled: { borderColor: disabledColor },

      thumbActiveDisabled: { backgroundColor: disabledColor },
    };
  }

  state = {
    isDragging: false,
    translateX: 0,
  };

  /**
   * Initially compute the translate.
   */
  componentDidMount() {
    this.rootRect = this.root.getBoundingClientRect();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ translateX: this.computeTranslate(this.props.value) });
  }

  /**
   * Recalculate the translateX for the thumb when the value prop changes.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ translateX: this.computeTranslate(nextProps.value) });
    }
  }

  computeTranslate = value => this.rootRect.width * clamp(value) / 100;

  /**
   * Compute the transform for the thumb.
   *
   * @returns {String} - Returns the thumb transform.
   */
  get thumbTransform() {
    return classnames(`translateX(${this.state.translateX}px)`, {
      'scale(1.5)': this.state.isDragging,
      'scale(0.75)': this.props.disabled,
    });
  }

  /**
   * Set the isDragging state to true when the user pressed the thumb.
   */
  handleThumbPress = () => {
    this.setState({ isDragging: true });
  };

  /**
   * Set the isDragging state back to false when the user releases the thumb.
   */
  handleThumbRelease = () => {
    this.setState({ isDragging: false });
  };

  /**
   * Increment the current value when special keys are pressed.
   */
  handleKeyDown = (ev) => {
    if (Slider.keyCodes[ev.keyCode]) {
      this.props.onChange(clamp(this.props.value + Slider.keyCodes[ev.keyCode]));
    }
  };

  /**
   * Change the current value when the user moves.
   * This will be called when the user clicks the bar or when he drags the thumb.
   */
  handleMove = (ev) => {
    const { x } = getCoords(ev);

    this.props.onChange(
      clamp((x - this.rootRect.left + 4) / this.rootRect.width * 100),
    );
  };

  /**
   * Update the root rect and recalculate the translate when the browser is being resize.
   */
  handleResize = () => {
    this.rootRect = this.root.getBoundingClientRect();

    this.setState({ translateX: this.computeTranslate(this.props.value) });
  };

  render() {
    const value = clamp(this.props.value);

    return (
      <div
        {...getNotDeclaredProps(this.props, Slider)}
        className={`${this.props.classes.slider} ${this.props.className}`}
        ref={(element) => { this.root = element; }}
        role="slider"
        tabIndex={this.props.disabled ? -1 : 0}
        aria-disabled={this.props.disabled}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onKeyDown={this.handleKeyDown}
      >
        <span // eslint-disable-line
          className={classnames(this.props.classes.track, {
            [this.props.classes.trackFocused]: this.props.isFocused,
            [this.props.classes.trackDisabled]: this.props.disabled,
          })}
          onClick={this.handleMove}
        />

        <span // eslint-disable-line jsx-a11y/no-static-element-interactions
          className={classnames(this.props.classes.thumb, {
            [this.props.classes.thumbFocused]: this.props.isFocused && !this.state.isDragging,
            [this.props.classes.thumbActive]: value > 0,
            [this.props.classes.thumbDisabled]: this.props.disabled,
            [this.props.classes.thumbActiveDisabled]: value > 0 && this.props.disabled,
          })}
          style={{ transform: this.thumbTransform }}
          onMouseDown={this.handleThumbPress}
          onTouchStart={this.handleThumbPress}
        />

        {this.state.isDragging ? (
          <EventListener
            target="window"
            onMouseMove={this.handleMove}
            onMouseUp={this.handleThumbRelease}
            onTouchMove={this.handleMove}
            onTouchEnd={this.handleThumbRelease}
            onResize={this.handleResize}
          />
        ) : null}
      </div>
    );
  }
}

export default pipe(
  injectSheet(Slider.styles),
  withFocusedState,
)(Slider);
