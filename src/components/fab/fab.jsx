import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import warning from 'warning';
import noop from 'lodash.noop';

import getNotDeclaredProps from '../../get-not-declared-props';
import Ripple from '../ripple';
import Icon from '../icon';
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
    accent: PropTypes.bool,
    noink: PropTypes.bool,
    animateIn: PropTypes.bool,
    onPress: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    noink: false,
    accent: false,
    mini: false,
    animateIn: false,
    onPress: noop,
    onFocus: noop,
    onBlur: noop,
  };

  static keyCodes = [13, 32];

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @param {Object} theme.fab - The actual theme for the fab component.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles(theme) {
    return {
      '@keyframes fab--scale-rotate-in': {
        from: { transform: 'scale(0) rotate(-45deg)' },
        to: { transform: 'scale(1) rotate(0deg)' },
      },

      fab: {
        composes: 'fab',
        zIndex: theme.zIndexes.fab,
        position: 'relative',
        boxSizing: 'border-box',
        borderRadius: '50%',
        border: 0,
        outline: 'none',
        color: theme.iconColor,
        width: 56,
        height: 56,
        boxShadow: elevation(6),
        padding: 16,
        backgroundColor: theme.primaryBase,
      },

      accent: { backgroundColor: theme.accent },

      mini: {
        composes: 'fab--mini',
        width: 40,
        height: 40,
        padding: 8,
      },

      animateIn: {
        composes: 'fab--animate-in',
        animationName: 'fab--scale-rotate-in',
        animationFillMode: 'forwards',
        animationDuration: 160,
      },

      icon: {
        composes: 'fab--icon',
        userSelect: 'none',
        height: 24,
        width: 24,
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
        boxShadow: elevation(12),
        transition: 'opacity 200ms linear',
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
      classes,
      animateIn,
      mini,
      onPress,
      noink,
      icon,
      accent,
      className,
      ...props
    } = this.props;
    const classNames = classnames(className, classes.fab, {
      [classes.animateIn]: animateIn,
      [classes.mini]: mini,
      [classes.accent]: accent,
    });

    return (
      <EventHandler
        {...getNotDeclaredProps(props, Fab)}
        component="span"
        role="button"
        className={classNames}
        tabIndex={0}
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
        />
      </EventHandler>
    );
  }
}

export default injectSheet(Fab.styles)(Fab);
