import React, {
  PureComponent,
  PropTypes,
} from 'react';
import is from 'is_js';

import Stylesheet from 'styles/stylesheet';
import Icon from '../icon';

export default class Chip extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    img: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        text: PropTypes.string,
      }),
    ]),
    deletable: PropTypes.bool,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    img: '',
    deletable: false,
    onDelete: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  get theme() {
    return this.context.theme.chip;
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        backgroundColor: this.theme.bgColor,
        borderRadius: '16px',
        height: 32,
        outline: 0,
        padding: `0 ${this.props.deletable ? 0 : 12}px 0 ${this.props.img ? 0 : 12}px`,
        layout: {
          direction: 'horizontal',
          inline: true,
          crossAlign: 'center',
        },
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
      },

      delete: {
        size: 24,
        lineHeight: '24px',
        fontSize: '16px',
        margin: '0 4px',
        color: 'rgba(255, 255, 255, 0.4)',
        cursor: 'pointer',
      },

      label: {
        typo: 'body1',
        color: this.theme.color,
        userSelect: 'none',
      },
    });
  }

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  renderImage(style) {
    if (is.json(this.props.img)) {
      return (
        <span
          className="chip--image"
          style={style}
        >
          {this.props.img.text}
        </span>
      );
    }

    return (
      <img
        alt="chip"
        className="chip--img"
        src={this.props.img}
        style={style}
      />
    );
  }

  render() {
    const styles = this.styles;

    return (
      <span
        className="chip"
        tabIndex="0"
        style={styles.root}
      >
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
      </span>
    );
  }
}
