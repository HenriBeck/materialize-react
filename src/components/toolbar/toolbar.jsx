import React, {
  PureComponent,
  PropTypes,
} from 'react';

import Stylesheet from '/src/styles/stylesheet';

export default class Toolbar extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    height: 'normal',
    style: {},
    className: '',
  };

  static contextTypes = { theme: PropTypes.object };

  get theme() {
    return this.context.theme.toolbar;
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        typo: 'title',
        position: 'relative',
        size: ['100%', this.theme.height],
        padding: '8px 16px',
        boxSizing: 'border-box',
        backgroundColor: this.theme.bgColor,
        layout: {
          direction: 'horizontal',
          crossAlign: 'center',
        },
        overflow: 'visible',
        ...this.props.style,
      },

      shadow: {
        position: ['absolute', 'auto', 0, '-5px', 0],
        size: ['100%', 5],
        boxShadow: 'inset 0px 5px 6px -3px rgba(0, 0, 0, 0.4)',
      },
    });
  }

  render() {
    const styles = this.styles;

    return (
      <div
        role="toolbar"
        className={`toolbar ${this.props.className}`}
        style={styles.root}
      >
        {this.props.children}

        <div
          className="toolbar--shadow"
          style={styles.shadow}
        />
      </div>
    );
  }
}
