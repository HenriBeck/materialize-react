import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Wave from './wave';
import FocusContainer from './focus-container';
import EventHandler from '../event-handler';

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
    onMouseLeave: PropTypes.func.isRequired,
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
   * A function which will be called with the element from EventHandler.
   *
   * @param {Object} element - The root element from EventHandler.
   */
  createRef = (element) => {
    this.root = element;
  };

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
        classes={this.props.classes}
        onFinish={this.props.onAnimationFinish}
        ref={(element) => { this.waves[wave.id] = element; }}
        {...wave}
      />
    ));
  }

  render() {
    return (
      <EventHandler
        component="span"
        role="presentation"
        className={`${this.props.className} ${this.props.classes.ripple}`}
        createRef={this.createRef}
        onPress={this.props.onDownAction}
        onRelease={this.handleRelease}
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
      </EventHandler>
    );
  }
}
