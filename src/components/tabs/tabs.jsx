import React, {
  PureComponent,
  PropTypes,
  Children,
} from 'react';

import Stylesheet from '/src/styles/stylesheet';
import { easeInOutQuad } from '/src/styles/timings';
import getNextIndex from '/src/utils/get-next-index';
import Tab from '../tab';

export default class Tabs extends PureComponent {
  static propTypes = {
    children({ children }) {
      let validationError = null;

      Children.forEach(children, (elem) => {
        if (elem.type !== Tab) {
          validationError = new Error(
            'All children of the Tabs Component need to be Tab Components!',
          );
        }
      });

      if (Children.count(children) <= 1) {
        validationError = new Error(
          'You need to pass atleast two Tab Components to the Tabs Component!',
        );
      }

      return validationError;
    },
    initialTabId: PropTypes.string.isRequired,
    noBar: PropTypes.bool,
    onTabChange: PropTypes.func,
    style: PropTypes.object,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    noBar: false,
    onTabChange: () => {},
    style: {},
    onFocus: () => {},
    onBlur: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
  };

  static contextTypes = { theme: PropTypes.object };

  state = { selectedTab: this.props.initialTabId };

  componentDidMount() {
    if (!this.props.noBar) {
      const {
        width,
        left,
      } = this.tabs[this.props.initialTabId].position;
      const relativeLeft = left - this.rootRect.left;

      this.bar.style.transform = `scaleX(${width}) translateX(${relativeLeft / width * 100}%)`;

      this.oldValue = `scaleX(${width}) translateX(${relativeLeft / width * 100}%)`;
    }
  }

  componentDidUpdate(prevProps, { selectedTab }) {
    if (!this.props.noBar && this.state.selectedTab !== selectedTab) {
      const {
        width,
        left,
      } = this.tabs[this.state.selectedTab].position;

      this.animateBar(width, left);
    }

    this.props.onTabChange(this.state.selectedTab);

    this.tabs[selectedTab].blur();

    this.focusedTab = this.state.selectedTab;

    this.tabs[this.focusedTab].focus();
  }

  tabs = {};
  oldValue = '';
  focusedTab = null;
  keyDown = false;

  get rootRect() {
    return this.root.getBoundingClientRect();
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        position: 'relative',
        layout: { direction: 'horizontal' },
        overflow: 'hidden',
        outline: 0,
        ...this.props.style,
      },

      bar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        size: [1, 2],
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        backgroundColor: this.context.theme.tabs.barColor,
      },
    });
  }

  animateBar(width, left) {
    const relativeLeft = left - this.rootRect.left;
    const translateY = relativeLeft / width * 100;
    const value = `scaleX(${width}) translateX(${translateY}%)`;

    this.bar.animate({
      transform: [
        this.oldValue,
        value,
      ],
    }, {
      duration: this.context.theme.variables.transitionTime * 1.5,
      fill: 'forwards',
      easing: easeInOutQuad,
    });

    this.oldValue = value;
  }

  handleTabChanged = (tabId) => {
    this.setState({ selectedTab: tabId });
  };

  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.focusedTab = this.state.selectedTab;

    this.tabs[this.focusedTab].focus();
  };

  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.tabs[this.focusedTab].blur();
  };

  handleKeyDown = (ev) => {
    this.props.onKeyDown(ev);

    if (!this.keyDown) {
      if (ev.keyCode === 13 || ev.keyCode === 32) {
        if (this.state.selectedTab !== this.focusedTab) {
          this.setState({ selectedTab: this.focusedTab });
        }
      } else if (ev.keyCode === 37 || ev.keyCode === 39) {
        const tabs = Object.keys(this.tabs);
        const index = tabs.findIndex(tab => tab === this.focusedTab);
        const direction = ev.keyCode === 37 ? 'left' : 'right';
        const nextIndex = getNextIndex(tabs, index, direction);

        this.tabs[this.focusedTab].blur();
        this.focusedTab = tabs[nextIndex];
        this.tabs[this.focusedTab].focus();
      }

      this.keyDown = true;
    }
  };

  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.keyDown = false;
  };

  renderTabs = () => Children.map(this.props.children, (elem) => {
    const props = {
      active: this.state.selectedTab === elem.props.id,
      ref: (element) => {
        this.tabs[elem.props.id] = element;
      },
      onPress: this.handleTabChanged,
    };

    return React.cloneElement(elem, props);
  });

  render() {
    const styles = this.styles;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        role="tablist"
        tabIndex="0"
        className="tabs"
        style={styles.root}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        ref={(element) => { this.root = element; }}
      >
        {this.renderTabs()}

        {!this.props.noBar && (
          <span
            className="tabs--bar"
            style={styles.bar}
            ref={(element) => { this.bar = element; }}
          />
        )}
      </div>
    );
  }
}
