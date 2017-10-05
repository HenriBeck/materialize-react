import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import EventHandler from '../event-handler';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * The actual renderer of the slider.
 *
 * @class
 */
export class Slider extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      slider: PropTypes.string.isRequired,
      track: PropTypes.string.isRequired,
      trackFocused: PropTypes.string.isRequired,
      trackDisabled: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      thumbFocused: PropTypes.string.isRequired,
      thumbActive: PropTypes.string.isRequired,
    }).isRequired,
    className: PropTypes.string.isRequired,
    onTrackPress: PropTypes.func.isRequired,
    onThumbPress: PropTypes.func.isRequired,
    onThumbRelease: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    rootRef: PropTypes.func.isRequired,
    translateX: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
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
          transform: props => `scaleX(${props.value / props.max})`,
          transition: 'transform 100ms linear',
        },
      },

      trackFocused: {
        composes: 'slider--track-focused',
        backgroundColor: !isDark && '#b1b1b1',
      },

      trackDisabled: {
        composes: 'slider--track-disabled',

        '&::after': { backgroundColor: 'transparent' },
      },

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

      thumbFocused: {
        composes: 'slider--thumb-focused',

        '&::after': { opacity: 0.25 },
      },
    };
  }

  render() {
    const {
      classes,
      onTrackPress,
      onThumbPress,
      onThumbRelease,
      onKeyPress,
      onFocus,
      onBlur,
      className,
      isFocused,
      isDragging,
      value,
      rootRef,
      translateX,
      disabled,
      ...props
    } = this.props;
    let transform = `translateX(${translateX}px)`;

    if (isDragging) {
      transform += ' scale(1.5)';
    } else if (disabled) {
      transform += ' scale(0.75)';
    }

    return (
      <div
        {...getNotDeclaredProps(props, Slider)}
        className={`${classes.slider} ${className}`}
        ref={rootRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-valuemax={this.props.max}
        aria-valuemin={this.props.min}
        aria-valuenow={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyPress}
      >
        <EventHandler
          component="span"
          className={classnames(classes.track, {
            [classes.trackFocused]: isFocused,
            [classes.trackDisabled]: disabled,
          })}
          onPress={onTrackPress}
        />

        <EventHandler
          component="span"
          style={{ transform }}
          className={classnames(classes.thumb, {
            [classes.thumbFocused]: isFocused && !isDragging,
            [classes.thumbActive]: value > 0,
            [classes.thumbDisabled]: disabled,
            [classes.thumbActiveDisabled]: value > 0 && disabled,
          })}
          onPress={onThumbPress}
          onRelease={onThumbRelease}
        />
      </div>
    );
  }
}

export default injectSheet(Slider.styles)(Slider);
