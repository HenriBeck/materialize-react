import React, {
  PureComponent,
  PropTypes,
} from 'react';

import getNotDeclaredProps from 'utils/react/get-not-declared-props';
import { easeInOutCubic } from 'styles/timings';
import Stylesheet from 'styles/stylesheet';

export default class Parallax extends PureComponent {
  static propTypes = {
    image: PropTypes.string.isRequired,
    children: PropTypes.node,
    style: PropTypes.object,
  };

  static defaultProps = {
    children: '',
    style: {},
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  lastEvent = 0;

  get styles() {
    return Stylesheet.compile({
      root: {
        position: 'relative',
        overflow: 'hidden',
        ...this.props.style,
      },

      image: {
        position: ['absolute', 0, 0, 0, 'auto'],
        transition: `transform 200ms ${easeInOutCubic}`,
        zIndex: 0,
        willChange: 'transform',
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
    const currentDate = new Date();

    if (currentDate - this.lastEvent > 200) {
      this.lastEvent = currentDate;

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
    }
  };

  render() {
    const {
      image,
      children,
    } = this.props;
    const styles = this.styles;

    return (
      <div
        {...getNotDeclaredProps(this)}
        ref={(element) => { this.root = element; }}
        style={styles.root}
      >
        <img
          width="100%"
          src={image}
          alt="parallax"
          ref={(element) => { this.image = element; }}
          style={styles.image}
        />

        <div style={styles.content}>
          {children}
        </div>
      </div>
    );
  }
}
