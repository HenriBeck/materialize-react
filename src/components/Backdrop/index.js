// @flow strict-local

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

  state = { animationName: null };

  static getDerivedStateFromProps(nextProps: Props, state: State) {
    if (state.animationName === null && !nextProps.active) {
      return null;
    }

    return { animationName: `Backdrop--animate-${nextProps.active ? 'in' : 'out'}` };
  }

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
