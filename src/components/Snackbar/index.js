// @flow strict

import React, {
  type Node,
  type Element,
  type ElementType,
} from 'react';
import noop from 'lodash.noop';
import getNotDeclaredProps from 'react-get-not-declared-props';
import EventListener from 'react-event-listener';

import createSheet from '../../styles/create-sheet';
import {
  cloneElement,
  isDescendant,
} from '../../utils/react';
import {
  only,
  up,
} from '../../utils/breakpoints';
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
  closeOnOutsideClick: boolean,
  autoCloseTimer: number,
  onCloseRequest: (
    type: 'action-click' | 'outside-click' | 'auto-close-timer',
    ev?: SyntheticEvent<HTMLElement>,
  ) => void,
  onRemoveRequest: () => void,
};
declare class MouseEvent<T: EventTarget> extends SyntheticMouseEvent<T> { target: HTMLElement }

const Sheet = createSheet('Snackbar', (theme: Theme) => {
  return {
    snackbar: {
      color: theme.type === 'dark' ? themes.light.text.primary : themes.dark.text.primary,
      boxSizing: 'border-box',
      padding: '14px 24px',
      height: 48,
      backgroundColor: theme.type === 'dark' ? '#ffffff' : '#323232',
      position: 'absolute',
      bottom: -48,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'transform 200ms',
      animationFillMode: 'forwards',
      animationDuration: 250,
      animationName: (data: Data) => (
        data.isVisible
          ? `snackbar--animate-${data.isAnimatingOut ? 'out' : 'in'}`
          : null
      ),

      [only(theme, 'mobile')]: { width: '100%' },

      [up(theme, 'tablet')]: {
        borderRadius: 2,
        minWidth: 288,
        maxWidth: 568,
      },
    },

    action: {
      marginLeft: 24,
      marginRight: 0,

      [up(theme, 'tablet')]: { marginLeft: 48 },
    },
  };
});

export default class Snackbar extends React.PureComponent<Props> {
  static defaultProps = {
    action: null,
    className: '',
    isVisible: false,
    isAnimatingOut: false,
    closeOnOutsideClick: false,
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
      this.isAnimatedIn = true;

      this.props.onRemoveRequest();
    } else if (this.props.autoCloseTimer > 0) {
      this.timeout = setTimeout(() => {
        this.props.onCloseRequest('auto-close-timer');
      }, this.props.autoCloseTimer);
    }
  };

  handleWindowClick = (ev: MouseEvent<HTMLElement>) => {
    ev.persist();

    if (ev.defaultPrevented || !this.isAnimatedIn) {
      return;
    }

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
    return this.props.action ? cloneElement(this.props.action, {
      className,
      onPress: this.handleActionPress,
    }) : null;
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
              {this.props.children}

              {this.renderAction(classes.action)}
            </div>
          )}
        </Sheet>
      </EventListener>
    );
  }
}
