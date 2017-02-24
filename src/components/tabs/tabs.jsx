import React, {
  PureComponent,
  PropTypes,
  Children,
} from 'react';

import warning from 'utils/warning';
import Stylesheet from 'styles/stylesheet';
import { easeInOutQuad } from 'styles/timings';

export default class Tabs extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    initialTabId: PropTypes.string.isRequired,
    noBar: PropTypes.bool,
    onTabChange: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    noBar: false,
    onTabChange: () => {},
    style: {},
  };

  static contextTypes = { theme: PropTypes.object };

  static getNewIndex(keyCode, index, tabs) {
    if (keyCode === 37) {
      return index === 0 ? tabs.length - 1 : index - 1;
    }

    return index === tabs.length - 1 ? 0 : index + 1;
  }

  state = { selectedTab: this.props.initialTabId };

  componentWillMount() {
    let allChildrenAreTabs = true;

    Children.forEach(this.props.children, (elem) => {
      if (elem.type.name !== 'Tab') {
        allChildrenAreTabs = false;
      }
    });

    warning(
      Children.count(this.props.children) <= 1,
      'You need to pass atleast two Tab Components to the Tabs Component!',
    );

    warning(!allChildrenAreTabs, 'All children of the Tabs Component need to be Tab Components!');
  }

  componentDidMount() {
    const {
      width,
      left,
    } = this.tabs[this.props.initialTabId].position;
    const relativeLeft = left - this.rootRect.left;

    this.bar.style.transform = `scaleX(${width}) translateX(${relativeLeft / width * 100}%)`;

    this.oldValue = `scaleX(${width}) translateX(${relativeLeft / width * 100}%)`;
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
  }

  tabs = {};
  oldValue = '';
  currentlyFocusedTab = null;
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

  handleFocus = () => {
    this.currentlyFocusedTab = this.state.selectedTab;

    this.tabs[this.currentlyFocusedTab].focus();
  };

  handleBlur = () => {
    this.tabs[this.currentlyFocusedTab].blur();
  };

  handleKeyDown = (ev) => {
    if (!this.keyDown) {
      if (ev.keyCode === 13 || ev.keyCode === 32) {
        if (this.state.selectedTab !== this.currentlyFocusedTab) {
          this.setState({ selectedTab: this.currentlyFocusedTab });
        }
      } else if (ev.keyCode === 37 || ev.keyCode === 39) {
        this.tabs[this.currentlyFocusedTab].blur();

        const tabs = Object.keys(this.tabs);
        const index = tabs.findIndex(tab => tab === this.currentlyFocusedTab);

        this.currentlyFocusedTab = tabs[Tabs.getNewIndex(ev.keyCode, index, tabs)];

        this.tabs[this.currentlyFocusedTab].focus();
      }

      this.keyDown = true;
    }
  };

  handleKeyUp = () => {
    this.keyDown = false;
  };

  renderTabs() {
    return Children.map(this.props.children, elem => (
      <elem.type
        {...elem.props}
        active={this.state.selectedTab === elem.props.id}
        ref={(element) => { this.tabs[elem.props.id] = element; }}
        onPress={this.handleTabChanged}
      >
        {elem.props.children}
      </elem.type>
    ));
  }

  render() {
    const styles = this.styles;

    return (
      // eslint-disable-next-line
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
