// @flow strict

import React from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Ripple from '../Ripple';
import Icon from '../Icon';
import {
  ENTER,
  SPACE_BAR,
} from '../../utils/constants';

import Sheet, { type Data } from './Sheet';

type Props = {
  checked: boolean,
  onChange: () => void,
  disabled: boolean,
  className: string,
  color: 'primary' | 'accent',
};
type State = { isFocused: boolean };

export default class Checkbox extends React.PureComponent<Props, State> {
  static defaultProps = {
    disabled: false,
    className: '',
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
    if (ev.keyCode === SPACE_BAR || ev.keyCode === ENTER) {
      this.props.onChange();
    }
  };

  /**
   * Support for the label click.
   */
  handleClick = (ev: SyntheticKeyboardEvent<HTMLSpanElement>) => {
    if (ev.target === ev.currentTarget) {
      this.props.onChange();
    }
  };

  render() {
    const data: Data = {
      disabled: this.props.disabled,
      checked: this.props.checked,
      color: this.props.color,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span
            {...getNotDeclaredProps(this.props, Checkbox)}
            role="checkbox"
            tabIndex={this.props.disabled ? -1 : 0}
            aria-disabled={this.props.disabled}
            aria-checked={this.props.checked}
            className={`${classes.checkbox} ${this.props.className}`}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
          >
            <Icon
              size={24}
              className={classes.icon}
            >
              {this.props.checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
            </Icon>

            <Ripple
              round
              center
              isFocused={this.state.isFocused}
              onPress={this.props.onChange}
            />
          </span>
        )}
      </Sheet>
    );
  }
}
