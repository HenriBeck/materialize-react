import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import { rgba } from 'polished';
import noop from 'lodash.noop';

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
export class Switch extends PureComponent {
  static propTypes = {
    toggled: PropTypes.bool.isRequired,
    classes: PropTypes.shape({
      switch: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      thumbToggled: PropTypes.string.isRequired,
      thumbDisabled: PropTypes.string.isRequired,
      bar: PropTypes.string.isRequired,
      barToggled: PropTypes.string.isRequired,
      barDisabled: PropTypes.string.isRequired,
      ripple: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    disabled: false,
    noink: false,
    onFocus: noop,
    onBlur: noop,
  };

  /**
   * The styles for the switch component.
   *
   * @param {Object} theme - The theme. Supplied by Jss.
   * @returns {Object} - Returns the styles for the component.
   */
  static styles(theme) {
    const isDark = theme.type === 'dark';

    return {
      switch: {
        composes: 'switch',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'inline-block',
        height: 14,
        width: 36,
        margin: 21,

        '&:focus': { outline: 0 },

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
        composes: 'switch--thumb-toggled',
        transform: 'translateX(16px)',
        color: theme.primaryBase,
        backgroundColor: theme.primaryBase,
      },

      thumbDisabled: {
        composes: 'switch--thumb-disabled',
        backgroundColor: isDark ? grey800 : grey400,
      },

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

      barToggled: {
        composes: 'switch--bar-toggled',
        backgroundColor: rgba(theme.primaryBase, 0.5),
      },

      barDisabled: {
        composes: 'switch--bar-disabled',
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)',
      },

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
   * Call the onChange prop when the switch get's clicked.
   *
   * @private
   */
  handlePress = () => {
    this.props.onChange();
  };

  /**
   * Check if the user pressed a key where we should call the onChange prop.
   *
   * @private
   */
  handleKeyPress = (ev) => {
    if (Switch.keyCodes.includes(ev.keyCode)) {
      this.props.onChange();
    }
  };

  /**
   * Change the isFocused state when the component get's focused.
   *
   * @private
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState({ isFocused: true });
  };

  /**
   * Set the isFocused state when the component looses focus.
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

export default injectSheet(Switch.styles)(Switch);
