import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * A React Component to render a wave.
 *
 * @class
 */
export default class Wave extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    radius: PropTypes.number.isRequired,
    initialOpacity: PropTypes.number.isRequired,
    onFinish: PropTypes.func.isRequired,
  };

  /**
   * Start the scale animation.
   */
  componentDidMount() {
    this.wave.animate([
      { transform: 'scale(0)' },
      { transform: 'scale(1)' },
    ], {
      duration: 180 + this.props.radius * 0.11,
      fill: 'forwards',
    });
  }

  /**
   * Start the fade out animation and call the onFinish prop when the animation has finished
   * so we can remove the element from the dom.
   */
  startFadeOutAnimation() {
    this.animation = this.wave.animate([
      { opacity: this.props.initialOpacity },
      { opacity: 0 },
    ], {
      fill: 'forwards',
      duration: 180,
    });

    this.animation.onfinish = () => this.props.onFinish(this.props.id);
  }

  render() {
    return (
      <span
        className={this.props.classes.wave}
        style={this.props.style}
        ref={(element) => { this.wave = element; }}
      />
    );
  }
}
