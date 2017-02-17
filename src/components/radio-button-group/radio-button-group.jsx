import React, {
  PureComponent,
  PropTypes,
  Children,
} from 'react';
import Chance from 'chance';

import getNotDeclaredProps from 'utils/react/get-not-declared-props';
import Stylesheet from 'styles/stylesheet';
import Label from '../label';

export default class RadioButtonGroup extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defaultSelected: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    name: '',
    label: '',
    defaultSelected: '',
    style: {},
    onChange: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  componentWillMount() {
    let radioButtonCount = 0;

    Children.forEach(this.props.children, (elem) => {
      if (elem.type.name === 'RadioButton') {
        radioButtonCount += 1;
      }
    });

    if (radioButtonCount <= 1) {
      throw new Error('RadioButtonGroup must have atleast two RadioButton\'s inside');
    }
  }

  buttons = {};
  activeButton = this.props.defaultSelected;
  id = new Chance().string();

  get styles() {
    return Stylesheet.compile({
      root: {
        layout: {
          direction: 'vertical',
          inline: true,
          padding: 8,
          ...this.props.style,
        },

        label: { typo: 'title' },
      },
    });
  }

  handleChange = (name, state) => {
    if (state) {
      if (this.activeButton) {
        this.buttons[this.activeButton].on = false;
      }

      this.activeButton = name;

      this.props.onChange(this.props.name, name);
    }
  };

  renderChildren() {
    return Children.map(this.props.children, (elem) => {
      const { name } = elem.props;
      const props = { ...elem.props };

      if (elem.type.name === 'RadioButton') {
        props.ref = (element) => {
          this.buttons[name] = element;
        };
        props.defaultOn = this.props.defaultSelected === name;
        props.onChange = this.handleChange;
      }

      return (
        <elem.type {...props}>
          {elem.props.children}
        </elem.type>
      );
    });
  }

  render() {
    const styles = this.styles;

    return (
      <div
        {...getNotDeclaredProps(this)}
        role="radiogroup"
        id={this.id}
        style={styles.root}
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
