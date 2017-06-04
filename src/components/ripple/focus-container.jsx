import React from 'react';
import PropTypes from 'prop-types';

export default class FocusContainer extends React.PureComponent {
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    round: PropTypes.bool.isRequired,
    opacity: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  };

  static animationOptions = {
    duration: 180,
    fill: 'forwards',
  };

  componentDidMount() {
    this.calculateBackgroundColor();

    if (this.props.isFocused) {
      this.addFocus();
    }
  }

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

  calculateBackgroundColor() {
    const color = window.getComputedStyle(this.element).color;

    this.element.style.backgroundColor = this.props.color || color;
  }

  addFocus() {
    const animations = { opacity: [0, this.props.opacity] };

    if (this.props.round) {
      animations.transform = ['scale(0)', 'scale(1)'];
    }

    this.element.animate(animations, FocusContainer.animationOptions);
  }

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
