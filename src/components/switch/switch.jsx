import React from 'react';
import PropTypes from 'prop-types';

import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import EventHandler from '../event-handler';
import Ripple from '../ripple';
import Label from '../label';

/**
 * A function that is used internally to render the elements for the switch.
 *
 * @param {Object} props - Props provided by the container.
 * @returns {JSX} - Returns the JSX.
 */
export function Switch(props) {
  const {
    classes,
    theme,
    className,
    noink,
    onKeyPress,
    onPress,
    toggled,
    disabled,
    id,
    children,
    onFocus,
    onBlur,
    isFocused,
    ...otherProps
  } = props;

  const rippleColor = toggled ? theme.uncheckedRippleColor : theme.checkedRippleColor;
  const rippleFocusColor = toggled ? theme.checkedRippleColor : theme.uncheckedRippleColor;

  return (
    <EventHandler
      component="span"
      role="switch"
      className={`${className} ${classes.switch}`}
      aria-checked={toggled}
      aria-disabled={disabled}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={disabled ? -1 : 0}
      id={id}
      {...otherProps}
    >
      <span className={classes.container}>
        <span className={classes.bar} />

        <EventHandler
          component="span"
          className={classes.thumb}
          onPress={onPress}
        >
          <Ripple
            nowaves={noink}
            focusColor={rippleFocusColor}
            color={rippleColor}
            isFocused={isFocused}
            className={classes.ripple}
          />
        </EventHandler>
      </span>

      <Label
        for={id}
        disabled={disabled}
      >
        {children}
      </Label>
    </EventHandler>
  );
}

Switch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  toggled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isFocused: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  noink: PropTypes.bool.isRequired,
};

const styles = {
  switch: {
    composes: 'switch',
    display: 'inline-flex',
    justifyContent: 'center',
    flexDirection: props => (props.labelPosition === 'left' ? 'row-reverse' : 'row'),
    pointerEvents: props => props.disabled && 'none',

    '&[aria-checked="true"] $thumb': {
      backgroundColor: props => props.theme.checkedThumbColor,
      transform: 'translateX(16px)',
    },

    '&[aria-checked="true"] $bar': { backgroundColor: props => props.theme.checkedBarColor },

    '&:focus': { outline: 0 },
  },

  container: {
    composes: 'switch--container',
    position: 'relative',
    height: props => props.theme.barHeight,
    width: props => props.theme.barWidth,
    margin: props => (props.theme.thumbSize - props.theme.barHeight) / 2 + 1,
  },

  thumb: {
    composes: 'switch--thumb',
    position: 'absolute',
    left: 0,
    borderRadius: '50%',
    transitionProperty: 'transform, background-color',
    willChange: 'transform',
    transitionDuration: props => props.theme.transitionDuration,
    top: props => (props.theme.barHeight - props.theme.thumbSize) / 2,
    height: props => props.theme.thumbSize,
    width: props => props.theme.thumbSize,
    backgroundColor(props) {
      if (props.disabled) {
        return props.theme.disabledThumbColor;
      }

      return props.theme.uncheckedThumbColor;
    },
  },

  bar: {
    composes: 'switch--bar',
    position: 'absolute',
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    transitionProperty: 'background-color',
    transitionDuration: props => props.theme.transitionDuration,
    borderRadius: props => props.theme.barHeight / 2,
    backgroundColor(props) {
      if (props.disabled) {
        return props.theme.disabledBarColor;
      }

      return props.theme.uncheckedBarColor;
    },
  },

  ripple: {
    composes: 'switch--ripple',
    position: 'absolute',
    top: props => (props.theme.thumbSize - props.theme.rippleSize) / 2,
    right: props => (props.theme.thumbSize - props.theme.rippleSize) / 2,
    bottom: props => (props.theme.thumbSize - props.theme.rippleSize) / 2,
    left: props => (props.theme.thumbSize - props.theme.rippleSize) / 2,
    color(props) {
      return props.toggled ? props.theme.checkedRippleColor : props.theme.uncheckedRippleColor;
    },
  },

  label: {
    composes: 'switch--label',
    padding: 5,
    cursor: 'pointer',
  },
};

export default connectWithTheme(injectSheet(styles)(Switch), 'switch');
