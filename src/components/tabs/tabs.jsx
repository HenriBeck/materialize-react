import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import noop from 'lodash.noop';

import EventHandler from '../event-handler';
import { easeInOutQuad } from '../../styles/timings';
import getNotDeclaredProps from '../../get-not-declared-props';
import getNextIndex from '../../utils/get-next-index';
import Tab from '../tab';
import hasDuplicates from '../../utils/has-duplicates';

/**
 * A component that renders a tablist.
 *
 * @class
 */
export class Tabs extends PureComponent {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    // eslint-disable-next-line react/require-default-props
    children(props) {
      const childrenArray = Children.toArray(props.children);
      const allChildrenAreTabs = childrenArray.every(child => child.type === Tab);

      if (!allChildrenAreTabs) {
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
    classes: PropTypes.shape({
      tabs: PropTypes.string.isRequired,
      bar: PropTypes.string.isRequired,
    }).isRequired,
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
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
  };

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles which will be rendered.
   */
  static styles(theme) {
    return {
      tabs: {
        composes: 'tabs',
        display: 'flex',
        position: 'relative',

        '&:focus': { outline: 0 },
      },

      bar: {
        composes: 'tabs--bar',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        transform: 'scaleX(0) translateX(0px)',
        transformOrigin: 'left center',
        willChange: 'transform',
        transition: `transform 250ms ${easeInOutQuad}`,
        backgroundColor: theme.primaryBase,
      },
    };
  }

  static switchOnKeyCodes = [13, 32];

  static moveDirectionsOnKeyCodes = {
    37: 'left',
    39: 'right',
  };

  state = { focusedTab: null };

  /**
   * Add a resize event listener to reposition the bar when the user resize's the window.
   */
  componentWillMount() {
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Animate the bar to it's initial position.
   */
  componentDidMount() {
    this.animateBar();
  }

  /**
   * Animate the bar when the tab prop has changed.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      this.animateBar();
    }
  }

  /**
   * Remove the resize event listener.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  tabs = {};

  /**
   * Create a reference to the root element of the tablist.
   *
   * @private
   * @param {Object} element - The root element.
   */
  createRootRef = (element) => {
    this.root = element;
  };

  /**
   * Animate the bottom bar to the new tab.
   *
   * @private
   */
  animateBar = () => {
    if (this.props.noBar) {
      return;
    }

    const containerRect = this.root.getBoundingClientRect();
    const tabRect = this.tabs[this.props.tab].getBoundingClientRect();
    const translate = tabRect.left - containerRect.left;
    const scale = tabRect.width / containerRect.width;

    this.bar.style.transform = `translateX(${translate}px) scaleX(${scale})`;
  };

  /**
   * A function which will be called with the root element of one tab.
   *
   * @private
   * @param {String} name - The name of the tab as a reference later on.
   * @returns {Function} - Returns a function that will take the element and creates a reference.
   */
  createRefToTab = name => (element) => {
    this.tabs[name] = element;
  };

  handleResize = this.animateBar;

  handlePress = name => () => this.props.onChange(name);

  /**
   * Change the focused state back to null.
   *
   * @private
   */
  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ focusedTab: null });
  };

  /**
   * Change the focused state to the at this point selected tab.
   *
   * @private
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState({ focusedTab: this.props.tab });
  };

  /**
   * Handle different key presses.
   *
   * @private
   */
  handleKeyPress = (ev) => {
    const { keyCode } = ev;

    if (Tabs.switchOnKeyCodes.includes(keyCode)) {
      this.props.onChange(this.state.focusedTab);
    }

    if (Tabs.moveDirectionsOnKeyCodes[keyCode]) {
      this.setState(({ focusedTab }) => {
        const direction = Tabs.moveDirectionsOnKeyCodes[keyCode];
        const tabNames = Children.map(this.props.children, child => child.props.name);
        const currentIndex = tabNames.findIndex(name => name === focusedTab);
        const nextIndex = getNextIndex(tabNames, currentIndex, direction);

        return { focusedTab: tabNames[nextIndex] };
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
      selected: this.props.tab === elem.props.name,
      focused: this.state.focusedTab === elem.props.name,
      onPress: this.handlePress(elem.props.name),
      createRef: this.createRefToTab(elem.props.name),
      tabStyle: this.props.tabStyle,
    }));
  }

  render() {
    const {
      classes,
      className,
      noBar,
      ...props
    } = this.props;

    return (
      <EventHandler
        {...getNotDeclaredProps(props, Tabs)}
        component="div"
        role="tablist"
        tabIndex="0"
        createRef={this.createRootRef}
        className={`${className} ${classes.tabs}`}
        onKeyPress={this.handleKeyPress}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {this.renderTabs()}

        {!noBar && (
          <span
            className={classes.bar}
            ref={(element) => { this.bar = element; }}
          />
        )}
      </EventHandler>
    );
  }
}

export default injectSheet(Tabs.styles)(Tabs);
