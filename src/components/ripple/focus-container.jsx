import React from 'react';
import PropTypes from 'prop-types';

/**
 * The element that displays if the element that hosts the ripple has focus.
 *
 * @private
 * @class
 * @extends PureComponent
 */
export default class FocusContainer extends React.PureComponent {
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    round: PropTypes.bool.isRequired,
    opacity: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  };

  static animationOptions = {
    duration: 140,
    fill: 'forwards',
  };

  /**
   * Calculate the initial background color.
   */
  componentDidMount() {
    this.calculateBackgroundColor();

    if (this.props.isFocused) {
      this.addFocus();
    }
  }

  /**
   * Recalculate the background color and add or remove the focus.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      if (this.props.isFocused) {
        this.calculateBackgroundColor();

        this.addFocus();
      } else {
        this.removeFocus();
      }
    }

    if (prevProps.color !== this.props.color) {
      if (this.props.isFocused) {
        this.element.animate(
          { backgroundColor: [prevProps.color, this.props.color] },
          FocusContainer.animationOptions,
        );
      }
    }
  }

  /**
   * Calculate and change the background color.
   *
   * @private
   */
  calculateBackgroundColor() {
    const color = window.getComputedStyle(this.element).color;

    this.element.style.backgroundColor = this.props.color || color;
  }

  /**
   * Animate the element in.
   *
   * @private
   */
  addFocus() {
    const animations = { opacity: [0, this.props.opacity] };

    if (this.props.round) {
      animations.transform = ['scale(0)', 'scale(1)'];
    }

    this.element.animate(animations, FocusContainer.animationOptions);
  }

  /**
   * Animation the element out.
   *
   * @private
   */
  removeFocus() {
    const animations = { opacity: [this.props.opacity, 0] };

    if (this.props.round) {
      animations.transform = ['scale(1)', 'scale(0)'];
    }

    this.element.animate(animations, FocusContainer.animationOptions);
  }

  render() {
    return (
      <span
        className={this.props.classes.focus}
        ref={(element) => { this.element = element; }}
      />
    );
  }
}
