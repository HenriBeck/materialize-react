import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { rgba } from 'polished';

import getNotDeclaredProps from '../../get-not-declared-props';
import {
  grey400,
  grey50,
  grey600,
  grey800,
} from '../../styles/colors';
import EventHandler from '../event-handler';
import Ripple from '../ripple';

/**
 * A component to render a switch component.
 *
 * @class
 */
export default class Switch extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defaultToggled: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    labelPosition: PropTypes.string,
    noink: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    defaultToggled: false,
    className: '',
    labelPosition: 'right',
    disabled: false,
    noink: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static styles(theme) {
    const isDark = theme.type === 'dark';

    return {
      switch: {
        composes: 'switch--container',
        position: 'relative',
        height: 14,
        width: 36,
        margin: 21,

        '&[aria-disabled=true]': { pointerEvents: 'none' },
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

      thumbToggled: {
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

      barToggled: { backgroundColor: rgba(theme.primaryBase, 0.5) },

      barDisabled: { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)' },

      ripple: {
        composes: 'switch--ripple',
        top: -12,
        left: -12,
        right: -12,
        bottom: -12,
      },
    };
  }

  static keyCodes = [13, 32];

  state = { isFocused: false };

  /**
   * Toggle the state upon a press.
   *
   * @private
   */
  handlePress = () => {
    this.props.onChange();
  };

  /**
   * Check if the user pressed a key where we should toggle the state.
   *
   * @private
   */
  handleKeyPress = (ev) => {
    if (Switch.keyCodes.includes(ev.keyCode)) {
      this.toggle();
    }
  };

  /**
   * Change the isFocused state to true.
   *
   * @private
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState({ isFocused: true });
  };

  /**
   * Set the isFocused state to false.
   *
   * @private
   */
  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ isFocused: false });
  };

  render() {
    const {
      classes,
      disabled,
      className,
      toggled,
      noink,
      ...props
    } = this.props;

    return (
      <EventHandler
        {...getNotDeclaredProps(props, Switch)}
        component="span"
        role="switch"
        className={classnames(classes.switch, className)}
        aria-checked={toggled}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onPress={this.handlePress}
      >
        <span
          className={classnames(classes.bar, {
            [classes.barToggled]: toggled,
            [classes.barDisabled]: disabled,
          })}
        />

        <span
          className={classnames(classes.thumb, {
            [classes.thumbToggled]: toggled,
            [classes.thumbDisabled]: disabled,
          })}
        >
          <Ripple
            round
            center
            nowaves={noink}
            isFocused={this.state.isFocused}
            className={classes.ripple}
          />
        </span>
      </EventHandler>
    );
  }
}
