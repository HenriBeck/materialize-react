import React, {
  Children,
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import noop from 'lodash.noop';
import EventListener from 'react-event-listener';

import { easeInOutQuad } from '../../styles/timings';
import getNotDeclaredProps from '../../get-not-declared-props';
import getNextIndex from '../../utils/get-next-index';
import { pipe } from '../../utils/functions';
import withKeyPress from '../../utils/with-key-press';

/**
 * A component that renders a tablist.
 *
 * @class
 */
export class Tabs extends PureComponent {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    // eslint-disable-next-line react/require-default-props
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({
      tabs: PropTypes.string.isRequired,
      bar: PropTypes.string.isRequired,
    }).isRequired,
    createKeyDownHandler: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
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
        transformOrigin: 'left center',
        willChange: 'transform',
        transition: `transform 200ms ${easeInOutQuad}`,
        backgroundColor: theme.primaryBase,
      },
    };
  }

  static switchOnKeyCodes = [13, 32];

  static moveDirectionsOnKeyCodes = {
    37: 'left',
    39: 'right',
  };

  state = {
    transform: 'scaleX(0) translateX(0px)',
    focusedTab: null,
  };

  /**
   * Calculate the initial transform of the bar.
   */
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ transform: this.getTransform() });
  }

  /**
   * Update the transform when the tab changes.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState((state) => {
        return {
          transform: this.getTransform(),
          focusedTab: state.focusedTab === null ? null : this.props.tab,
        };
      });
    }
  }

  tabs = {};

  containerRect = null;

  /**
   * Get the transform for the bar.
   *
   * @returns {(Null|String)} - Returns null or the transform style.
   */
  getTransform = () => {
    if (this.props.noBar) {
      return null;
    }

    const containerRect = this.root.getBoundingClientRect();
    const tabRect = this.tabs[this.props.tab].getBoundingClientRect();
    const translate = tabRect.left - containerRect.left;
    const scale = tabRect.width / containerRect.width;

    return `translateX(${translate}px) scaleX(${scale})`;
  };

  createRefToTab = name => (element) => {
    this.tabs[name] = element;
  };

  /**
   * Recalculate the transform and the containerRect.
   */
  handleResize = () => {
    this.setState({ transform: this.getTransform() });
  };

  handlePress = name => () => this.props.onChange(name);

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

  handleKeyDown = this.props.createKeyDownHandler(this.handleKeyPress);

  /**
   * Set the focused tab to the currently selected tab when the component receives focus.
   *
   * @private
   */
  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState({ focusedTab: this.props.tab });
  };

  /**
   * Reset the focused tab to null when the tab looses focus.
   *
   * @private
   */
  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ focusedTab: null });
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
      onClick: this.handlePress(elem.props.name),
      createRef: this.createRefToTab(elem.props.name),
      tabStyle: this.props.tabStyle,
    }));
  }

  render() {
    return (
      <span
        {...getNotDeclaredProps(this.props, Tabs)}
        role="tablist"
        tabIndex="0"
        ref={(element) => { this.root = element; }}
        className={`${this.props.classes.tabs} ${this.props.className}`}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.props.onKeyUp}
      >
        <EventListener
          target="window"
          onResize={this.handleResize}
        />

        {this.renderTabs()}

        {!this.props.noBar && (
          <span
            className={this.props.classes.bar}
            style={{ transform: this.state.transform }}
            ref={(element) => { this.bar = element; }}
          />
        )}
      </span>
    );
  }
}

export default pipe(
  injectSheet(Tabs.styles),
  withKeyPress(),
)(Tabs);
