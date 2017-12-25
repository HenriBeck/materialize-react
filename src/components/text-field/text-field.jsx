import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import { pipe } from '../../utils/functions';
import withFocusedState from '../../utils/with-focused-state';
import { body1 } from '../../styles/typography';

import Underline from './underline';
import Label from './label';
import HelperText from './helper-text';
import Prefix from './prefix';
import Suffix from './suffix';

/**
 * A component for rendering a material design text field.
 *
 * @class
 */
class TextField extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      inputContainer: PropTypes.string.isRequired,
      input: PropTypes.string.isRequired,
      disabled: PropTypes.string.isRequired,
      withFloatingLabel: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    label: PropTypes.string,
    floatingLabel: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    helperText: PropTypes.string,
    placeholder: PropTypes.string,
    inputProps: PropTypes.shape({ className: PropTypes.string }),
  };

  static defaultProps = {
    label: '',
    floatingLabel: false,
    disabled: false,
    error: '',
    helperText: '',
    placeholder: '',
    inputProps: {},
    children: '',
  };

  static Suffix = Suffix;

  static Prefix = Prefix;

  /**
   * The styles for the text field.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles for the component.
   */
  static styles(theme) {
    const disabledColor = {
      light: 'rgba(0, 0, 0, 0.38)',
      dark: 'rgba(255, 255, 255, 0.5)',
    };

    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      },

      input: {
        border: 0,
        outline: 0,
        backgroundColor: 'transparent',
        height: 16,
        lineHeight: '16px',
        flex: 1,
        caretColor: theme.primaryBase,
        color: theme.textColor,
        marginTop: 16,
        padding: '0 4px',
        ...body1,

        '&::-webkit-input-placeholder': { color: theme.secondaryTextColor },

        '&::-moz-placeholder': { color: theme.secondaryTextColor },
      },

      disabled: { color: disabledColor[theme.type] },

      withFloatingLabel: { marginTop: 36 },

      inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
    };
  }

  state = { translateLabel: 0 };

  /**
   * Set the initial translate for the label so it doesn't interfere with the prefix.
   */
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ translateLabel: this.prefixWidth + 4 });
  }

  prefixWidth = 0;

  id = Math
    .random()
    .toString(36)
    .slice(2);

  /**
   * Get the placeholder for the input.
   *
   * @returns {String} - Returns the placeholder to be displayed.
   */
  get placeholder() {
    const noLabel = this.props.label.length === 0;

    if ((this.props.isFocused && this.props.floatingLabel) || noLabel) {
      return this.props.placeholder;
    }

    return '';
  }

  /**
   * Get the first suffix element.
   *
   * @returns {(JSX|null)} - Returns the first element or null.
   */
  getSuffix() {
    return Children
      .toArray(this.props.children)
      .find(child => child.type === Suffix);
  }

  /**
   * Get the first prefix element.
   *
   * @returns {(JSX|null)} - Returns the first element or null.
   */
  getPrefix() {
    return Children
      .toArray(this.props.children)
      .find(child => child.type === Prefix);
  }

  /**
   * Focus the input when the label is clicked.
   * This is because the label will block the input.
   */
  handleLabelClick = () => {
    this.input.focus();
  };

  render() {
    const prefix = this.getPrefix();
    const suffix = this.getSuffix();

    return (
      <div className={this.props.classes.root}>
        {this.props.label.length > 0 ? (
          <Label
            id={this.id}
            isFloating={this.props.floatingLabel}
            hasValue={this.props.value.length > 0}
            isFocused={this.props.isFocused}
            disabled={this.props.disabled}
            translateX={this.state.translateLabel}
            hasError={this.props.error.length > 0}
            onClick={this.handleLabelClick}
          >
            {this.props.label}
          </Label>
        ) : null}

        <span className={this.props.classes.inputContainer}>
          {prefix ? React.cloneElement(prefix, {
            disabled: this.props.disabled,
            createRef: (element) => {
              this.prefixWidth = element ? element.getBoundingClientRect().width : 0;
            },
          }) : null}

          <input
            {...this.props.inputProps}
            id={this.id}
            ref={(element) => { this.input = element; }}
            value={this.props.value}
            disabled={this.props.disabled}
            className={classnames(this.props.classes.input, {
              [this.props.classes.disabled]: this.props.disabled,
              [this.props.classes.withFloatingLabel]: this.props.floatingLabel,
            }, this.props.inputProps.className)}
            placeholder={this.placeholder}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />

          {suffix ? React.cloneElement(suffix, { disabled: this.props.disabled }) : null}
        </span>

        <Underline
          isFocused={this.props.isFocused}
          disabled={this.props.disabled}
          hasError={this.props.error.length > 0}
        />

        <HelperText
          helperText={this.props.helperText}
          error={this.props.error}
        />
      </div>
    );
  }
}

export default pipe(
  injectSheet(TextField.styles),
  withFocusedState,
)(TextField);
