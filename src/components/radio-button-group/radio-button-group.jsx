import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import getNotDeclaredProps from '../../get-not-declared-props';
import getNextIndex from '../../utils/get-next-index';
import RadioButton from '../radio-button';
import RadioButtonContainer from './radio-button-container';
import warning from '../../utils/warning';
import { hasDuplicates } from './utils';

/**
 * A class that renders a group of radio buttons and handles all the logic.
 *
 * @class
 */
export default class RadioButtonGroup extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children(props) {
      const childrenArray = Children.toArray(props.children);
      const allChildrenAreRadioButtons = childrenArray.every(child => child.type === RadioButton);

      if (!allChildrenAreRadioButtons) {
        return new Error('All Children of the RadioButtonGroup need to be RadioButtons');
      }

      if (childrenArray.length <= 2) {
        return new Error('There must at least be three RadioButtons inside a RadioButtonGroup');
      }

      if (hasDuplicates(childrenArray.map(elem => elem.props.name))) {
        return new Error('Found duplicate names');
      }

      return null;
    },
    defaultSelected: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: () => {},
  };

  static defaultProps = {
    children: '',
    onFocus: () => {},
    onBlur: () => {},
    onChange: () => {},
  };

  static toggleOnKeyCodes = [13, 32];

  static moveDirectionsOnKeyCodes = {
    38: 'left',
    40: 'right',
  };

  state = {
    selected: this.props.defaultSelected,
    focused: null,
  };

  id = randomstring.generate();

  /**
   * Get the current selected button.
   *
   * @returns {String} - Returns the name of the button.
   */
  get selected() {
    return this.state.selected;
  }

  /**
   * Change the currently selected state.
   *
   * @param {String} selected - The new selected buttons name.
   */
  set selected(selected) {
    warning(
      !this.includes(selected),
      'The passed in name is not a valid radio button name.',
    );

    this.setState({ selected });
  }

  /**
   * Check if the name is a name that was also passed to one of it's children.
   *
   * @private
   * @param {String} name - The name to check.
   * @returns {Boolean} - Whether or not the name is valid.
   */
  includes(name) {
    return Children
      .toArray(this.props.children)
      .map(elem => elem.props.name)
      .includes(name);
  }

  /**
   * Bind the name of the radio button so when we receive an onPress call,
   * we know which radio button to toggle.
   *
   * @private
   * @param {String} name - The name of the radio button.
   * @returns {Function} - Returns a function for the onPress handler.
   */
  createHandlePress = name => () => {
    if (this.state.selected !== name) {
      this.setState(() => {
        return {
          selected: name,
          focused: name,
        };
      }, () => this.props.onChange(this.props.name, this.state.selected));
    }
  };

  /**
   * Set the focused state to the first radio button.
   *
   * @private
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    const children = Children.toArray(this.props.children);

    this.setState({ focused: children[0].props.name });
  };

  /**
   * Set the focused state back to null so no component displays a focused state.
   *
   * @private
   */
  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ focused: null });
  };

  /**
   * Change the selected state or move the focus up and down.
   *
   * @private
   */
  handleKeyPress = (ev) => {
    if (RadioButtonGroup.toggleOnKeyCodes.includes(ev.keyCode)) {
      if (this.state.selected !== this.state.focused) {
        this.setState(({ focused }) => {
          return { selected: focused };
        }, () => this.props.onChange(this.props.name, this.state.selected));
      }
    }

    if (RadioButtonGroup.moveDirectionsOnKeyCodes[ev.keyCode]) {
      const { focused } = this.state;
      const direction = RadioButtonGroup.moveDirectionsOnKeyCodes[ev.keyCode];
      const children = Children.toArray(this.props.children).map(child => child.props.name);
      const currentIndex = children.findIndex(name => name === focused);
      const nextIndex = getNextIndex(children, currentIndex, direction);

      this.setState({ focused: children[nextIndex] });
    }
  };

  /**
   * Render all of the radio buttons with additional props.
   *
   * @private
   * @returns {JSX[]} - Returns the new children.
   */
  renderChildren() {
    return Children.map(this.props.children, child => React.cloneElement(child, {
      onPress: this.createHandlePress(child.props.name),
      checked: this.state.selected === child.props.name,
      isFocused: this.state.focused === child.props.name,
      noink: child.props.noink || this.state.selected === child.props.name,
    }));
  }

  render() {
    return (
      <RadioButtonContainer
        {...getNotDeclaredProps(this.props, RadioButtonGroup)}
        label={this.props.label}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        id={this.id}
      >
        {this.renderChildren()}
      </RadioButtonContainer>
    );
  }
}
