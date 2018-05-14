// @flow strict-local

import React, { type Node } from 'react';
import noop from 'lodash.noop';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  tab: string,
  children: Node,
  tabStyle: 'text' | 'text-and-icons' | 'icons',
  onChange: (tab: string) => void,
  className: string,
  color: 'primary' | 'accent',
};
type State = { transform: string | null };

export const Context = React.createContext({
  color: null,
  selectedTab: null,
  tabStyle: null,
  createRef: noop,
  onChange: noop,
});

export default class Tabs extends React.PureComponent<Props, State> {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    tabStyle: PropTypes.oneOf(['text', 'text-and-icons', 'icons']),
    className: PropTypes.string,
    onChange: PropTypes.func,
    color: PropTypes.oneOf(['primary', 'accent']),
  };

  static defaultProps = {
    tabStyle: 'text',
    className: '',
    onChange: noop,
    color: 'primary',
  };

  state = { transform: null };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ transform: this.getTransform() });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.tab !== this.props.tab) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ transform: this.getTransform() });
    }
  }

  root = React.createRef();

  tabs: Map<string, HTMLElement | null> = new Map();

  getTransform = (): string | null => {
    const tab = this.tabs.get(this.props.tab);

    if (!tab || !this.root.current) {
      return null;
    }

    const containerRect = this.root.current.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const translate = tabRect.left - containerRect.left;
    const scale = tabRect.width / containerRect.width;

    return `translateX(${translate}px) scaleX(${scale})`;
  };

  createRefToTab = (name: string, element: HTMLElement | null) => {
    this.tabs.set(name, element);
  };

  handleResize = () => {
    this.setState({ transform: this.getTransform() });
  };

  render(): Node {
    const data: Data = {
      transform: this.state.transform,
      color: this.props.color,
    };

    return (
      <React.Fragment>
        <EventListener
          target="window"
          onResize={this.handleResize}
        />

        <Sheet data={data}>
          {({ classes }) => (
            <span
              {...getNotDeclaredProps(this.props, Tabs)}
              role="tablist"
              ref={this.root}
              className={`${classes.tabs} ${this.props.className}`}
            >
              <Context.Provider
                value={{
                  onChange: this.props.onChange,
                  color: this.props.color,
                  selectedTab: this.props.tab,
                  tabStyle: this.props.tabStyle,
                  createRef: this.createRefToTab,
                }}
              >
                {this.props.children}
              </Context.Provider>

              <span className={classes.bar} />
            </span>
          )}
        </Sheet>
      </React.Fragment>
    );
  }
}
