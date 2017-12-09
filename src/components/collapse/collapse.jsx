import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which animates the height of it's content.
 *
 * @class
 */
class Collapse extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ content: PropTypes.string.isRequired }).isRequired,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = { className: '' };

  static styles = {
    content: {
      willChange: 'height',
      height: 0,
      overflow: 'hidden',
      transition: 'height 200ms linear',
    },
  };

  /**
   * Open the collapse when the isOpen prop is passed initially.
   */
  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }
  }

  /**
   * Update the contents height when the isOpen prop changes.
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.content.style.height = `${this.content.scrollHeight}px`;

      if (this.props.isOpen) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            this.close();
          }, 0);
        });
      }
    }
  }

  /**
   * Set the content height to 0 and overflow to hidden.
   */
  close = () => {
    this.content.style.height = 0;
    this.content.style.overflow = 'hidden';
  };

  /**
   * Set the content height to auto and overflow to visible so the content displays correctly.
   */
  open = () => {
    this.content.style.height = 'auto';
    this.content.style.overflow = 'visible';
  };

  render() {
    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        {...getNotDeclaredProps(this.props, Collapse)}
        aria-hidden={this.props.isOpen}
        className={`${this.props.classes.content} ${this.props.className}`}
        ref={(element) => { this.content = element; }}
        onTransitionEnd={this.props.isOpen ? this.open : null}
      >
        {this.props.children}
      </div>
    );
  }
}

export default injectSheet(Collapse.styles)(Collapse);
