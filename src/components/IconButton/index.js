// @flow strict

import React, {
  type Element,
  type ElementType,
} from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Ripple from '../Ripple';
import {
  ENTER,
  SPACE_BAR,
} from '../../utils/constants';

import Sheet, { type Data } from './Sheet';

type Props = {
  children: Element<ElementType>,
  onPress: () => void,
  disabled: boolean,
  noink: boolean,
  className: string,
  size: number,
};
type State = { isFocused: boolean };

export default class IconButton extends React.PureComponent<Props, State> {
  static defaultProps = {
    disabled: false,
    noink: false,
    className: '',
    size: 48,
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  handleKeyUp = (ev: SyntheticKeyboardEvent<HTMLSpanElement>) => {
    if (ev.keyCode === SPACE_BAR || ev.keyCode === ENTER) {
      this.props.onPress();
    }
  };

  render() {
    const data: Data = {
      disabled: this.props.disabled,
      size: this.props.size,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span
            {...getNotDeclaredProps(this.props, IconButton)}
            role="button"
            className={`${classes.iconButton} ${this.props.className}`}
            aria-disabled={this.props.disabled}
            tabIndex={this.props.disabled ? -1 : 0}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <Ripple
              round
              center
              nowaves={this.props.noink}
              isFocused={this.state.isFocused}
              onPress={this.props.onPress}
            />

            {React.cloneElement(this.props.children, { disabled: this.props.disabled })}
          </span>
        )}
      </Sheet>
    );
  }
}
