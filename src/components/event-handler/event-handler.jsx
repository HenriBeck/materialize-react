import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';

import getNotDeclaredProps from '../../utils/react/get-not-declared-props';

/**
 * A component to make handling of mouse, key and touch events easier.
 *
 * @private
 * @class
 */
export default class EventHandler extends PureComponent {
  static propTypes = {
    component: PropTypes.string.isRequired,
    children: PropTypes.node,
    onPress: PropTypes.func, // eslint-disable-line react/require-default-props
    onRelease: PropTypes.func, // eslint-disable-line react/require-default-props
    onKeyPress: PropTypes.func, // eslint-disable-line react/require-default-props
    onKeyDown: PropTypes.func, // eslint-disable-line react/require-default-props
    onKeyUp: PropTypes.func, // eslint-disable-line react/require-default-props
    onTouchStart: PropTypes.func, // eslint-disable-line react/require-default-props
    onTouchEnd: PropTypes.func, // eslint-disable-line react/require-default-props
    onMouseDown: PropTypes.func, // eslint-disable-line react/require-default-props
    onMouseUp: PropTypes.func, // eslint-disable-line react/require-default-props
  };

  static defaultProps = { children: '' };

  isPressingKey = false;
  isTouchStartEvent = false;
  isTouchEndEvent = false;

  /**
   * Call the onKeyDown prop if the user passed one
   * and check if this is the first event of a key press.
   */
  handleKeyDown = (ev) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    if (!this.isPressingKey) {
      this.props.onKeyPress(ev);

      this.isPressingKey = true;
    }
  };

  /**
   * Reset the isPressingKey property and call the onKeyUp prop if necessary.
   */
  handleKeyUp = (ev) => {
    this.isPressingKey = false;

    if (this.props.onKeyUp) {
      this.props.onKeyUp(ev);
    }
  };

  /**
   * Call the onMouseDown prop if necessary and check if no touch start event has happened before.
   */
  handleMouseDown = (ev) => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(ev);
    }

    if (!this.isTouchStartEvent) {
      this.props.onPress(ev);
    }

    this.isTouchStartEvent = false;
  };

  /**
   * Call the onMouseUp prop if necessary and check if no touch end event has happened before.
   */
  handleMouseUp = (ev) => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(ev);
    }

    if (!this.isTouchEndEvent) {
      this.props.onRelease(ev);
    }

    this.isTouchEndEvent = false;
  };

  /**
   * Call the onTouchStart prop if necessary and the onPress prop
   * and change the isTouchStartEvent property to true.
   */
  handleTouchStart = (ev) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(ev);
    }

    this.props.onPress(ev);

    this.isTouchStartEvent = true;
  };

  /**
   * Call the onTouchEnd prop if necessary and the onRelease prop
   * and set the isTouchEndEvent property to true.
   */
  handleTouchEnd = (ev) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(ev);
    }

    this.props.onRelease(ev);

    this.isTouchEndEvent = true;
  };

  render() {
    const { component: Component } = this.props;
    const events = pick(this.props, [
      'onKeyDown',
      'onKeyUp',
      'onTouchStart',
      'onTouchEnd',
      'onMouseDown',
      'onMouseUp',
    ]);

    // We only apply our custom handlers if necessary
    if (this.props.onKeyPress) {
      events.onKeyDown = this.handleKeyDown;
      events.onKeyUp = this.handleKeyUp;
    }

    if (this.props.onPress) {
      events.onMouseDown = this.handleMouseDown;
      events.onTouchStart = this.handleTouchStart;
    }

    if (this.props.onRelease) {
      events.onMouseUp = this.handleMouseUp;
      events.onTouchEnd = this.handleTouchEnd;
    }

    return (
      <Component
        {...getNotDeclaredProps(this, EventHandler)}
        {...events}
      >
        {this.props.children}
      </Component>
    );
  }
}
