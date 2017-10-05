import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import { rgba } from 'polished';

import getNotDeclaredProps from '../../get-not-declared-props';
import EventHandler from '../event-handler';
import Ripple from '../ripple';
import Label from '../label';
import {
  grey800,
  grey600,
  grey400,
  grey50,
} from '../../styles/colors';

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
  const switchClassName = classnames(
    className,
    classes.switch,
    disabled && classes.switchDisabled,
    labelPosition === 'left' && classes.labelLeft,
  );
  const barClassName = classnames(
    classes.bar,
    toggled && classes.barChecked,
    disabled && classes.barDisabled,
  );
  const thumbClassName = classnames(
    classes.thumb,
    toggled && classes.thumbChecked,
    disabled && classes.thumbDisabled,
  );

  return (
    <EventHandler
      {...getNotDeclaredProps(props, Switch)}
      component="span"
      role="switch"
      className={switchClassName}
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
        <span className={barClassName} />

        <span className={thumbClassName}>
          <Ripple
            round
            center
            nowaves={noink}
            isFocused={isFocused}
            className={classes.ripple}
          />
        </span>
      </span>

      <Label
        htmlFor={id}
        disabled={disabled}
        className="switch--label"
      >
        {children}
      </Label>
    </EventHandler>
  );
}

Switch.propTypes = {
  classes: PropTypes.shape({
    switch: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    bar: PropTypes.string.isRequired,
    ripple: PropTypes.string.isRequired,
  }).isRequired,
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

Switch.styles = (theme) => {
  const isDark = theme.type === 'dark';

  return {
    switch: {
      composes: 'switch',
      display: 'inline-flex',
      alignItems: 'center',

      '&:focus': { outline: 0 },
    },

    switchDisabled: { pointerEvents: 'none' },

    labelLeft: {
      composes: 'switch--label-left',
      flexDirection: 'row-reverse',
    },

    container: {
      composes: 'switch--container',
      position: 'relative',
      height: 14,
      width: 36,
      margin: 20,
    },

    thumb: {
      composes: 'switch--thumb',
      position: 'absolute',
      left: 0,
      borderRadius: '50%',
      transitionProperty: 'transform, background-color',
      willChange: 'transform',
      boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.6)',
      transitionDuration: 150,
      top: -3,
      height: 20,
      width: 20,
      backgroundColor: isDark ? grey400 : grey50,
      color: isDark ? grey400 : grey600,
    },

    thumbChecked: {
      transform: 'translateX(16px)',
      color: theme.primaryBase,
      backgroundColor: theme.primaryBase,
    },

    thumbDisabled: { backgroundColor: isDark ? grey800 : grey400 },

    bar: {
      composes: 'switch--bar',
      position: 'absolute',
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      transitionProperty: 'background-color',
      transitionDuration: 150,
      borderRadius: 7,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.38)',
    },

    barChecked: { backgroundColor: rgba(theme.primaryBase, 0.5) },

    barDisabled: { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)' },

    ripple: {
      composes: 'switch--ripple',
      top: -12,
      left: -12,
      right: -12,
      bottom: -12,
    },
  };
};

export default injectSheet(Switch.styles)(Switch);
