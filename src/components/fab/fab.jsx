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
import { pipe } from '../../utils/functions';
import withKeyPress from '../../utils/with-key-press';
import withFocusedState from '../../utils/with-focused-state';

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
      animateIn: PropTypes.string.isRequired,
      mini: PropTypes.string.isRequired,
      accent: PropTypes.string.isRequired,
      activeShadow: PropTypes.string.isRequired,
    }).isRequired,
    icon: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    createKeyDownHandler: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    className: PropTypes.string,
    mini: PropTypes.bool,
    accent: PropTypes.bool,
    noink: PropTypes.bool,
    animateIn: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    noink: false,
    accent: false,
    mini: false,
    animateIn: false,
    onPress: noop,
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

      accent: {
        composes: 'fab--accent',
        backgroundColor: theme.accent,
      },

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

      activeShadow: { opacity: 1 },
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

  handleKeyDown = this.props.createKeyDownHandler(this.props.onPress);

  render() {
    return (
      <span
        {...getNotDeclaredProps(this.props, Fab)}
        role="button"
        className={classnames(
          this.props.classes.fab, {
            [this.props.classes.animateIn]: this.props.animateIn,
            [this.props.classes.mini]: this.props.mini,
            [this.props.classes.accent]: this.props.accent,
          },
          this.props.className,
        )}
        tabIndex={0}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.props.onKeyUp}
        onClick={this.props.onPress}
      >
        <span
          className={classnames(
            this.props.classes.shadow,
            { [this.props.classes.activeShadow]: this.props.isFocused },
          )}
        />

        <Ripple
          round
          center
          className="fab--ripple"
          nowaves={this.props.noink}
        />

        <Icon
          className={this.props.classes.icon}
          icon={this.props.icon}
        />
      </span>
    );
  }
}

export default pipe(
  injectSheet(Fab.styles),
  withFocusedState,
  withKeyPress({ keyCodes: Fab.keyCodes }),
)(Fab);
