import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import EventHandler from '../event-handler';
import Ripple from '../ripple';
import Label from '../label';

/**
 * A function that is used internally to render the elements for the switch.
 *
 * @param {Object} props - Props provided by the container.
 * @param {Object} props.classes - Classes for the component. Provided by Jss.
 * @param {Object} props.theme - The theme provided by Jss.
 * @param {String} props.className - Additional className for the root component.
 * @param {Boolean} props.noink - Whether or not the component has no ripple effect.
 * @param {Boolean} props.toggled - Whether or not the switch is toggled.
 * @param {Boolean} props.disabled - Whether or not the switch should be disabled.
 * @param {String} props.id - The id for the component which will create a link to the Label.
 * @param {JSX} props.children - Children which will be passed to the Label.
 * @param {Boolean} props.isFocused - Whether or not the switch is currently being focused.
 * @param {String} props.labelPosition - Define where the label should be. On the left or the right.
 * @param {Function} props.onFocus - A function which will be provided by the Container.
 * @param {Function} props.onBlur - A function which will be provided by the Container.
 * @param {Function} props.onKeyPress - A function which will be provided by the Container.
 * @param {Function} props.onPress - A function which will be provided by the Container.
 * @returns {JSX} - Returns the JSX.
 */
export function Switch({
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
  ...props
}) {
  const rippleColor = toggled ? theme.uncheckedRippleColor : theme.checkedRippleColor;
  const rippleFocusColor = toggled ? theme.checkedRippleColor : theme.uncheckedRippleColor;
  const classNames = classnames(
    className,
    classes.switch,
    labelPosition === 'left' && 'switch--label-left',
  );

  return (
    <EventHandler
      {...props}
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
      onPress={onPress}
    >
      <span className={classes.container}>
        <span className={classes.bar} />

        <span className={classes.thumb}>
          <Ripple
            round
            center
            nowaves={noink}
            focusColor={rippleFocusColor}
            color={rippleColor}
            isFocused={isFocused}
            className={classes.ripple}
          />
        </span>
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

Switch.styles = ({ switch: theme }) => {
  return {
    switch: {
      composes: 'switch',
      display: 'inline-flex',
      alignItems: 'center',

      '&:focus': { outline: 0 },

      '&.switch--label-left': { flexDirection: 'row-reverse' },

      '&[aria-checked=true] $thumb': {
        transform: 'translateX(16px)',
        backgroundColor: theme.checkedThumbColor,
      },

      '&[aria-checked=true] $bar': { backgroundColor: theme.checkedBarColor },

      '&[aria-disabled=true] $thumb': { backgroundColor: theme.disabledThumbColor },

      '&[aria-disabled=true] $bar': { backgroundColor: theme.disabledBarColor },

      '&[aria-disabled=true]': { pointerEvents: 'none' },

      '&[aria-disabled=true] $label': { cursor: 'pointer' },
    },

    container: {
      composes: 'switch--container',
      position: 'relative',
      height: theme.barHeight,
      width: theme.barWidth,
      margin: (theme.rippleSize - theme.barHeight) / 2 + 4,
    },

    thumb: {
      composes: 'switch--thumb',
      position: 'absolute',
      left: 0,
      borderRadius: '50%',
      transitionProperty: 'transform, background-color',
      willChange: 'transform',
      boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.6)',
      transitionDuration: theme.transitionDuration,
      top: (theme.barHeight - theme.thumbSize) / 2,
      height: theme.thumbSize,
      width: theme.thumbSize,
      backgroundColor: theme.uncheckedThumbColor,
    },

    bar: {
      composes: 'switch--bar',
      position: 'absolute',
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      transitionProperty: 'background-color',
      transitionDuration: theme.transitionDuration,
      borderRadius: theme.barHeight / 2,
      backgroundColor: theme.uncheckedBarColor,
    },

    ripple: {
      composes: 'switch--ripple',
      position: 'absolute',
      top: (theme.thumbSize - theme.rippleSize) / 2,
      left: (theme.thumbSize - theme.rippleSize) / 2,
      right: (theme.thumbSize - theme.rippleSize) / 2,
      bottom: (theme.thumbSize - theme.rippleSize) / 2,
    },

    label: {
      composes: 'switch--label',
      padding: 0,
    },
  };
};

export default injectSheet(Switch.styles)(Switch);
