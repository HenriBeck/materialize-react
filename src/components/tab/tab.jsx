import React, {
  PureComponent,
  PropTypes,
} from 'react';

import Stylesheet from '/src/styles/stylesheet';
import Ripple from '../ripple';

export default class Tab extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    noink: PropTypes.bool,
    active: PropTypes.bool,
    style: PropTypes.object,
    onPress: PropTypes.func,
    onMouseDown: PropTypes.func,
    onTouchStart: PropTypes.func,
  };

  static defaultProps = {
    noink: false,
    style: {},
    active: false,
    onPress: () => {},
    onMouseDown: () => {},
    onTouchStart: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  state = { isFocused: false };

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

  focus = () => this.setState({ isFocused: true });
  blur = () => this.setState({ isFocused: false });

  get theme() {
    return this.context.theme.tab;
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        maxWidth: '264px',
        minWidth: '160px',
        padding: '0 12px',
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
        fontWeight: this.state.isFocused && 700,
      },
    });
  }

  get position() {
    return this.root.getBoundingClientRect();
  }

  getColor(active) {
    return active ? this.theme.activeColor : this.theme.inactiveColor;
  }

  handleMouseDown = (ev) => {
    this.props.onMouseDown(ev);

    this.props.onPress(this.props.id);
  };

  handleTouchStart = (ev) => {
    this.props.onTouchStart(ev);

    this.props.onPress(this.props.id);
  };

  render() {
    const styles = this.styles;

    return (
      <div
        role="tab"
        className="tab"
        style={styles.root}
        aria-selected={this.props.active}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        ref={(element) => { this.root = element; }}
      >
        <span
          className="tab--content"
          style={styles.content}
          ref={(element) => { this.content = element; }}
        >
          {this.props.children}
        </span>

        <Ripple
          className="tab--ripple"
          nowaves={this.props.noink}
          color={this.theme.rippleColor}
          ref={(element) => { this.ripple = element; }}
        />
      </div>
    );
  }
}
