import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import brcast from 'brcast';
import noop from 'lodash.noop';

import getNotDeclaredProps from '../../get-not-declared-props';
import Layout from '../layout';

/**
 * A class that renders a group of radio buttons and handles all the logic.
 *
 * @class
 */
export default class RadioButtonGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    onChange: noop,
    className: '',
  };

  static childContextTypes = {
    radioButtonGroup: PropTypes.shape({
      selected: PropTypes.shape({}).isRequired,
      onChange: PropTypes.func.isRequired,
    }).isRequired,
  };

  /**
   * Create the child context for the radio buttons.
   */
  getChildContext() {
    return {
      radioButtonGroup: {
        selected: this.broadcast,
        onChange: this.props.onChange,
      },
    };
  }

  /**
   * Broadcast the state change when the selected prop changes.
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.broadcast.setState(nextProps.selected);
    }
  }

  broadcast = brcast(this.props.selected);

  render() {
    return (
      <Layout
        inline
        direction="column"
        className={`radio-button-group ${this.props.className}`}
        {...getNotDeclaredProps(this.props, RadioButtonGroup)}
      >
        {this.props.children}
      </Layout>
    );
  }
}
