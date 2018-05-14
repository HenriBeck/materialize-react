// @flow strict-local

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Ripple from '../Ripple';
import Typography from '../Typography';
import {
  ENTER,
  SPACE_BAR,
} from '../../utils/constants';

import Sheet, { type Data } from './Sheet';

type Props = {
  children: Node,
  onPress: () => void,
  disabled: boolean,
  raised: boolean,
  noink: boolean,
  className: string,
  color: 'primary' | 'accent' | null,
};
type State = { isFocused: boolean };

export default class Button extends React.PureComponent<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    raised: PropTypes.bool,
    noink: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'accent']),
  };

  static defaultProps = {
    disabled: false,
    raised: false,
    noink: false,
    className: '',
    color: null,
  };

  state = { isFocused: false };

  getColor() {
    if (this.props.disabled) {
      return 'disabled';
    } else if (this.props.raised) {
      return null;
    }

    return this.props.color;
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  handleKeyUp = (ev: SyntheticKeyboardEvent<HTMLButtonElement>) => {
    if (ev.keyCode === SPACE_BAR || ev.keyCode === ENTER) {
      this.props.onPress();
    }
  };

  render() {
    const data: Data = {
      disabled: this.props.disabled,
      raised: this.props.raised,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <Typography
            {...getNotDeclaredProps(this.props, Button)}
            typography="button"
            role="button"
            element="button"
            color={this.getColor()}
            className={`${classes.button} ${this.props.className}`}
            tabIndex={this.props.disabled ? -1 : 0}
            aria-disabled={this.props.disabled}
            disabled={this.props.disabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyUp={this.handleKeyUp}
          >
            <Ripple
              isFocused={this.state.isFocused}
              focusColor={this.props.raised ? '#000000' : 'currentColor'}
              nowaves={this.props.noink}
              onPress={this.props.onPress}
            />

            {this.props.children}
          </Typography>
        )}
      </Sheet>
    );
  }
}
