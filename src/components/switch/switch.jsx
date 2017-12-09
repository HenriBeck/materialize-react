import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import { rgba } from 'polished';

import getNotDeclaredProps from '../../get-not-declared-props';
import {
  grey400,
  grey50,
  grey600,
  grey800,
} from '../../styles/colors';
import Ripple from '../ripple';
import { pipe } from '../../utils/functions';
import withFocusedState from '../../utils/with-focused-state';
import withKeyPress from '../../utils/with-key-press';

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
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    createKeyDownHandler: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    disabled: false,
    noink: false,
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

  handleKeyDown = this.props.createKeyDownHandler(this.props.onChange);

  render() {
    return (
      <span
        {...getNotDeclaredProps(this.props, Switch)}
        role="switch"
        className={classnames(this.props.classes.switch, this.props.className)}
        aria-checked={this.props.toggled}
        aria-disabled={this.props.disabled}
        tabIndex={this.props.disabled ? -1 : 0}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.props.onKeyUp}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      >
        <span
          className={classnames(this.props.classes.bar, {
            [this.props.classes.barToggled]: this.props.toggled,
            [this.props.classes.barDisabled]: this.props.disabled,
          })}
        />

        <span // eslint-disable-line
          className={classnames(this.props.classes.thumb, {
            [this.props.classes.thumbToggled]: this.props.toggled,
            [this.props.classes.thumbDisabled]: this.props.disabled,
          })}
          onClick={this.props.onChange}
        >
          <Ripple
            round
            center
            nowaves={this.props.noink}
            isFocused={this.props.isFocused}
            className={this.props.classes.ripple}
          />
        </span>
      </span>
    );
  }
}

export default pipe(
  injectSheet(Switch.styles),
  withFocusedState,
  withKeyPress({ keyCodes: Switch.keyCodes }),
)(Switch);
