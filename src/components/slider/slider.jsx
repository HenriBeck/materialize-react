import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getCoords } from '../ripple/utils';

import SliderContainer from './slider-container';

/**
 * The slider component.
 *
 * @class
 */
export default class Slider extends PureComponent {
  static propTypes = {
    initialValue: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
  };

  static defaultProps = {
    initialValue: 0,
    disabled: false,
    onChange: () => {},
    className: '',
    min: 0,
    max: 100,
  };

  static keyCodes = {
    37: -2,
    38: 2,
    39: 2,
    40: -2,
  };

  state = {
    value: this.clamp(this.props.initialValue),
    isFocused: false,
    isDragging: false,
    translateX: 0,
  };

  /**
   * Set the initial translateX state.
   */
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ translateX: this.rootRect.width * this.state.value / this.props.max });
  }

  /**
   * Call the onChange prop when the value updated.
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.props.onChange(this.state.value);
    }
  }

  /**
   * Change the current slider value.
   *
   * @param {Number} value - The new value.
   */
  set value(value) {
    this.setState({
      value: this.clamp(value),
      translateX: this.rootRect.width * value / this.props.max,
    });
  }

  /**
   * Get the current value of the slider.
   *
   * @returns {Number} - Returns the current value.
   */
  get value() {
    return this.state.value;
  }

  /**
   * Clamp the value and round it down. Min 0. Max 100.
   *
   * @param {Number} value - The value to clamp.
   * @returns {Number} - Returns the clamp value.
   */
  clamp(value) {
    return Math.max(this.props.min, Math.min(Math.floor(value), this.props.max));
  }

  /**
   * Create a reference to the root element.
   *
   * @param {Object} element - The elements reference.
   */
  createRootRef = (element) => {
    this.rootRect = element.getBoundingClientRect();
  };

  /**
   * Set the isFocused state upon focus to true.
   */
  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  /**
   * Set the isFocused state back to false.
   */
  handleBlur = () => {
    this.setState({ isFocused: false });
  };

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
  handleKeyPress = (ev) => {
    const keyCode = ev.keyCode;

    if (Slider.keyCodes[keyCode]) {
      this.setState(({ value }) => {
        return {
          value: this.clamp(value + Slider.keyCodes[keyCode]),
          translateX: this.rootRect.width * (value + Slider.keyCodes[keyCode]) / this.props.max,
        };
      });
    }
  };

  /**
   * Change the current value when the user moves.
   * This will be called when the user clicks the bar or when he drags the thumb.
   */
  handleMove = (ev) => {
    const { max } = this.props;
    const { x } = getCoords(ev);
    const value = this.clamp((x - this.rootRect.left) / this.rootRect.width * max);

    this.setState({
      value,
      translateX: this.rootRect.width * value / max,
    });
  };

  render() {
    return (
      <SliderContainer
        {...this.state}
        disabled={this.props.disabled}
        min={this.props.min}
        max={this.props.max}
        className={this.props.className}
        rootRef={this.createRootRef}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        onTrackPress={this.handleMove}
        onThumbPress={this.handleThumbPress}
        onThumbRelease={this.handleThumbRelease}
        onMouseMove={this.handleMove}
        onTouchMove={this.handleMove}
      />
    );
  }
}
