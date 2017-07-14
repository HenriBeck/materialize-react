import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
    labelPosition,
    ...otherProps
  } = props;

  const rippleColor = toggled ? theme.uncheckedRippleColor : theme.checkedRippleColor;
  const rippleFocusColor = toggled ? theme.checkedRippleColor : theme.uncheckedRippleColor;
  const classNames = classnames(
    className,
    classes.switch,
    labelPosition === 'left' && 'switch--label-left',
  );

  return (
    <EventHandler
      {...otherProps}
      component="span"
      role="switch"
      className={classNames}
      aria-checked={toggled}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      id={id}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      onBlur={onBlur}
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
        htmlFor={id}
        disabled={disabled}
        className={classes.label}
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
  labelPosition: PropTypes.string.isRequired,
};

const styles = {
  switch: {
    composes: 'switch',
    display: 'inline-flex',
    alignItems: 'center',

    '&:focus': { outline: 0 },

    '&.switch--label-left': { flexDirection: 'row-reverse' },

    '&[aria-disabled=true]': { pointerEvents: 'none' },

    '&[aria-disabled=true] $label': { cursor: 'pointer' },

    '&[aria-checked=true] $thumb': {
      transform: 'translateX(16px)',
      backgroundColor: props => props.theme.checkedThumbColor,
    },

    '&[aria-checked=true] $bar': { backgroundColor: props => props.theme.checkedBarColor },

    '&[aria-disabled=true] $thumb': { backgroundColor: props => props.theme.disabledThumbColor },

    '&[aria-disabled=true] $bar': { backgroundColor: props => props.theme.disabledBarColor },
  },

  container: {
    composes: 'switch--container',
    position: 'relative',
    height: props => props.theme.barHeight,
    width: props => props.theme.barWidth,
    margin: props => (props.theme.rippleSize - props.theme.barHeight) / 2 + 4,
  },

  thumb: {
    composes: 'switch--thumb',
    position: 'absolute',
    left: 0,
    borderRadius: '50%',
    transitionProperty: 'transform, background-color',
    willChange: 'transform',
    boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.6)',
    transitionDuration: props => props.theme.transitionDuration,
    top: props => (props.theme.barHeight - props.theme.thumbSize) / 2,
    height: props => props.theme.thumbSize,
    width: props => props.theme.thumbSize,
    backgroundColor: props => props.theme.uncheckedThumbColor,
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
    backgroundColor: props => props.theme.uncheckedBarColor,
  },

  ripple: {
    composes: 'switch--ripple',
    position: 'absolute',
    top: props => (props.theme.thumbSize - props.theme.rippleSize) / 2,
    right: props => (props.theme.thumbSize - props.theme.rippleSize) / 2,
    bottom: props => (props.theme.thumbSize - props.theme.rippleSize) / 2,
    left: props => (props.theme.thumbSize - props.theme.rippleSize) / 2,
  },

  label: {
    composes: 'switch--label',
    padding: 0,
  },
};

export default connectWithTheme(injectSheet(styles)(Switch), 'switch');
