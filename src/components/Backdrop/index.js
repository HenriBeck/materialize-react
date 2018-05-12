// @flow strict

import React from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  active: boolean,
  className: string,
};
type State = { animationName: string | null };

export default class Backdrop extends React.PureComponent<Props, State> {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = { className: '' };

  // $FlowFixMe: Waiting for typing support for getDerivedStateFromProps
  static getDerivedStateFromProps(nextProps, state) {
    if (state.animationName === null && !nextProps.active) {
      return null;
    }

    return { animationName: `Backdrop--animate-${nextProps.active ? 'in' : 'out'}` };
  }

  state = { animationName: null };

  render() {
    const data: Data = { animationName: this.state.animationName };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span
            className={`${classes.backdrop} ${this.props.className}`}
            {...getNotDeclaredProps(this.props, Backdrop)}
          />
        )}
      </Sheet>
    );
  }
}
