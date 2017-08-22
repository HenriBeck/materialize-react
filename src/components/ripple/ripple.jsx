import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import Wave from './wave';
import EventHandler from '../event-handler';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * The presentation container for the ripple.
 *
 * @private
 * @class
 * @extends PureComponent
 */
export class Ripple extends PureComponent {
  static propTypes = {
    waves: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    classes: PropTypes.shape({
      ripple: PropTypes.string.isRequired,
      focus: PropTypes.string.isRequired,
      waveContainer: PropTypes.string.isRequired,
      wave: PropTypes.string.isRequired,
      noWaves: PropTypes.string.isRequired,
    }).isRequired,
    className: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    round: PropTypes.bool.isRequired,
    onDownAction: PropTypes.func.isRequired,
    onAnimationFinish: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    createRef: PropTypes.func.isRequired,
    nowaves: PropTypes.bool.isRequired,
  };

  static extraProps = [
    'initialOpacity',
    'focusColor',
    'focusOpacity',
  ];

  static styles = {
    '@keyframes ripple--scale-in': {
      from: { transform: 'scale(0)' },
      to: { transform: 'scale(1)' },
    },

    ripple: {
      composes: 'ripple',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'block',
      borderRadius: 'inherit',
      overflow: 'hidden',
      cursor: 'pointer',

      '&.ripple--round $focus': {
        borderRadius: '50%',
        transform: 'scale(0)',
      },

      '&.ripple--round $waveContainer': { borderRadius: '50%' },

      '&.ripple--focused $focus': { opacity: props => props.focusOpacity },

      '&.ripple--round.ripple--focused $focus': { transform: 'scale(1)' },
    },

    noWaves: {
      composes: 'ripple--no-waves',
      pointerEvents: 'none',
    },

    focus: {
      composes: 'ripple--focus',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0,
      backgroundColor: props => props.focusColor,
      transitionProperty: 'background-color, opacity, transform',
      transition: '140ms linear',
    },

    waveContainer: {
      composes: 'ripple--wave-container',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      overflow: 'hidden',
    },

    wave: {
      composes: 'ripple--wave',
      position: 'absolute',
      pointerEvents: 'none',
      opacity: props => props.initialOpacity,
      overflow: 'hidden',
      borderRadius: '50%',
      transform: 'scale(0)',
      willChange: 'opacity, transform',
      animationFillMode: 'forwards',
      transition: 'opacity 140ms linear',
      backgroundColor: props => props.color,
    },
  };

  waves = {};

  /**
   * Emit an event to all of the current active ripples.
   *
   * @private
   */
  emitUpAction() {
    this.props.waves.forEach((wave) => {
      this.waves[wave.id].startFadeOutAnimation();
    });
  }

  /**
   * Emit up actions to all of the waves when the user removes the finger.
   *
   * @private
   */
  handleRelease = () => {
    this.emitUpAction();
  };

  /**
   * Emit up actions to all of the waves when the user moves the mouse away from the ripple.
   * This solves a bug where you click the ripple and move the mouse while still pressed down
   * and then release the mouse. This won't remove the ripple so we remove them when to user
   * moves the mouse away.
   */
  handleMouseLeave = (ev) => {
    this.props.onMouseLeave(ev);

    this.emitUpAction();
  };

  /**
   * Render the waves with all of the required props.
   *
   * @private
   * @returns {JSX[]} - Returns the waves as an array.
   */
  renderWaves() {
    return this.props.waves.map(wave => (
      <Wave
        key={wave.id}
        className={this.props.classes.wave}
        ref={(element) => { this.waves[wave.id] = element; }}
        onFinish={this.props.onAnimationFinish}
        {...wave}
      />
    ));
  }

  render() {
    const {
      classes,
      round,
      nowaves,
      isFocused,
      createRef,
      onDownAction,
      className,
      ...props
    } = this.props;
    const classNames = classnames(className, classes.ripple, {
      'ripple--round': round,
      'ripple--focused': isFocused,
      [classes.noWaves]: nowaves,
    });

    return (
      <EventHandler
        {...getNotDeclaredProps(props, Ripple, Ripple.extraProps)}
        component="span"
        role="presentation"
        className={classNames}
        createRef={createRef}
        onPress={onDownAction}
        onRelease={this.handleRelease}
        onMouseLeave={this.handleMouseLeave}
      >
        <span className={classes.focus} />

        <span className={classes.waveContainer}>
          {this.renderWaves()}
        </span>
      </EventHandler>
    );
  }
}

export default injectSheet(Ripple.styles)(Ripple);
