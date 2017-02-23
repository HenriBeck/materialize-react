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

  tabs = {};
  oldValue = '';

  get rootRect() {
    return this.root.getBoundingClientRect();
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        position: 'relative',
        layout: { direction: 'horizontal' },
        overflow: 'hidden',
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

  get isScrollable() {
    return Object
      .values(this.tabs)
      .reduce((current, tab) => current + tab.position.width, 0) > this.rootRect.width;
  }

  animateBar(width, left) {
    const relativeLeft = left - this.rootRect.left;
    const translateY = relativeLeft / width * 100;
    const value = `scaleX(${width}) translateX(${translateY}%)`;
    const prevValue = parseInt(this.oldValue.match(/translateX\((\d+)%\)/)[1], 10);

    this.bar.animate({
      transform: [
        this.oldValue,
        `scaleX(${width * 1.2}) translateX(${prevValue + (translateY - prevValue) / 2}%)`,
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
    if (!this.props.noBar) {
      const {
        width,
        left,
      } = this.tabs[tabId].position;

      this.animateBar(width, left);
    }

    this.setState({ selectedTab: tabId });

    this.props.onTabChange(tabId);
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
      <div
        role="tablist"
        className="tabs"
        style={styles.root}
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
