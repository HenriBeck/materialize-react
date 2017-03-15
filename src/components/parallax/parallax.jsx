import React, {
  PureComponent,
  PropTypes,
} from 'react';

import getNotDeclaredProps from '/src/utils/react/get-not-declared-props';
import { easeInOutCubic } from '/src/styles/timings';
import Stylesheet from '/src/styles/stylesheet';

export default class Parallax extends PureComponent {
  static propTypes = {
    img: PropTypes.string.isRequired,
    imgStyle: PropTypes.object,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    imgStyle: {},
    children: '',
    style: {},
    className: '',
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        position: 'relative',
        overflow: 'hidden',
        ...this.props.style,
      },

      image: {
        position: ['absolute', 0, 0, 0, 'auto'],
        transition: `transform 10ms ${easeInOutCubic}`,
        zIndex: 0,
        willChange: 'transform',
        ...this.props.imgStyle,
      },

      content: { zIndex: 1 },
    });
  }

  get isVisible() {
    const {
      top,
      bottom,
    } = this.root.getBoundingClientRect();

    return top >= 0 && bottom <= window.innerHeight;
  }

  onScroll = () => {
    if (this.isVisible) {
      const {
        height,
        top,
      } = this.root.getBoundingClientRect();
      const imageHeight = this.image.getBoundingClientRect().height;
      const overflowImageHeight = imageHeight - height;
      const { innerHeight } = window;
      const scrollPos = Math.abs((innerHeight - height - top) / (innerHeight - height));
      const transform = Math.min(scrollPos * overflowImageHeight, overflowImageHeight);

      this.image.style.transform = `translate3D(0, ${-transform}px, 0)`;
      this.image.style.webkitTransform = `translate(0, ${-transform}px)`;
    }
  };

  render() {
    const styles = this.styles;

    return (
      <div
        {...getNotDeclaredProps(this, Parallax)}
        className={`parallax ${this.props.className}`}
        style={styles.root}
        ref={(element) => { this.root = element; }}
      >
        <img
          width="100%"
          src={this.props.img}
          className="parallax--image"
          alt="parallax"
          ref={(element) => { this.image = element; }}
          style={styles.image}
        />

        <div
          className="parallax--content"
          style={styles.content}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
