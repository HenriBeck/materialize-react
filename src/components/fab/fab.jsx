import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import Ripple from '../ripple';
import Icon from '../icon';
import { easeInOutCubic } from '../../styles/timings';
import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import elevation from '../../styles/plugins/elevation';

/**
 * A component to render a floating action button.
 *
 * @class
 * @extends PureComponent
 */
export class Fab extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    mini: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    noink: PropTypes.bool,
    disabled: PropTypes.bool,
    animateIn: PropTypes.bool,
    onPress: PropTypes.func,
    onMouseDown: PropTypes.func,
    onTouchStart: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    style: {},
    noink: false,
    disabled: false,
    mini: false,
    animateIn: false,
    onPress: () => {},
    onMouseDown: () => {},
    onTouchStart: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  static keyCodes = [13, 32];

  /**
   * Scale and rotate the fab in if necessary.
   */
  componentDidMount() {
    if (this.props.animateIn) {
      this.root.animate({
        transform: [
          'scale(0) rotate(-45deg)',
          'scale(1) rotate(0deg)',
        ],
      }, {
        duration: this.props.theme.transitionTime * 2,
        easing: easeInOutCubic,
        fill: 'forwards',
      });
    }
  }

  isPressingKey = false;
  isTouchEvent = false;

  /**
   * Check if a key was pressed that we should handle.
   *
   * @private
   */
  handleKeyDown = (ev) => {
    this.props.onKeyDown(ev);

    if (Fab.keyCodes.includes(ev.keyCode) && !this.isPressingKey) {
      this.props.onPress();

      this.isPressingKey = true;
    }
  };

  /**
   * Set the isPressingKey property to false when the user releases the key.
   *
   * @private
   */
  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.isPressingKey = false;
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

  /**
   * Call the onPress handler.
   *
   * @private
   */
  handleMouseDown = (ev) => {
    this.props.onMouseDown(ev);

    if (this.isTouchEvent) {
      this.isTouchEvent = false;

      return;
    }

    this.props.onPress();
  };

  /**
   * Call the onPress handler.
   *
   * @private
   */
  handleTouchStart = (ev) => {
    this.props.onTouchStart(ev);

    this.isTouchEvent = true;

    this.props.onPress();
  };

  render() {
    const {
      disabled,
      classes,
    } = this.props;

    return (
      <span
        {...getNotDeclaredProps(this, Fab)}
        role="button"
        className={`${this.props.className} ${classes.fab}`}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        ref={(element) => { this.root = element; }}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
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
      </span>
    );
  }
}

const styles = {
  fab: {
    composes: 'fab',
    zIndex: 16,
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '50%',
    border: 0,
    outline: 'none',
    width: props => (props.mini ? props.theme.miniSize : props.theme.normalSize),
    height: props => (props.mini ? props.theme.miniSize : props.theme.normalSize),
    pointerEvents: props => props.disabled && 'none',
    color: props => props.theme.iconColor,
    boxShadow(props) {
      return props.disabled ? props.theme.disabledElevation : props.theme.elevation;
    },
    padding(props) {
      const size = props.mini ? props.theme.miniSize : props.theme.normalSize;

      return (size - props.theme.iconSize) / 2;
    },
    backgroundColor(props) {
      return props.disabled ? props.theme.disabledBackgroundColor : props.theme.backgroundColor;
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
