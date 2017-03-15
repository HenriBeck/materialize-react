import React, {
  PropTypes,
  PureComponent,
} from 'react';

export default class Wave extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    radius: PropTypes.number.isRequired,
    initialOpacity: PropTypes.number.isRequired,
    onFinish: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.wave.animate([
      { transform: 'scale(0)' },
      { transform: 'scale(1)' },
    ], {
      duration: 250 + this.props.radius * 0.1,
      fill: 'forwards',
    });
  }

  get style() {
    return {
      position: 'absolute',
      pointerEvents: 'none',
      opacity: this.props.initialOpacity,
      overflow: 'hidden',
      borderRadius: '50%',
      transform: 'scale(0)',
      willChange: 'opacity, transform',
      zIndex: 1,
      ...this.props.style,
    };
  }

  upAction() {
    this.animation = this.wave.animate({
      opacity: [
        this.props.initialOpacity,
        0,
      ],
    }, {
      fill: 'forwards',
      duration: 250,
    });

    this.animation.onfinish = () => this.props.onFinish(this.props.id);
  }

  render() {
    return (
      <span
        className="ripple--wave"
        style={this.style}
        ref={(element) => { this.wave = element; }}
      />
    );
  }
}
