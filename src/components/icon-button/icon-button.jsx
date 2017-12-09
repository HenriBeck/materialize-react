import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import warning from 'warning';
import noop from 'lodash.noop';

import Ripple from '../ripple';
import Icon from '../icon';
import getNotDeclaredProps from '../../get-not-declared-props';
import { pipe } from '../../utils/functions';
import withFocusedState from '../../utils/with-focused-state';
import withKeyPress from '../../utils/with-key-press';

/**
 * A component to render an icon button.
 *
 * @class
 * @extends PureComponent
 */
export class IconButton extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      iconButton: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      ripple: PropTypes.string.isRequired,
    }).isRequired,
    icon: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    createKeyDownHandler: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    className: PropTypes.string,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
    className: '',
    onPress: noop,
  };

  static keyCodes = [13, 32];

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles(theme) {
    return {
      iconButton: {
        composes: 'icon-button',
        position: 'relative',
        borderRadius: '50%',
        boxSizing: 'border-box',
        display: 'inline-block',
        outline: 0,
        border: 0,
        height: 48,
        width: 48,
        margin: 4,
        padding: 12,

        '&[aria-disabled=true]': { pointerEvents: 'none' },
      },

      icon: {
        composes: 'icon-button--icon',
        fontSize: 24,
      },

      ripple: {
        composes: 'icon-button--ripple',
        color: theme.iconColor,
      },
    };
  }

  /**
   * Warn against changing the icon prop.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.icon === this.props.icon,
      'You should not change the icon prop of a IconButton',
    );
  }

  handleKeyDown = this.props.createKeyDownHandler(this.props.onPress);

  render() {
    return (
      <span
        {...getNotDeclaredProps(this.props, IconButton)}
        role="button"
        className={`${this.props.classes.iconButton} ${this.props.className}`}
        aria-disabled={this.props.disabled}
        tabIndex={this.props.disabled ? -1 : 0}
        onClick={this.props.onPress}
        onKeyUp={this.props.onKeyUp}
        onKeyDown={this.handleKeyDown}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      >
        <Ripple
          round
          center
          className="icon-button--ripple"
          focusOpacity={0.12}
          nowaves={this.props.noink}
          isFocused={this.props.isFocused}
        />

        <Icon
          className={this.props.classes.icon}
          icon={this.props.icon}
          disabled={this.props.disabled}
        />
      </span>
    );
  }
}

export default pipe(
  injectSheet(IconButton.styles),
  withFocusedState,
  withKeyPress({ keyCodes: IconButton.keyCodes }),
)(IconButton);
