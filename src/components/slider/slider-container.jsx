import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import EventHandler from '../event-handler';

/**
 * The actual renderer of the slider.
 *
 * @class
 */
export class SliderContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      track: PropTypes.string.isRequired,
      trackFocused: PropTypes.string.isRequired,
      trackDisabled: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      thumbFocused: PropTypes.string.isRequired,
      thumbActive: PropTypes.string.isRequired,
      thumbDisabled: PropTypes.string.isRequired,
      thumbActiveDisabled: PropTypes.string.isRequired,
    }).isRequired,
    className: PropTypes.string.isRequired,
    onTrackPress: PropTypes.func.isRequired,
    onThumbPress: PropTypes.func.isRequired,
    onThumbRelease: PropTypes.func.isRequired,
    onTouchMove: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    rootRef: PropTypes.func.isRequired,
    translateX: PropTypes.string.isRequired,
    theme: PropTypes.shape({}).isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  /**
   * The styles for the slider.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.slider - The actual theme object for the slider.
   * @returns {Object} - Returns the styles for the component.
   */
  static styles({ slider: theme }) {
    return {
      container: {
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        height: theme.trackHeight,
        margin: '20px 15px',

        '&:focus': { outline: 0 },

        '&[aria-disabled=true]': { pointerEvents: 'none' },
      },

      track: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.trackColor,
        transition: 'background-color 100ms linear',

        '&::after': {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          content: '""',
          transformOrigin: 'left center',
          backgroundColor: theme.trackActiveColor,
          transform: props => `scaleX(${props.value / 100})`,
          transition: 'transform 100ms linear',
        },
      },

      trackFocused: { backgroundColor: theme.focusedTrackColor },

      trackDisabled: {
        backgroundColor: theme.disabledTrackColor,

        '&::after': { backgroundColor: 'transparent' },
      },

      thumb: {
        width: theme.thumbSize,
        position: 'absolute',
        top: (theme.trackHeight - theme.thumbSize - theme.borderWidth * 2) / 2,
        bottom: (theme.trackHeight - theme.thumbSize - theme.borderWidth * 2) / 2,
        left: -theme.thumbSize - theme.borderWidth * 2 + 0.5,
        border: `solid ${theme.borderWidth}px`,
        borderColor: theme.thumbBorderColor,
        borderRadius: '50%',
        cursor: 'drag',
        transition: 'background-color, opacity, transform 100ms linear',

        '&::after': {
          position: 'absolute',
          content: '""',
          top: (theme.thumbSize + theme.borderWidth * 2 - theme.focusCircleSize) / 2,
          left: (theme.thumbSize + theme.borderWidth * 2 - theme.focusCircleSize) / 2,
          right: (theme.thumbSize + theme.borderWidth * 2 - theme.focusCircleSize) / 2,
          bottom: (theme.thumbSize + theme.borderWidth * 2 - theme.focusCircleSize) / 2,
          backgroundColor: theme.focusedThumbBorderColor,
          opacity: 0,
          transition: 'opacity 100ms linear',
          borderRadius: '50%',
        },
      },

      thumbFocused: {
        borderColor: theme.focusedThumbBorderColor,

        '&::after': { opacity: 0.2 },
      },

      thumbActive: {
        backgroundColor: theme.thumbActiveColor,
        borderColor: theme.thumbActiveColor,

        '&::after': { backgroundColor: theme.thumbActiveColor },
      },

      thumbDisabled: { borderColor: theme.disabledThumbColor },

      thumbActiveDisabled: { backgroundColor: theme.disabledThumbColor },
    };
  }

  render() {
    const {
      classes,
      onTrackPress,
      onThumbPress,
      onThumbRelease,
      onTouchMove,
      onMouseMove,
      onKeyPress,
      onFocus,
      onBlur,
      className,
      isFocused,
      isDragging,
      value,
      rootRef,
      translateX,
      theme,
      disabled,
      ...props
    } = this.props;

    const thumbClassNames = classnames(classes.thumb, {
      [classes.thumbFocused]: isFocused,
      [classes.thumbActive]: value > 0,
      [classes.thumbDisabled]: disabled,
      [classes.thumbActiveDisabled]: value > 0 && disabled,
    });
    const trackClassNames = classnames(classes.track, {
      [classes.trackFocused]: isFocused,
      [classes.trackDisabled]: disabled,
    });
    let transform = `translateX(${translateX}px)`;

    if (isDragging) {
      transform += ` scale(${theme.slider.thumbActiveSize / theme.slider.thumbSize})`;
    } else if (disabled) {
      transform += ` scale(${theme.slider.thumbDisabledSize / theme.slider.thumbSize})`;
    }

    return (
      <div
        {...props}
        className={`${classes.container} ${className}`}
        ref={rootRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyPress}
      >
        <EventHandler
          component="span"
          className={trackClassNames}
          onPress={onTrackPress}
        />

        <EventHandler
          component="span"
          style={{ transform }}
          className={thumbClassNames}
          onPress={onThumbPress}
          onRelease={onThumbRelease}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        />
      </div>
    );
  }
}

export default injectSheet(SliderContainer.styles)(SliderContainer);
