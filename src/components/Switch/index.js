// @flow strict

import React from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Ripple from '../Ripple';
import {
  ENTER,
  SPACE_BAR,
} from '../../utils/constants';

import Sheet, { type Data } from './Sheet';

type Props = {
  toggled: boolean,
  onChange: () => void,
  className: string,
  disabled: boolean,
  noink: boolean,
  color: 'primary' | 'accent',
};
type State = { isFocused: boolean };

export default class Switch extends React.PureComponent<Props, State> {
  static propTypes = {
    toggled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    color: PropTypes.oneOf([
      'primary',
      'accent',
    ]),
  };

  static defaultProps = {
    className: '',
    disabled: false,
    noink: false,
    color: 'primary',
  };

  state = { isFocused: false };

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  handleKeyUp = (ev: SyntheticKeyboardEvent<HTMLSpanElement>) => {
    if (ev.keyCode === ENTER || ev.keyCode === SPACE_BAR) {
      this.props.onChange();
    }
  };

  handleClick = (ev: SyntheticMouseEvent<HTMLSpanElement>) => {
    if (ev.target === ev.currentTarget) {
      this.props.onChange();
    }
  };

  render() {
    const data: Data = {
      toggled: this.props.toggled,
      disabled: this.props.disabled,
      color: this.props.color,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span
            {...getNotDeclaredProps(this.props, Switch)}
            role="switch"
            className={`${classes.switch} ${this.props.className}`}
            aria-checked={this.props.toggled}
            aria-disabled={this.props.disabled}
            tabIndex={this.props.disabled ? -1 : 0}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
          >
            <span className={classes.track} />

            <span className={classes.thumb}>
              <Ripple
                round
                center
                nowaves={this.props.noink}
                isFocused={this.state.isFocused}
                className={classes.ripple}
                onPress={this.props.onChange}
              />
            </span>
          </span>
        )}
      </Sheet>
    );
  }
}
