import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import getNotDeclaredProps from '../../get-not-declared-props';
import Ripple from '../ripple';
import Icon from '../icon';
import { easeInOutCubic } from '../../styles/timings';
import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import elevation from '../../styles/plugins/elevation';
import EventHandler from '../event-handler';

/**
 * A component to render a floating action button.
 *
 * @class
 * @extends PureComponent
 */
export class Fab extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
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
    } = this.props;
    const className = classnames(this.props.className, classes.fab, {
      'fab--animate-in': animateIn,
      'fab--mini': mini,
    });

    return (
      <EventHandler
        {...getNotDeclaredProps(this.props, Fab)}
        component="span"
        role="button"
        className={className}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        onPress={this.props.onPress}
      >
        <span
          className={classes.shadow}
          ref={(element) => { this.shadow = element; }}
        />

        <Ripple
          round
          center
          className="fab--ripple"
          nowaves={this.props.noink}
        />

        <Icon
          className={classes.icon}
          icon={this.props.icon}
          disabled={disabled}
        />
      </EventHandler>
    );
  }
}

const styles = {
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
    width: props => props.theme.normalSize,
    height: props => props.theme.normalSize,
    color: props => props.theme.iconColor,
    boxShadow: props => elevation(props.theme.elevation),
    padding: props => (props.theme.normalSize - props.theme.iconSize) / 2,
    backgroundColor: props => props.theme.backgroundColor,

    '&[aria-disabled=true]': {
      pointerEvents: 'none',
      backgroundColor: props => props.theme.disabledBackgroundColor,
      boxShadow: props => elevation(props.theme.disabledElevation),
    },

    '&.fab--mini': {
      width: props => props.theme.miniSize,
      height: props => props.theme.miniSize,
      padding: props => (props.theme.miniSize - props.theme.iconSize) / 2,
    },

    '&.fab--animate-in': {
      animationName: 'fab--scale-rotate-in',
      animationFillMode: 'forwards',
      animationTimingFunction: easeInOutCubic,
      animationDuration: props => props.theme.animationDuration,
    },
  },

  icon: {
    composes: 'fab--icon',
    userSelect: 'none',
    height: props => props.theme.iconSize,
    width: props => props.theme.iconSize,
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
    boxShadow: props => elevation(props.theme.focusedElevation),
    transition: props => `opacity ${props.theme.transitionTime}ms linear`,
  },
};

export default connectWithTheme(injectSheet(styles)(Fab), 'fab');
