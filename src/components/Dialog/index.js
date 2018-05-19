// @flow strict-local

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

import Container from './Container';
import Header from './Header';
import Content from './Content';
import Actions from './Actions';

type Props = {
  children: Node,
  isOpen: boolean,
  fullscreen: boolean,
  className: string,
  onCloseRequest: (ev: SyntheticMouseEvent<HTMLDivElement>) => void,
  backdrop: boolean,
};
type State = { animationName: string | null };
type Data = {
  fullscreen: boolean,
  animationName: string | null,
};

const Sheet = createSheet('Dialog', (theme: Theme) => {
  return {
    '@keyframes Dialog--animate-in': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },

    '@keyframes Dialog--animate-out': {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },

    '@keyframes Dialog--animate-in-fullscreen': {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' },
    },

    '@keyframes Dialog--animate-out-fullscreen': {
      from: { transform: 'translateY(0)' },
      to: { transform: 'translateY(100%)' },
    },

    dialog: {
      position: 'absolute',
      backgroundColor: theme.sheet,
      animationDuration: 250,
      animationFillMode: 'forwards',
      zIndex: theme.zIndexes.dialog,
      top: (data: Data) => (data.fullscreen ? 0 : null),
      left: (data: Data) => (data.fullscreen ? 0 : null),
      right: (data: Data) => (data.fullscreen ? 0 : null),
      bottom: (data: Data) => (data.fullscreen ? 0 : null),
      borderRadius: (data: Data) => (data.fullscreen ? 0 : 2),
      boxShadow: (data: Data) => theme.elevation[data.fullscreen ? '0' : '24'],
      opacity: (data: Data) => (data.fullscreen ? 1 : 0),
      transform: (data: Data) => (data.fullscreen ? 'translateY(100%)' : null),
      animationName: (data: Data) => data.animationName,
    },
  };
});

export default class Dialog extends React.PureComponent<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool,
    fullscreen: PropTypes.bool,
    className: PropTypes.string,
    onCloseRequest: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    backdrop: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  };

  static defaultProps = {
    fullscreen: false,
    className: '',
    onCloseRequest: noop,
    backdrop: true,
  };

  static Container = Container;

  static Header = Header;

  static Content = Content;

  static Actions = Actions;

  // $FlowFixMe: Waiting for flow to support fully react 16.3
  static getDerivedStateFromProps(nextProps, state) {
    if (state.animationName === null && !nextProps.isOpen) {
      return null;
    }

    const animationDirection = nextProps.isOpen ? 'in' : 'out';
    const fullscreenSuffix = nextProps.fullscreen ? '-fullscreen' : '';

    return { animationName: `Dialog--animate-${animationDirection}${fullscreenSuffix}` };
  }

  state = { animationName: null };

  render() {
    const data: Data = {
      fullscreen: this.props.fullscreen,
      animationName: this.state.animationName,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <div
            role="dialog"
            aria-hidden={!this.props.isOpen}
            className={`${classes.dialog} ${this.props.className}`}
          >
            {this.props.children}
          </div>
        )}
      </Sheet>
    );
  }
}
