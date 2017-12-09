import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import warning from 'warning';
import noop from 'lodash.noop';

import getNotDeclaredProps from '../../get-not-declared-props';
import Ripple from '../ripple';
import { button as buttonTypo } from '../../styles/typography';
import elevation from '../../styles/elevation';
import withKeyPress from '../../utils/with-key-press';
import { pipe } from '../../utils/functions';
import withFocusedState from '../../utils/with-focused-state';

/**
 * A material design button.
 *
 * @class
 * @extends PureComponent
 */
export class Button extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      button: PropTypes.string.isRequired,
      buttonRaised: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
    isFocused: PropTypes.bool.isRequired,
    createKeyDownHandler: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    raised: PropTypes.bool,
    noink: PropTypes.bool,
    className: PropTypes.string,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    disabled: false,
    raised: false,
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
    const isDark = theme.type === 'dark';

    return {
      button: {
        ...buttonTypo,
        composes: 'button',
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        textTransform: 'uppercase',
        textAlign: 'center',
        outline: 0,
        border: 0,
        borderRadius: 2,
        margin: '0 8px',
        cursor: 'pointer',
        height: 36,
        minWidth: 88,
        color: theme.textColor,
        padding: '0 8px',

        '&[aria-disabled=true]': {
          cursor: 'auto',
          pointerEvents: 'none',
          color: theme.disabledColor,
        },
      },

      buttonRaised: {
        composes: 'button--raised',
        backgroundColor: isDark ? theme.primaryBase : null,

        '&[aria-disabled=true]': {
          backgroundColor: isDark
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.12)',
        },

        '&[aria-disabled=false]': {
          boxShadow: elevation(2),

          '&:hover': { boxShadow: elevation(4) },
        },

        '&[aria-pressed=true]': { boxShadow: elevation(4) },
      },
    };
  }

  state = { pressed: false };

  /**
   * We should warn against changing the raised prop
   * because a button should be either raised or not raised from the beginning.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.raised === this.props.raised,
      'You should not change the raised prop of a button!',
    );
  }

  /**
   * Get the ripple props based on the props the user passed.
   *
   * @private
   * @returns {Object} - Returns the props.
   */
  get rippleProps() {
    return this.props.raised ? {
      focusColor: '#000000',
      focusOpacity: 0.12,
    } : null;
  }

  /**
   * Call the onPress handler and set the pressed state to true.
   *
   * @private
   */
  handlePress = (ev) => {
    this.props.onPress(ev);

    this.setState({ pressed: true });
  };

  /**
   * Toggle the pressed state when the user releases the button.
   *
   * @private
   */
  handleRelease = () => {
    this.setState({ pressed: false });
  };

  handleKeyDown = this.props.createKeyDownHandler(this.props.onPress);

  render() {
    return (
      <span
        {...getNotDeclaredProps(this.props, Button)}
        role="button"
        className={classnames(
          this.props.classes.button,
          { [this.props.classes.buttonRaised]: this.props.raised },
          this.props.className,
        )}
        tabIndex={this.props.disabled ? -1 : 0}
        aria-disabled={this.props.disabled}
        aria-pressed={this.state.pressed && !this.props.disabled}
        onClick={this.handlePress}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.props.onKeyUp}
        onMouseUp={this.handleRelease}
      >
        <Ripple
          className="button--ripple"
          isFocused={this.props.isFocused}
          nowaves={this.props.noink}
          {...this.rippleProps}
        />

        {this.props.children}
      </span>
    );
  }
}

export default pipe(
  injectSheet(Button.styles),
  withFocusedState,
  withKeyPress({ keyCodes: Button.keyCodes }),
)(Button);
