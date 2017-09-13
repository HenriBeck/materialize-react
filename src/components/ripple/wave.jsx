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
    className: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    style: PropTypes.shape({
      height: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
      width: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
      top: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
      left: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
      opacity: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
    }).isRequired,
    onFinish: PropTypes.func.isRequired,
    animatingOut: PropTypes.bool.isRequired,
  };

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
        className={this.props.className}
        style={{
          ...this.props.style,
          opacity: this.props.animatingOut ? 0 : this.props.style.opacity,
        }}
        ref={(element) => { this.wave = element; }}
        onTransitionEnd={this.handleTransitionEnd}
      />
    );
  }
}
