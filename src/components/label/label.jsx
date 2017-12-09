import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import { body1 } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';
import Checkbox from '../checkbox';
import RadioButton from '../radio-button';
import Switch from '../switch';

/**
 * The label component.
 *
 * @class
 */
export class Label extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      label: PropTypes.string.isRequired,
      labelDisabled: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    disabled: false,
  };

  static interactiveElements = [
    Checkbox,
    RadioButton,
    Switch,
  ];

  /**
   * Generate a unique id.
   *
   * @returns {String} - Returns the unique id.
   */
  static randomId() {
    return Math
      .random()
      .toString(36)
      .slice(2);
  }

  /**
   * The styles for the Label component.
   *
   * @param {Object} theme - The theme supplied by Jss.
   * @returns {Object} - Returns the styles for the component.
   */
  static styles(theme) {
    return {
      label: {
        ...body1,
        composes: 'label',
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
        padding: '0 8px',
        color: theme.textColor,
      },

      labelDisabled: { color: theme.secondaryTextColor },
    };
  }

  id = Label.randomId();

  /**
   * Render the children.
   *
   * @returns {JSX} - Returns the children.
   */
  renderChildren() {
    let isFirstInteractiveElement = true;
    const { disabled } = this.props;

    return Children.map(this.props.children, (child) => {
      if (Label.interactiveElements.includes(child.type)) {
        const newProps = { disabled };

        if (isFirstInteractiveElement) {
          isFirstInteractiveElement = false;

          newProps['aria-labelledby'] = this.id;
        }

        return React.cloneElement(child, newProps);
      }

      return child;
    });
  }

  render() {
    return (
      <label // eslint-disable-line jsx-a11y/label-has-for
        id={this.id}
        aria-disabled={this.props.disabled}
        className={classnames(
          this.props.classes.label,
          { [this.props.classes.labelDisabled]: this.props.disabled },
          this.props.className,
        )}
        {...getNotDeclaredProps(this.props, Label)}
      >
        {this.renderChildren()}
      </label>
    );
  }
}

export default injectSheet(Label.styles)(Label);

