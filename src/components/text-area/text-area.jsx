import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { pipe } from '../../utils/functions';
import withFocusedState from '../../utils/with-focused-state';
import HelperText from '../text-field/helper-text';

import Label from './label';

/**
 * The textarea component.
 *
 * @class
 */
class TextArea extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      textareaContainer: PropTypes.string.isRequired,
      textarea: PropTypes.string.isRequired,
      disabled: PropTypes.string.isRequired,
      withError: PropTypes.string.isRequired,
      focused: PropTypes.string.isRequired,
      textareaDisabled: PropTypes.string.isRequired,
    }).isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    helperText: PropTypes.string,
    textareaProps: PropTypes.shape({}),
  };

  static defaultProps = {
    error: '',
    helperText: '',
    disabled: false,
    textareaProps: {},
  };

  /**
   * The styles for the textarea component.
   *
   * @param {Object} theme - The theme object provided by Jss.
   * @returns {Object} - Returns the styles for the component.
   */
  static styles(theme) {
    const disabledBgColors = {
      light: 'rgba(0, 0, 0, 0.05)',
      dark: 'rgba(255, 255, 255, 0.05)',
    };

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
        border: '1px solid',
        margin: '0 0 8px 0',
        backgroundColor: 'transparent',
        borderColor: theme.secondaryTextColor,
        transition: 'border-width 140ms',
      },

      focused: {
        borderColor: theme.primaryBase,
        borderWidth: 2,
      },

      withError: {
        borderColor: theme.errorColor,
        borderWidth: 2,
      },

      disabled: {
        backgroundColor: disabledBgColors[theme.type],
        borderColor: theme.dividerColor,
      },

      textarea: {
        background: 'transparent',
        outline: 0,
        border: 0,
        margin: 0,
        padding: 0,
        resize: 'none',
        color: theme.textColor,
        caretColor: theme.primaryBase,
      },

      textareaDisabled: { color: theme.disabledColor },
    };
  }

  id = Math
    .random()
    .toString(36)
    .slice(2);

  render() {
    return (
      <span className={this.props.classes.container}>
        <span
          className={classnames(this.props.classes.textareaContainer, {
            [this.props.classes.focused]: this.props.isFocused,
            [this.props.classes.withError]: this.props.error.length > 0,
            [this.props.classes.disabled]: this.props.disabled,
          })}
        >
          <Label
            id={this.id}
            hasValue={this.props.value.length > 0}
            isFocused={this.props.isFocused}
            disabled={this.props.disabled}
            hasError={this.props.error.length > 0}
          >
            {this.props.label}
          </Label>

          <textarea
            {...this.props.textareaProps}
            id={this.id}
            value={this.props.value}
            disabled={this.props.disabled}
            className={classnames(
              this.props.classes.textarea,
              { [this.props.classes.textareaDisabled]: this.props.disabled },
            )}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
        </span>

        <HelperText
          helperText={this.props.helperText}
          error={this.props.error}
        />
      </span>
    );
  }
}

export default pipe(
  injectSheet(TextArea.styles),
  withFocusedState,
)(TextArea);
