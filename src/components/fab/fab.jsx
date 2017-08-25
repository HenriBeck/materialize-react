import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';
import warning from 'warning';
import Ripple from '../ripple';
import Icon from '../icon';
import { easeInOutCubic } from '../../styles/timings';
import elevation from '../../styles/elevation';
import EventHandler from '../event-handler';

/**
 * A component to render a floating action button.
 *
 * @class
 * @extends PureComponent
 */
export class Fab extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      fab: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      shadow: PropTypes.string.isRequired,
    }).isRequired,
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    mini: PropTypes.bool,
    noink: PropTypes.bool,
    disabled: PropTypes.bool,
    animateIn: PropTypes.bool,
    onPress: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    noink: false,
    disabled: false,
    mini: false,
    animateIn: false,
    onPress: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static keyCodes = [13, 32];

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.fab - The actual theme for the fab component.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles({ fab: theme }) {
    return {
      '@keyframes fab--scale-rotate-in': {
        from: { transform: 'scale(0) rotate(-45deg)' },
        to: { transform: 'scale(1) rotate(0deg)' },
      },

      fab: {
        composes: 'fab',
        zIndex: 16,
        position: 'relative',
        boxSizing: 'border-box',
        borderRadius: '50%',
        border: 0,
        outline: 'none',
        color: theme.iconColor,
        width: theme.normalSize,
        height: theme.normalSize,
        boxShadow: elevation(theme.elevation),
        padding: (theme.normalSize - theme.iconSize) / 2,
        backgroundColor: theme.backgroundColor,

        '&[aria-disabled=true]': {
          pointerEvents: 'none',
          backgroundColor: theme.disabledBackgroundColor,
          boxShadow: elevation(theme.disabledElevation),
        },
      },

      mini: {
        composes: 'fab--mini',
        width: theme.miniSize,
        height: theme.miniSize,
        padding: (theme.miniSize - theme.iconSize) / 2,
      },

      animateIn: {
        composes: 'fab--animate-in',
        animationName: 'fab--scale-rotate-in',
        animationFillMode: 'forwards',
        animationTimingFunction: easeInOutCubic,
        animationDuration: theme.animationDuration,
      },

      icon: {
        composes: 'fab--icon',
        userSelect: 'none',
        height: theme.iconSize,
        width: theme.iconSize,
        color: theme.iconColor,
      },

      shadow: {
        composes: 'fab--shadow',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 'inherit',
        opacity: 0,
        boxShadow: elevation(theme.focusedElevation),
        transition: `opacity ${theme.animationDuration}ms linear`,
      },
    };
  }

  /**
   * Warn against changing the icon and mini prop of a fab.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.icon === this.props.icon,
      'You should not change the icon prop of a FAB',
    );

    warning(
      nextProps.mini === this.props.mini,
      'You should not change the mini prop of a FAB',
    );
  }

  /**
   * Check if a key was pressed that we should handle.
   *
   * @private
   */
  handleKeyPress = (ev) => {
    if (Fab.keyCodes.includes(ev.keyCode)) {
      this.props.onPress();
    }
  };

  /**
   * Add the shadow for the FAB when it's focused.
   *
   * @private
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.shadow.style.opacity = 1;
  };

  /**
   * Remove the shadow for the FAB when it's focused.
   *
   * @private
   */
  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.shadow.style.opacity = 0;
  };

  render() {
    const {
      disabled,
      classes,
      animateIn,
      mini,
      onPress,
      noink,
      icon,
      className,
      ...props
    } = this.props;
    const classNames = classnames(className, classes.fab, {
      [classes.animateIn]: animateIn,
      [classes.mini]: mini,
    });

    return (
      <EventHandler
        {...getNotDeclaredProps(props, Fab)}
        component="span"
        role="button"
        className={classNames}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        onPress={onPress}
      >
        <span
          className={classes.shadow}
          ref={(element) => { this.shadow = element; }}
        />

        <Ripple
          round
          center
          className="fab--ripple"
          nowaves={noink}
        />

        <Icon
          className={classes.icon}
          icon={icon}
          disabled={disabled}
        />
      </EventHandler>
    );
  }
}

export default injectSheet(Fab.styles)(Fab);
