// @flow strict-local

import React from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  active: boolean,
  className: string,
  color: 'primary' | 'accent',
};
type State = { animationName: string | null };

export default class Spinner extends React.PureComponent<Props, State> {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.oneOf([
      'primary',
      'accent',
    ]),
  };

  static defaultProps = {
    active: false,
    className: '',
    color: 'primary',
  };

  static getDerivedStateFromProps(nextProps: Props, state: State): State | null {
    if (state.animationName === null && !nextProps.active) {
      return null;
    }

    return { animationName: `Spinner--fade-${nextProps.active ? 'in' : 'out'}` };
  }

  state = { animationName: null };

  render() {
    const data: Data = {
      color: this.props.color,
      animationName: this.state.animationName,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <div
            {...getNotDeclaredProps(this.props, Spinner)}
            className={`${classes.spinner} ${this.props.className}`}
          >
            <div className={classes.container}>
              <div className={classes.layer}>
                <div className={classes.clipperLeft} />
                <div className={classes.clipperRight} />
              </div>
            </div>
          </div>
        )}
      </Sheet>
    );
  }
}

