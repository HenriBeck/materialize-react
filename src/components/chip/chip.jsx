import React, {
  PureComponent,
  PropTypes,
} from 'react';
import is from 'is_js';

import Stylesheet from 'styles/stylesheet';
import Icon from '../icon';
import getNotDeclaredProps from 'utils/react/get-not-declared-props';

export default class Chip extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    img: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        text: PropTypes.string,
        textColor: PropTypes.string,
      }),
    ]),
    className: PropTypes.string,
    style: PropTypes.object,
    deletable: PropTypes.bool,
    onDelete: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
  };

  static defaultProps = {
    img: '',
    className: '',
    deletable: false,
    style: {},
    onDelete: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  state = { focused: false };

  keyDown = false;

  get theme() {
    return this.context.theme.chip;
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        position: 'relative',
        backgroundColor: this.theme.bgColor,
        borderRadius: '16px',
        height: 32,
        outline: 0,
        border: 0,
        padding: `0 ${this.props.deletable ? 0 : 12}px 0 ${this.props.img ? 0 : 12}px`,
        layout: {
          direction: 'horizontal',
          inline: true,
          crossAlign: 'center',
        },
        ...this.props.style,
      },

      img: {
        rightPadding: 8,
        size: 32,
        borderRadius: '50%',
        textTransform: 'uppercase',
        backgroundColor: is.json(this.props.img) ? this.props.img.color : 'transparent',
        lineHeight: '32px',
        textAlign: 'center',
        margin: '0 8px 0 0',
        color: is.json(this.props.img) ? this.props.img.textColor : 'inherit',
      },

      delete: {
        size: 24,
        lineHeight: '24px',
        fontSize: '12px',
        margin: '0 4px',
        cursor: 'pointer',
      },

      label: {
        typo: 'body1',
        color: this.theme.color,
        userSelect: 'none',
      },

      shadow: {
        position: ['absolute', 0],
        elevation: this.theme.focusedElevation,
        opacity: this.state.focused ? 1 : 0,
        transition: `opacity ${this.context.theme.variables.transitionTime}ms linear`,
        borderRadius: 'inherit',
      },
    });
  }

  toggleFocus() {
    this.setState(({ focused }) => {
      return { focused: !focused };
    });
  }

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.toggleFocus();
  };

  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.toggleFocus();
  };

  handleKeyDown = (ev) => {
    this.props.onKeyDown(ev);

    if (ev.keyCode === 46 && !this.keyDown) {
      this.keyDown = true;

      this.handleDelete();
    }
  };

  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.keyDown = false;
  };

  renderImage(style) {
    const props = {
      style,
      className: 'chip--image',
    };

    if (is.json(this.props.img)) {
      return (
        <span {...props}>
          {this.props.img.text}
        </span>
      );
    }

    return (
      <img
        alt="chip"
        src={this.props.img}
        {...props}
      />
    );
  }

  render() {
    const styles = this.styles;

    return (
      <button
        {...getNotDeclaredProps(this, Chip)}
        className={`chip ${this.props.className}`}
        tabIndex="0"
        style={styles.root}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span
          className="chip--shadow"
          style={styles.shadow}
        />

        {this.props.img && this.renderImage(styles.img)}

        <span
          className="chip--label"
          style={styles.label}
        >
          {this.props.children}
        </span>

        {this.props.deletable && (
          <Icon
            icon="close-circle"
            className="chip--icon"
            style={styles.delete}
            onTouchStart={this.handleDelete}
            onMouseDown={this.handleDelete}
          />
        )}
      </button>
    );
  }
}
