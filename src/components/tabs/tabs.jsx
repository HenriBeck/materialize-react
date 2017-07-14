import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';

import Tab from '../tab';
import TabsContainer from './tabs-container';
import hasDuplicates from '../../utils/has-duplicates';
import getNextIndex from '../../utils/get-next-index';

/**
 * A component which hosts the logic for multiple tabs.
 *
 * @class
 */
export default class Tabs extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    children(props) {
      const childrenArray = Children.toArray(props.children);
      const allChildrenAreRadioButtons = childrenArray.every(child => child.type === Tab);

      if (!allChildrenAreRadioButtons) {
        return new Error('All Children of Tabs need to be a Tab component');
      }

      if (childrenArray.length < 2) {
        return new Error('There must at least be two Tab components inside a Tabs component');
      }

      if (hasDuplicates(childrenArray.map(elem => elem.props.name))) {
        return new Error('Found duplicate names for the Tabs component');
      }

      return null;
    },
    // eslint-disable-next-line react/require-default-props
    initialTab(props) {
      const tabNames = Children.map(props.children, elem => elem.props.name);

      if (!tabNames.includes(props.initialTab)) {
        return new Error('The initial tab id can\'t be mapped to one of the passed tabs');
      }

      return null;
    },
    tabStyle: PropTypes.oneOf([
      'text',
      'text-and-icons',
      'icons',
    ]),
    onChange: PropTypes.func,
    className: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    noBar: PropTypes.bool,
  };

  static defaultProps = {
    tabStyle: 'text',
    className: '',
    noBar: false,
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
  };

  static switchOnKeyCodes = [13, 32];

  static moveDirectionsOnKeyCodes = {
    37: 'left',
    39: 'right',
  };

  state = {
    selectedTab: this.props.initialTab,
    focusedTab: null,
  };

  /**
   * Animate the bar to it's initial position.
   */
  componentDidMount() {
    if (!this.props.noBar) {
      this.animateBar(this.props.initialTab);
    }
  }

  /**
   * Animate the bar to a new position when the selectedTab has changed.
   */
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.noBar && prevState.selectedTab !== this.state.selectedTab) {
      this.animateBar(this.state.selectedTab);
    }
  }

  tabs = {};

  /**
   * Get the current tab.
   *
   * @returns {String} - Returns the selected tab.
   */
  get currentTab() {
    return this.state.selectedTab;
  }

  /**
   * Change the currently selected tab.
   *
   * @param {String} tabName - The new tab name.
   */
  set currentTab(tabName) {
    this.setState(({ selectedTab }) => {
      if (selectedTab === tabName) {
        return {};
      }

      return { selectedTab: tabName };
    });
  }

  /**
   * Change the selected state.
   *
   * @param {String} name - The new tab name.
   */
  changeSelectedTab(name) {
    this.setState(
      { selectedTab: name },
      () => this.props.onChange(name),
    );
  }

  /**
   * Animate the bottom bar to the new tab.
   *
   * @param {String} tabName - The new tab name.
   */
  animateBar(tabName) {
    const containerRect = this.container.root.getBoundingClientRect();
    const tabRect = this.tabs[tabName].getBoundingClientRect();
    const relativeLeft = tabRect.left - containerRect.left;
    const value = `matrix(${tabRect.width}, 0, 0, 1, ${relativeLeft}, 0)`;

    this.container.bar.style.transform = value;
  }

  /**
   * A function which will be called with the root element of one tab.
   *
   * @param {String} name - The name of the tab as a reference later on.
   * @returns {Function} - Returns a function that will take the element and creates a reference.
   */
  createRefToTab = name => (element) => {
    this.tabs[name] = element;
  };

  /**
   * Create a reference to the instance of the tabs container.
   *
   * @param {Object} instance - The instance of the container.
   */
  createRef = (instance) => {
    this.container = instance;
  };

  handlePress = name => () => {
    this.setState({
      selectedTab: name,
      focusedTab: name,
    }, () => this.props.onChange(name));
  };

  /**
   * Change the focused state back to null.
   */
  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ focusedTab: null });
  };

  /**
   * Change the focused state to the at this point selected tab.
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState(({ selectedTab }) => {
      return { focusedTab: selectedTab };
    });
  };

  /**
   * Handle different key presses.
   */
  handleKeyPress = (ev) => {
    ev.persist();

    if (Tabs.switchOnKeyCodes.includes(ev.keyCode)) {
      this.setState((state) => {
        if (state.selectedTab === state.focusedTab) {
          return {};
        }

        return { selectedTab: state.focusedTab };
      }, () => this.props.onChange(this.state.selectedTab));
    }

    if (Tabs.moveDirectionsOnKeyCodes[ev.keyCode]) {
      this.setState(({ focusedTab }) => {
        const direction = Tabs.moveDirectionsOnKeyCodes[ev.keyCode];
        const children = Children.map(this.props.children, child => child.props.name);
        const currentIndex = children.findIndex(name => name === focusedTab);
        const nextIndex = getNextIndex(children, currentIndex, direction);

        return { focusedTab: children[nextIndex] };
      });
    }
  };

  /**
   * Clone the tabs with some additional props.
   *
   * @returns {JSX[]} - Returns the cloned tabs as an array.
   */
  renderTabs() {
    return Children.map(this.props.children, elem => React.cloneElement(elem, {
      selected: this.state.selectedTab === elem.props.name,
      focused: this.state.focusedTab === elem.props.name,
      onPress: this.handlePress(elem.props.name),
      createRef: this.createRefToTab(elem.props.name),
      tabStyle: this.props.tabStyle,
    }));
  }

  render() {
    return (
      <TabsContainer
        noBar={this.props.noBar}
        className={this.props.className}
        createRef={this.createRef}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
      >
        {this.renderTabs()}
      </TabsContainer>
    );
  }
}
