import React, {
  PureComponent,
  PropTypes,
  Children,
} from 'react';

import DrawerContent from './drawer-content';
import MainContent from './main-content';
import Stylesheet from '/src/styles/stylesheet';

export default class Drawer extends PureComponent {
  static DrawerContent = DrawerContent;
  static MainContent = MainContent;

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.string,
    responsiveWidth: PropTypes.number,
  };

  static defaultProps = {
    className: '',
    style: '',
    responsiveWidth: 999,
  };

  static contextTypes = { theme: PropTypes.object };

  static getDrawerContent(children) {
    return Children.toArray(children).filter(({ type }) => type === DrawerContent);
  }

  static getMainContent(children) {
    return Children.toArray(children).filter(({ type }) => type === MainContent);
  }

  state = {
    opened: false,
    narrow: window.innerWidth < this.props.responsiveWidth,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  get theme() {
    return this.context.theme.drawer;
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        layout: { direction: 'horizontal' },
        ...this.props.style,
      },

      scrim: {
        position: ['absolute', 0],
        backgroundColor: this.theme.scrimColor,
        opacity: this.state.opened ? 1 : 0,
        transition: `opacity linear ${this.context.theme.variables.transitionTime}ms`,
      },

      drawer: {
        position: ['absolute', 0, 'auto', 0, -this.theme.drawerWidth],
        width: this.theme.drawerWidth,
        transition: `transform linear ${this.context.theme.variables.transitionTime * 1.2}ms`,
        transform: () => {
          if (this.state.narrow) {
            return `translateX(${this.state.opened ? '100%' : '0'})`;
          }

          return 'translateX(100%)';
        },
      },

      content: {
        flex: 1,
        marginLeft: this.state.narrow ? 0 : this.theme.drawerWidth,
      },
    });
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  toggle() {
    this.setState(({ open }) => {
      return { open: !open };
    });
  }

  handleResize = () => {
    const narrow = window.innerWidth < this.props.responsiveWidth;

    if (this.state.narrow !== narrow) {
      this.setState({
        narrow,
        opened: false,
      });
    }
  };

  render() {
    const { children } = this.props;
    const styles = this.styles;

    return (
      <div
        className={`drawer ${this.props.className}`}
        style={styles.root}
      >
        <div
          className="drawer--scrim"
          style={styles.scrim}
        />

        <aside
          className="drawer--drawer"
          style={styles.drawer}
        >
          {Drawer.getDrawerContent(children)}
        </aside>

        <div style={styles.content}>
          {Drawer.getMainContent(children)}
        </div>
      </div>
    );
  }
}
