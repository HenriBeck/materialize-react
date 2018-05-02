// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';
import Typography from '../Typography';
import { type Theme } from '../../theme/schema';
import { getActiveColor } from '../../theme/utils';

type Props = {
  id: string,
  label: Node,
  color: 'primary' | 'accent',
  isFocused: boolean,
  floatingLabel: boolean,
  placeholder: string,
  suffix: Node,
  prefix: Node,
  disabled: boolean,
  value: string,
  onFocus: () => void,
  onBlur: () => void,
  type: string,
  onChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
};
type Data = {
  color: 'primary' | 'accent',
  disabled: boolean,
};

const Sheet = createSheet('Input', (theme: Theme) => {
  return {
    container: {
      display: 'flex',
      height: 16,
      marginTop: 8,
    },

    input: {
      lineHeight: '16px',
      padding: 0,
      border: 0,
      outline: 0,
      backgroundColor: 'transparent',
      flex: 1,
      caretColor: (data: Data) => getActiveColor(theme, data.color),
      color: (data: Data) => (data.disabled ? theme.text.secondary : theme.text.primary),

      '&::-webkit-input-placeholder': { color: theme.text.secondary },

      '&::-moz-placeholder': { color: theme.text.secondary },
    },

    prefix: {
      lineHeight: '16px',
      paddingRight: 2,
      boxSizing: 'border-box',
    },

    suffix: {
      lineHeight: '16px',
      boxSizing: 'border-box',
      paddingLeft: 2,
    },
  };
});

export default class Input extends React.PureComponent<Props> {
  getPlaceholder() {
    if ((this.props.isFocused && this.props.floatingLabel) || this.props.label === null) {
      return this.props.placeholder;
    }

    return null;
  }

  render() {
    const data: Data = {
      color: this.props.color,
      disabled: this.props.disabled,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span className={classes.container}>
            {this.props.prefix && (
              <Typography
                data-input-prefix
                typography="body"
                className={classes.prefix}
                color={this.props.disabled ? 'disabled' : 'secondary'}
              >
                {this.props.prefix}
              </Typography>
            )}

            <input
              type={this.props.type}
              id={this.props.id}
              placeholder={this.getPlaceholder()}
              value={this.props.value}
              disabled={this.props.disabled}
              className={classes.input}
              onChange={this.props.onChange}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
            />

            {this.props.suffix && (
              <Typography
                typography="body"
                className={classes.suffix}
                color={this.props.disabled ? 'disabled' : 'secondary'}
              >
                {this.props.suffix}
              </Typography>
            )}
          </span>
        )}
      </Sheet>
    );
  }
}
