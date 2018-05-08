// @flow strict

import React, { type Node } from 'react';

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
  location: Position,
};

export default class Tooltip extends React.PureComponent<Props> {
  render() {

  }
}
