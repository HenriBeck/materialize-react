// @flow strict-local

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Backdrop from '../Backdrop';

import Sheet, { type Data } from './Sheet';

type Props = {
  children: Node,
  drawerContent: Node,
  isOpen: boolean,
  isNarrow: boolean,
  className: string,
  width: number,
  position: 'left' | 'right',
  onCloseRequest: () => void,
};

export default class Drawer extends React.PureComponent<Props> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    drawerContent: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isNarrow: PropTypes.bool.isRequired,
    className: PropTypes.string,
    width: PropTypes.number,
    position: PropTypes.oneOf(['left', 'right']),
    onCloseRequest: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    position: 'left',
    width: 256,
    onCloseRequest: noop,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.isAnimating = true;
    }
  }

  isAnimating = false;

  handleBackdropPress = () => {
    if (this.isAnimating) {
      return;
    }

    this.props.onCloseRequest();
  };

  /**
   * Toggle the backdropFinishedTransitioning when the Backdrop finishes the transition.
   * This fixes a bug we're on mobile the Drawer would immediately close after opening it
   * because the mouse event after the touch event would fire on the Backdrop
   * and not the actual clicked element.
   */
  handleAnimationEnd = () => {
    this.isAnimating = false;
  };

  render() {
    const data: Data = {
      isNarrow: this.props.isNarrow,
      isOpen: this.props.isOpen,
      position: this.props.position,
      width: this.props.width,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <div
            {...getNotDeclaredProps(this.props, Drawer)}
            className={`${classes.drawer} ${this.props.className}`}
          >
            <Backdrop
              active={this.props.isNarrow && this.props.isOpen}
              onClick={this.handleBackdropPress}
              onAnimationEnd={this.handleAnimationEnd}
            />

            <aside className={classes.drawerContent}>
              {this.props.drawerContent}
            </aside>

            <main className={classes.mainContent}>
              {this.props.children}
            </main>
          </div>
        )}
      </Sheet>
    );
  }
}
