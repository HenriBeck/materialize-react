// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';
import { getActiveColor } from '../../theme/utils';

import Label from './Label';
import HelperText from './HelperText';

type Props = {
  label: Node,
  value: string,
  onChange: (ev: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  disabled: boolean,
  error: Node,
  helperText: Node,
  color: 'primary' | 'accent',
  className: string,
};
type State = { isFocused: boolean };
type Data = {
  disabled: boolean,
  color: 'primary' | 'accent',
  isFocused: boolean,
  hasError: boolean,
};

const Sheet = createSheet('TextArea', (theme: Theme) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '4px 8px',
    },

    textareaContainer: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 4,
      padding: 4,
      borderStyle: 'solid',
      backgroundColor: (data: Data) => (data.disabled ? theme.divider : 'transparent'),
      margin: (data: Data) => (data.isFocused || data.hasError ? '0 0 8px 0' : '1px 1px 9px 1px'),
      borderWidth: (data: Data) => (data.isFocused || data.hasError ? 2 : 1),
      borderColor(data) {
        if (data.disabled) {
          return theme.disabled;
        } else if (data.hasError) {
          return theme.error;
        } else if (data.isFocused) {
          return getActiveColor(theme, data.color);
        }

        return theme.text.secondary;
      },
    },

    textarea: {
      background: 'transparent',
      outline: 0,
      border: 0,
      margin: 0,
      padding: 0,
      resize: 'none',
      caretColor: (data: Data) => getActiveColor(theme, data.color),
      color: (data: Data) => (data.disabled ? theme.disabled : theme.text.primary),
    },
  };
});

export default class TextArea extends React.PureComponent<Props, State> {
  static propTypes = {
    label: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.node,
    helperText: PropTypes.node,
    color: PropTypes.oneOf(['primary', 'accent']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    error: null,
    helperText: null,
    disabled: false,
    color: 'primary',
    className: '',
  };

  state = { isFocused: false };

  id = Math
    .random()
    .toString(36)
    .slice(2);

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const data: Data = {
      isFocused: this.state.isFocused,
      disabled: this.props.disabled,
      hasError: this.props.error !== null,
      color: this.props.color,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span
            className={`${classes.container} ${this.props.className}`}
            {...getNotDeclaredProps(this.props, TextArea)}
          >
            <span className={classes.textareaContainer}>
              <Label
                id={this.id}
                hasValue={this.props.value.length > 0}
                isFocused={this.state.isFocused}
                disabled={this.props.disabled}
                hasError={this.props.error !== null}
                color={this.props.color}
              >
                {this.props.label}
              </Label>

              <textarea
                id={this.id}
                value={this.props.value}
                disabled={this.props.disabled}
                className={classes.textarea}
                onChange={this.props.onChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
            </span>

            <HelperText error={this.props.error}>
              {this.props.helperText}
            </HelperText>
          </span>
        )}
      </Sheet>
    );
  }
}
