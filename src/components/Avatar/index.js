// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  type: 'img' | 'name',
  size: string | number,
  src: string,
  children: Node,
  bgColor: string,
  className: string,
};

export default class Avatar extends React.Component<Props> {
  static propTypes = {
    type: PropTypes.oneOf(['img', 'name']).isRequired,
    src: PropTypes.string,
    bgColor: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    size: '100%',
    src: '',
    bgColor: '',
    children: '',
    className: '',
  };

  renderImageAvatar() {
    const data: Data = {
      type: 'img',
      size: this.props.size,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <img
            alt="Avatar"
            src={this.props.src}
            className={`${classes.avatar} ${this.props.className}`}
            {...getNotDeclaredProps(this.props, Avatar)}
          />
        )}
      </Sheet>
    );
  }

  renderNameAvatar() {
    const data: Data = {
      type: 'name',
      size: this.props.size,
      bgColor: this.props.bgColor,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span
            className={`${classes.avatar} ${this.props.className}`}
            {...getNotDeclaredProps(this.props, Avatar)}
          >
            {this.props.children}
          </span>
        )}
      </Sheet>
    );
  }

  render() {
    switch (this.props.type) {
      case 'img':
        return this.renderImageAvatar();
      case 'name':
        return this.renderNameAvatar();
      default:
        return null;
    }
  }
}
