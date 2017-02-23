import React, {
  PureComponent,
  PropTypes,
} from 'react';
import is from 'is_js';

import Stylesheet from 'styles/stylesheet';
import Ripple from '../ripple';

export default class Tab extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    style: PropTypes.object,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    onPress: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  componentDidMount() {
    this.content.style.color = this.getColor(this.props.active);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.content.animate({
        color: [
          this.getColor(prevProps.active),
          this.getColor(this.props.active),
        ],
      }, {
        duration: this.context.theme.variables.transitionTime,
        fill: 'forwards',
      });
    }
  }

  getColor(active) {
    return active ? this.theme.activeColor : this.theme.inactiveColor;
  }

  get theme() {
    return this.context.theme.tab;
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        maxWidth: '264px',
        minWidth: '160px',
        padding: `0 ${is.desktop() ? 24 : 12}px`,
        height: 48,
        position: 'relative',
        layout: {
          direction: 'vertical',
          mainAlign: 'center',
          crossAlign: 'center',
        },
        ...this.props.style,
      },

      content: {
        width: '100%',
        typo: 'body1',
        textTransform: 'uppercase',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'center',
      },
    });
  }

  get position() {
    return this.root.getBoundingClientRect();
  }

  handlePress = () => {
    this.props.onPress(this.props.id);
  };

  render() {
    const styles = this.styles;

    return (
      <div
        role="tab"
        className="tab"
        style={styles.root}
        onMouseDown={this.handlePress}
        onTouchStart={this.handlePress}
        ref={(element) => { this.root = element; }}
      >
        <span
          className="tab--content"
          style={styles.content}
          ref={(element) => { this.content = element; }}
        >
          {this.props.children}
        </span>

        <Ripple />
      </div>
    );
  }
}
