// @flow strict-local

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';

import Underline from './Underline';
import HelperText from './HelperText';
import Input from './Input';
import Label from './Label';
import Counter from './Counter';
import PrefixIcon from './PrefixIcon';

type Props = {
  onChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  value: string,
  className: string,
  label: Node,
  floatingLabel: boolean,
  placeholder: string,
  disabled: boolean,
  error: Node,
  helperText: Node,
  type: string,
  color: 'primary' | 'accent',
  counter: Node,
  prefix: Node,
  suffix: Node,
  prefixIcon: Node,
};
type State = {
  prefixWidth: number,
  isFocused: boolean,
};
type Data = { floatingLabel: boolean };

const Sheet = createSheet('TextField', {
  root: {
    display: 'flex',
    flexDirection: 'row',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 16,
    flex: 1,
    position: 'relative',
    paddingTop: (data: Data) => (data.floatingLabel ? 28 : 0),
  },

  bottomContainer: { display: 'flex' },
});

export default class TextField extends React.PureComponent<Props, State> {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.node,
    floatingLabel: PropTypes.bool,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.node,
    helperText: PropTypes.node,
    type: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'accent']),
    counter: PropTypes.node,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    prefixIcon: PropTypes.node,
  };

  static defaultProps = {
    className: '',
    label: null,
    floatingLabel: false,
    placeholder: '',
    disabled: false,
    error: null,
    helperText: null,
    color: 'primary',
    type: 'text',
    prefix: null,
    suffix: null,
    counter: null,
    prefixIcon: null,
  };

  state = {
    prefixWidth: 0,
    isFocused: false,
  };

  componentDidMount() {
    this.updatePrefixWidth();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.prefix !== this.props.prefix) {
      this.updatePrefixWidth();
    }
  }

  container = React.createRef();

  id = Math
    .random()
    .toString(36)
    .slice(2);

  updatePrefixWidth = () => {
    if (!this.container.current) {
      return;
    }

    const prefix = this.container.current.querySelector('[data-input-prefix="true"]');

    this.setState((state) => {
      if (prefix) {
        return { prefixWidth: prefix.getBoundingClientRect().width };
      }

      return state.prefixWidth === 0 ? null : { prefixWidth: 0 };
    });
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  renderBottomContainer(classes: { bottomContainer: string }) {
    if (!this.props.error && !this.props.helperText && !this.props.counter) {
      return null;
    }

    return (
      <span className={classes.bottomContainer}>
        <HelperText error={this.props.error}>
          {this.props.helperText}
        </HelperText>

        {this.props.counter && (
          <Counter>{this.props.counter}</Counter>
        )}
      </span>
    );
  }

  render() {
    const data: Data = { floatingLabel: this.props.floatingLabel };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <div
            className={`${classes.root} ${this.props.className}`}
            {...getNotDeclaredProps(this.props, TextField)}
          >
            {this.props.prefixIcon && (
              <PrefixIcon
                isFocused={this.state.isFocused}
                withFloatingLabel={this.props.floatingLabel}
                color={this.props.color}
                disabled={this.props.disabled}
                hasError={this.props.error !== null}
              >
                {this.props.prefixIcon}
              </PrefixIcon>
            )}

            <div
              className={classes.container}
              ref={this.container}
            >
              {this.props.label && (
                <Label
                  id={this.id}
                  isFloating={this.props.floatingLabel}
                  isFocused={this.state.isFocused}
                  hasValue={this.props.value.length > 0}
                  translateX={this.state.prefixWidth}
                  hasError={this.props.error !== null}
                  disabled={this.props.disabled}
                  color={this.props.color}
                >
                  {this.props.label}
                </Label>
              )}

              <Input
                id={this.id}
                type={this.props.type}
                label={this.props.label}
                isFocused={this.state.isFocused}
                floatingLabel={this.props.floatingLabel}
                placeholder={this.props.placeholder}
                prefix={this.props.prefix}
                suffix={this.props.suffix}
                disabled={this.props.disabled}
                value={this.props.value}
                color={this.props.color}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChange={this.props.onChange}
              />

              <Underline
                isFocused={this.state.isFocused}
                color={this.props.color}
                disabled={this.props.disabled}
                hasError={this.props.error !== null}
              />

              {this.renderBottomContainer(classes)}
            </div>
          </div>
        )}
      </Sheet>
    );
  }
}
