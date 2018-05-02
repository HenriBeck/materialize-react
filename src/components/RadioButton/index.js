// @flow strict

import React from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';
import subscribeToContext from 'react-context-subscriber';

import Ripple from '../Ripple';
import { Context } from '../RadioButtonGroup';
import {
  ENTER,
  SPACE_BAR,
} from '../../utils/constants';

import Sheet, { type Data } from './Sheet';

type Props = {
  name: string,
  context: {
    onChange: (name: string) => void,
    selected: string,
  },
  disabled: boolean,
  noink: boolean,
  className: string,
  color: 'primary' | 'accent',
};
type State = { isFocused: boolean };

class RadioButton extends React.PureComponent<Props, State> {
  static defaultProps = {
    disabled: false,
    noink: false,
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

  handlePress = () => {
    this.props.context.onChange(this.props.name);
  };

  handleKeyUp = (ev: SyntheticKeyboardEvent<HTMLSpanElement>) => {
    if (ev.keyCode === SPACE_BAR || ev.keyCode === ENTER) {
      this.handlePress();
    }
  };

  /**
   * Support for the Label component.
   */
  handleClick = (ev: SyntheticMouseEvent<HTMLSpanElement>) => {
    if (ev.target === ev.currentTarget) {
      this.handlePress();
    }
  };

  render() {
    const selected = this.props.context.selected === this.props.name;
    const data: Data = {
      selected,
      disabled: this.props.disabled,
      color: this.props.color,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span
            {...getNotDeclaredProps(this.props, RadioButton)}
            role="radio"
            tabIndex={this.props.disabled ? -1 : 0}
            className={`${classes.radioButton} ${this.props.className}`}
            aria-checked={selected}
            aria-disabled={this.props.disabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyUp={this.handleKeyUp}
            onClick={this.handleClick}
          >
            <span className={classes.border} />

            <span className={classes.circle} />

            <Ripple
              round
              center
              isFocused={this.state.isFocused}
              nowaves={this.props.noink}
              className={classes.ripple}
              onPress={this.handlePress}
            />
          </span>
        )}
      </Sheet>
    );
  }
}

export default subscribeToContext(Context.Consumer)(RadioButton);
