// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';
import { up } from '../../utils/breakpoints';
import { type Theme } from '../../theme/types';

type Props = {
  children: Node,
  position: 'left' | 'right' | 'center',
  className: string,
};
type Data = {
  hide: boolean,
  position: 'left' | 'right' | 'center',
};

const Sheet = createSheet('SnackbarContainer', (theme: Theme) => {
  return {
    container: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      display: 'flex',
      zIndex: theme.zIndexes.snackbar,
      transform: (data: Data) => (data.hide ? 'scale(0)' : 'scale(1)'),
      justifyContent(data: Data) {
        switch (data.position) {
          case 'left': return 'flex-start';
          case 'center': return 'center';
          case 'right': return 'flex-end';
          default: return null;
        }
      },

      [up(theme, 'tablet')]: { padding: '0 24px' },
    },
  };
});

export default class Container extends React.PureComponent<Props> {
  static defaultProps = {
    position: 'center',
    className: '',
  };

  renderChildren() {
    return React.Children.map(
      this.props.children,
      (child, index) => React.cloneElement(child, { isVisible: index === 0 }),
    );
  }

  render() {
    const hide = React.Children.count(this.props.children) === 0;
    const data: Data = {
      hide,
      position: this.props.position,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <div className={`${classes.container} ${this.props.className}`}>
            {this.renderChildren()}
          </div>
        )}
      </Sheet>
    );
  }
}
