import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import { easeInOutCubic } from '../../styles/timings';
import injectSheet from '../../styles/jss';

/**
 * A component to render a parallax effect.
 *
 * @class
 * @extends PureComponent
 */
export class Parallax extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    img: PropTypes.string.isRequired,
    imgStyle: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    imgStyle: {},
    children: '',
    className: '',
  };

  /**
   * Add the event listener for when the user scrolls.
   */
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  /**
   * Remove the event listener again.
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  /**
   * Check if the root element is currently completely visible.
   *
   * @private
   * @returns {Boolean} - Returns whether the component is visible.
   */
  get isVisible() {
    const {
      top,
      bottom,
    } = this.root.getBoundingClientRect();

    return top >= 0 && bottom <= window.innerHeight;
  }

  /**
   * Update the image position on a scroll event.
   * Only update it when the root element is completely visible.
   *
   * @private
   */
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
    }
  };

  render() {
    return (
      <div
        {...getNotDeclaredProps(this, Parallax)}
        role="presentation"
        className={`${this.props.classes.root} ${this.props.className}`}
        ref={(element) => { this.root = element; }}
      >
        <img
          width="100%"
          src={this.props.img}
          className={this.props.classes.image}
          alt="parallax"
          ref={(element) => { this.image = element; }}
          style={this.props.imgStyle}
        />

        <div className={this.props.classes.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    composes: 'parallax',
    position: 'relative',
    overflow: 'hidden',
  },

  image: {
    composes: 'parallax--image',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 'auto',
    left: 0,
    transition: `transform 8ms ${easeInOutCubic}`,
    zIndex: 0,
    willChange: 'transform',
  },

  content: {
    composes: 'parallax--content',
    zIndex: 1,
  },
};

export default injectSheet(styles)(Parallax);
