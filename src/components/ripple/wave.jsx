import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * A React Component to render a wave.
 *
 * @private
 * @class
 * @extends PureComponent
 */
export default class Wave extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    radius: PropTypes.number.isRequired,
    onFinish: PropTypes.func.isRequired,
  };

  /**
   * Start the scale animation.
   */
  componentDidMount() {
    this.wave.style.animationDuration = `${140 + this.props.radius * 0.11}ms`;
    this.wave.style.animationName = 'ripple--scale-in';
  }

  /**
   * Start the fade out animation and call the onFinish prop when the animation has finished
   * so we can remove the element from the dom.
   *
   * @private
   */
  startFadeOutAnimation() {
    this.wave.style.opacity = 0;
  }

  /**
   * When the opacity transition ends we want to call the onFinish prop
   * so the wave elements get's removed from the dom.
   */
  handleTransitionEnd = () => {
    this.props.onFinish(this.props.id);
  };

  render() {
    return (
      <span
        role="presentation"
        className={this.props.classes.wave}
        style={this.props.style}
        onTransitionEnd={this.handleTransitionEnd}
        ref={(element) => { this.wave = element; }}
      />
    );
  }
}
