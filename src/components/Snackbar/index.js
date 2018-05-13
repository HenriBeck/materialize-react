// @flow strict

import React, {
  type Node,
  type Element,
  type ElementType,
} from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import getNotDeclaredProps from 'react-get-not-declared-props';
import EventListener from 'react-event-listener';

import createSheet from '../../styles/create-sheet';
import { cloneElement } from '../../utils/react';
import isDescendant from '../../utils/is-descendant';
import { only } from '../../utils/breakpoints';
import { type Theme } from '../../theme/types';
import { themes } from '../../theme';

type Data = {
  isVisible: boolean,
  isAnimatingOut: boolean,
};
type Props = {
  children: Node,
  action: Element<ElementType> | null,
  className: string,
  isVisible: boolean,
  isAnimatingOut: boolean,
  autoCloseTimer: number,
  onCloseRequest: (
    type: 'action-click' | 'outside-click' | 'auto-close-timer',
    ev?: SyntheticEvent<HTMLElement> | MouseEvent,
  ) => void,
  onRemoveRequest: () => void,
};

const Sheet = createSheet('Snackbar', (theme: Theme) => {
  return {
    '@keyframes Snackbar--animate-in': {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' },
    },

    '@keyframes Snackbar--animate-out': {
      from: { transform: 'translateY(0)' },
      to: { transform: 'translateY(100%)' },
    },

    snackbar: {
      padding: '0 8px',
      width: 344,
      borderRadius: 4,
      minHeight: 48,
      maxHeight: 68,
      backgroundColor: 'rgba(0, 0, 0, 0.87)',
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      boxShadow: theme.elevation['6'],
      color: themes.dark.text.primary,
      animationFillMode: 'forwards',
      animationDuration: 200,
      animationName: (data: Data) => `Snackbar--animate-${data.isAnimatingOut ? 'out' : 'in'}`,

      [only(theme, 'mobile')]: {
        width: '100%',
        boxShadow: 'none',
      },
    },

    message: {
      flex: 1,
      padding: '14px 8px',
      lineHeight: '20px',
      fontSize: 14,
    },

    action: { margin: 0 },
  };
});

export default class Snackbar extends React.PureComponent<Props> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    action: PropTypes.element,
    className: PropTypes.string,
    isVisible: PropTypes.bool,
    isAnimatingOut: PropTypes.bool,
    autoCloseTimer: PropTypes.number,
    onCloseRequest: PropTypes.func,
    onRemoveRequest: PropTypes.func,
  };

  static defaultProps = {
    action: null,
    className: '',
    isVisible: false,
    isAnimatingOut: false,
    autoCloseTimer: 0,
    onRemoveRequest: noop,
    onCloseRequest: noop,
  };

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.actionTimeout) {
      clearTimeout(this.actionTimeout);
    }
  }

  timeout = null;

  actionTimeout = null;

  isAnimatedIn = false;

  root = React.createRef();

  handleAnimationEnd = () => {
    if (this.props.isAnimatingOut) {
      this.props.onRemoveRequest();
    } else {
      this.isAnimatedIn = true;

      if (this.props.autoCloseTimer > 0) {
        this.timeout = setTimeout(
          () => this.props.onCloseRequest('auto-close-timer'),
          this.props.autoCloseTimer,
        );
      }
    }
  };

  handleWindowClick = (ev: MouseEvent) => {
    if (ev.defaultPrevented || !this.isAnimatedIn) {
      return;
    }

    // $FlowFixMe
    if (this.root.current && isDescendant(this.root.current, ev.target)) {
      return;
    }

    this.props.onCloseRequest('outside-click', ev);
  };

  handleActionPress = (ev: SyntheticEvent<HTMLElement>) => {
    ev.persist();

    if (this.props.action && this.props.action.props.onPress) {
      this.props.action.props.onPress(ev);
    }

    this.actionTimeout = setTimeout(() => {
      this.props.onCloseRequest('action-click', ev);
    }, 400);
  };

  renderAction(className: string) {
    if (this.props.action) {
      return cloneElement(this.props.action, {
        onPress: this.handleActionPress,
        className,
      });
    }

    return null;
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    const data: Data = {
      isVisible: this.props.isVisible,
      isAnimatingOut: this.props.isAnimatingOut,
    };

    return (
      <EventListener
        target="window"
        onClick={this.handleWindowClick}
      >
        <Sheet data={data}>
          {({ classes }) => (
            <div
              ref={this.root}
              className={`${classes.snackbar} ${this.props.className}`}
              onAnimationEnd={this.handleAnimationEnd}
              {...getNotDeclaredProps(this.props, Snackbar)}
            >
              <span className={classes.message}>
                {this.props.children}
              </span>

              {this.renderAction(classes.action)}
            </div>
          )}
        </Sheet>
      </EventListener>
    );
  }
}
