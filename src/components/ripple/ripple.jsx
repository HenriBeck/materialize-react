import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Wave from './wave';
import FocusContainer from './focus-container';

/**
 * The presentation container for the ripple.
 *
 * @private
 * @class
 * @extends PureComponent
 */
export default class Ripple extends PureComponent {
  static propTypes = {
    waves: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    focusOpacity: PropTypes.number.isRequired,
    focusColor: PropTypes.string.isRequired,
    round: PropTypes.bool.isRequired,
    onDownAction: PropTypes.func.isRequired,
    onAnimationFinish: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
    onTouchStart: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
  };

  waves = {};
  isTouchEvent = false;

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
   * Add a wave when the user clicks inside.
   *
   * @private
   */
  handleMouseDown = (ev) => {
    this.props.onMouseDown(ev);

    if (this.isTouchEvent) {
      this.isTouchEvent = false;

      return;
    }

    this.props.onDownAction(ev);
  };

  /**
   * Emit up actions to all of the waves.
   *
   * @private
   */
  handleMouseUp = (ev) => {
    this.props.onMouseUp(ev);

    this.emitUpAction();
  };

  /**
   * Create a new wave when the user touches the element.
   *
   * @private
   */
  handleTouchStart = (ev) => {
    this.isTouchEvent = true;

    this.props.onTouchStart(ev);

    this.props.onDownAction(ev);
  };

  /**
   * Emit up actions to all of the waves when the user removes the finger.
   *
   * @private
   */
  handleTouchEnd = (ev) => {
    this.props.onTouchEnd(ev);

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
        classes={this.props.classes}
        onFinish={this.props.onAnimationFinish}
        ref={(element) => { this.waves[wave.id] = element; }}
        {...wave}
      />
    ));
  }

  render() {
    return (
      <span
        role="presentation"
        className={`${this.props.className} ${this.props.classes.ripple}`}
        ref={(element) => { this.root = element; }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onMouseLeave={this.handleMouseLeave}
      >
        <FocusContainer
          classes={this.props.classes}
          round={this.props.round}
          opacity={this.props.focusOpacity}
          isFocused={this.props.isFocused}
          color={this.props.focusColor}
        />

        <span className={this.props.classes.waveContainer}>
          {this.renderWaves()}
        </span>
      </span>
    );
  }
}
