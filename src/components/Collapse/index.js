// @flow strict

import React, { type Node } from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  isOpen: boolean,
  className: string,
};

const Sheet = createSheet('Collapse', {
  content: {
    willChange: 'height',
    height: 0,
    overflow: 'hidden',
    transition: 'height 240ms linear',
  },
});

export default class Collapse extends React.PureComponent<Props> {
  static defaultProps = { className: '' };

  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.isOpen !== prevProps.isOpen && this.content.current) {
      this.content.current.style.height = `${this.content.current.scrollHeight}px`;

      if (!this.props.isOpen) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            this.close();
          }, 0);
        });
      }
    }
  }

  content = React.createRef();

  close = () => {
    if (this.content.current) {
      this.content.current.style.height = 0;
      this.content.current.style.overflow = 'hidden';
    }
  };

  open = () => {
    if (this.content.current) {
      this.content.current.style.height = 'auto';
      this.content.current.style.overflow = 'visible';
    }
  };

  handleTransitionEnd = () => {
    if (this.props.isOpen) {
      this.open();
    }
  };

  render() {
    return (
      <Sheet>
        {({ classes }) => (
          <div
            {...getNotDeclaredProps(this.props, Collapse)}
            aria-hidden={this.props.isOpen}
            className={`${classes.content} ${this.props.className}`}
            ref={this.content}
            onTransitionEnd={this.handleTransitionEnd}
          >
            {this.props.children}
          </div>
        )}
      </Sheet>
    );
  }
}
