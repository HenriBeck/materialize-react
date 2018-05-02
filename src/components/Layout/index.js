// @flow strict

import React, {
  type ElementType,
  type Node,
} from 'react';

import createSheet from '../../styles/create-sheet';

type Direction = 'row' | 'column';
type MainAlign = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
type CrossAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
type Props = {
  children: Node,
  component: ElementType,
  direction: Direction,
  mainAlign: MainAlign,
  crossAlign: CrossAlign,
  className: string,
  inline: boolean,
  reverse: boolean,
};
type Data = {
  inline: boolean,
  reverse: boolean,
  direction: Direction,
  mainAlign: MainAlign,
  crossAlign: CrossAlign,
};

const Sheet = createSheet('Layout', {
  layout: {
    display: (data: Data) => (data.inline ? 'flex-inline' : 'flex'),
    flexDirection: (data: Data) => `${data.direction}${data.reverse ? '-reverse' : ''}`,
    justifyContent: (data: Data) => data.mainAlign,
    alignItems: (data: Data) => data.crossAlign,
  },
});

function Layout({
  component: Component,
  direction,
  mainAlign,
  crossAlign,
  inline,
  reverse,
  className,
  children,
  ...props
}: Props): Node {
  const data: Data = {
    direction,
    mainAlign,
    crossAlign,
    inline,
    reverse,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <Component
          className={`${classes.layout} ${className}`}
          {...props}
        >
          {children}
        </Component>
      )}
    </Sheet>
  );
}

Layout.defaultProps = {
  component: 'div',
  className: '',
  direction: 'row',
  reverse: false,
  inline: false,
  mainAlign: 'flex-start',
  crossAlign: 'stretch',
};

export default Layout;
