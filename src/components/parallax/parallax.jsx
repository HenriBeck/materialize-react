import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';
import { easeInOutCubic } from '../../styles/timings';
import warning from '../../utils/warning';

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
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Warn against changing the img prop.
   */
  componentWillReceiveProps(nextProps) {
    warning(
      nextProps.img !== this.props.img,
      'You should not change the img prop of the Parallax',
    );
  }

  /**
   * Remove the event listener again.
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Compute some static values which don't change when the user scrolls.
   *
   * @private
   */
  computeValues() {
    this.rootHeight = this.root.getBoundingClientRect().height;
    this.imageHeight = this.image.getBoundingClientRect().height;
    this.pixelsToScroll = window.innerHeight - this.rootHeight;
    this.overflowImageHeight = this.imageHeight - this.rootHeight;
  }

  /**
   * Reposition the image based on the current scroll position.
   *
   * @private
   */
  positionImage() {
    const {
      top,
      bottom,
    } = this.root.getBoundingClientRect();
    const { innerHeight } = window;

    // Check if the parallax is completely visible
    if (top >= 0 && bottom <= innerHeight) {
      const scrollPos = 1 - Math.abs((innerHeight - this.rootHeight - top) / this.pixelsToScroll);
      const transform = scrollPos * this.overflowImageHeight;

      this.image.style.transform = `translate3D(0, ${-transform}px, 0)`;
    }
  }

  /**
   * Recompute the static values and reposition the image.
   *
   * @private
   */
  handleResize = () => {
    this.computeValues();

    this.positionImage();
  };

  /**
   * Update the image position on a scroll event.
   * Only update it when the root element is completely visible.
   *
   * @private
   */
  handleScroll = () => {
    this.positionImage();
  };

  /**
   * When the img loads we initially compute the values because when we would do it
   * in componentDidMount, the img wouldn't have loaded then which meant that the img height is 0.
   */
  handleImgLoad = () => {
    this.computeValues();

    this.image.style.transform = `translate3D(0, ${-this.overflowImageHeight}px, 0)`;

    this.positionImage();
  };

  render() {
    const {
      classes,
      img,
      className,
      children,
      ...props
    } = this.props;

    return (
      <div
        {...getNotDeclaredProps(props, Parallax)}
        role="presentation"
        className={`${classes.root} ${className}`}
        ref={(element) => { this.root = element; }}
      >
        <img
          width="100%"
          src={img}
          className={classes.image}
          alt="parallax"
          ref={(element) => { this.image = element; }}
          onLoad={this.handleImgLoad}
        />

        <div className={classes.content}>
          {children}
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
