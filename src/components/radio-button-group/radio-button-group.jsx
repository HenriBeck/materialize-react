import React, {
  PureComponent,
  PropTypes,
  Children,
} from 'react';
import Chance from 'chance';

import getNotDeclaredProps from '/src/utils/react/get-not-declared-props';
import Stylesheet from '/src/styles/stylesheet';
import Label from '../label';
import getNextIndex from '/src/utils/get-next-index';
import RadioButton from '../radio-button';

export default class RadioButtonGroup extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children({ children }) {
      return Children
        .toArray(children)
        .reduce((count, elem) => {
          const isRadioButton = elem.type === RadioButton;

          return count + (isRadioButton ? 1 : 0);
        }, 0) <= 1 ? new Error(
          'RadioButtonGroup must have atleast two RadioButton\'s inside',
        ) : null;
    },
    defaultSelected: PropTypes.string.isRequired,
    label: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    label: '',
    style: {},
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  buttons = {};
  selectedButton = this.props.defaultSelected;
  focusedButton = null;
  isFocused = false;
  id = new Chance().string();
  keyDown = false;

  get styles() {
    return Stylesheet.compile({
      root: {
        layout: {
          direction: 'vertical',
          inline: true,
        },
        padding: 8,
        outline: 0,
        border: 0,
        backgroundColor: 'transparent',
        ...this.props.style,
      },

      label: { typo: 'title' },
    });
  }

  handleChange = (name, state) => {
    if (state) {
      this.buttons[this.selectedButton].on = false;
      this.buttons[this.selectedButton].blur();

      this.selectedButton = name;

      this.buttons[this.selectedButton].focus();
      this.focusedButton = this.selectedButton;

      this.props.onChange(this.props.name, name);
    }
  };

  handleKeyDown = (ev) => {
    this.props.onKeyDown(ev);

    if (!this.keyDown) {
      if (ev.keyCode === 13 || ev.keyCode === 32) {
        if (this.selectedButton !== this.focusedButton) {
          this.buttons[this.selectedButton].on = false;
          this.buttons[this.focusedButton].on = true;

          this.selectedButton = this.focusedButton;
        }
      } else if (ev.keyCode === 38 || ev.keyCode === 40) {
        const buttons = Object.keys(this.buttons);
        const index = buttons.findIndex(button => button === this.focusedButton);
        const direction = ev.keyCode === 38 ? 'left' : 'right';
        const nextIndex = getNextIndex(buttons, index, direction);

        this.buttons[this.focusedButton].blur();
        this.focusedButton = buttons[nextIndex];
        this.buttons[this.focusedButton].focus();
      }

      this.keyDown = true;
    }
  };

  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.keyDown = false;
  };

  handleFocus = (ev) => {
    this.props.onFocus(ev);

    if (ev.target.id === this.id) {
      this.focusedButton = this.selectedButton;

      this.buttons[this.focusedButton].focus();
    }
  };

  handleBlur = (ev) => {
    this.props.onBlur(ev);

    if (ev.target.id === this.id) {
      this.buttons[this.focusedButton].blur();
    }
  };

  renderChildren() {
    return Children.map(this.props.children, (elem) => {
      const props = {};

      if (elem.type === RadioButton) {
        const { name } = elem.props;

        props.ref = (element) => {
          this.buttons[name] = element;
        };
        props.defaultOn = this.props.defaultSelected === name;
        props.onChange = this.handleChange;
      }

      return React.cloneElement(elem, props);
    });
  }

  render() {
    const styles = this.styles;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        {...getNotDeclaredProps(this, RadioButtonGroup)}
        role="radiogroup"
        id={this.id}
        style={styles.root}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Label
          className="radio-button-group--label"
          for={this.id}
          style={styles.label}
        >
          {this.props.label}
        </Label>

        {this.renderChildren()}
      </div>
    );
  }
}
