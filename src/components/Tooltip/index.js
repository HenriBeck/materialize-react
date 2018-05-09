// @flow strict

import React, { type Node } from 'react';

import Sheet, { type Data } from './Sheet';

type Position = 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';
type Props = {
  children: Node,
  content: Node,
  position: Position,
};
type State = { show: boolean };

export type { Position };

export default class Tooltip extends React.PureComponent<Props, State> {
  state = { show: false };

  handleMouseEnter = () => {
    this.setState({ show: true });
  };

  handleMouseLeave = () => {
    this.setState({ show: false });
  };

  render() {
    const data: Data = {
      position: this.props.position,
      show: this.state.show,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <div
            className={classes.container}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {this.props.children}

            <div className={classes.tooltip}>
              {this.props.content}
            </div>
          </div>
        )}
      </Sheet>
    );
  }
}
