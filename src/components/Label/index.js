// @flow strict

import React, {
  type Element,
  type ComponentType,
  type Node,
} from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Typography from '../Typography';

import Sheet, { type Data } from './Sheet';

type Props = {
  control: Element<ComponentType<Object>>, // eslint-disable-line flowtype/no-weak-types
  children: Node,
  className: string,
  disabled: boolean,
};

export default class Label extends React.PureComponent<Props> {
  static propTypes = {
    control: PropTypes.element.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    disabled: false,
  };

  root = React.createRef();

  id = Math
    .random()
    .toString(36)
    .slice(2);

  /**
   * Find the control and simulate a click.
   */
  handleClick = () => {
    if (!this.root.current) {
      return;
    }

    const el = this.root.current.querySelector(`[aria-labelledby="${this.id}"]`);

    if (el) {
      el.click();
    }
  };

  renderControl(): Node {
    return React.cloneElement(this.props.control, {
      disabled: this.props.disabled,
      'aria-labelledby': this.id,
    });
  }

  render() {
    const data: Data = { disabled: this.props.disabled };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <label
            {...getNotDeclaredProps(this.props, Label)}
            id={this.id}
            htmlFor={this.id}
            aria-disabled={this.props.disabled}
            className={`${classes.label} ${this.props.className}`}
            ref={this.root}
          >
            {this.renderControl()}

            <Typography
              typography="body"
              color={this.props.disabled ? 'disabled' : 'text'}
              className={classes.text}
              onMouseDown={this.handleClick}
            >
              {this.props.children}
            </Typography>
          </label>
        )}
      </Sheet>
    );
  }
}
