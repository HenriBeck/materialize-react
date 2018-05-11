// @flow strict

import React, {
  type ElementType,
  type Node,
} from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

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

function Layout(props: Props) {
  const data: Data = {
    direction: props.direction,
    mainAlign: props.mainAlign,
    crossAlign: props.crossAlign,
    inline: props.inline,
    reverse: props.reverse,
  };
  const Component = props.component;

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <Component
          className={`${classes.layout} ${props.className}`}
          {...getNotDeclaredProps(props, Layout)}
        >
          {props.children}
        </Component>
      )}
    </Sheet>
  );
}

Layout.propTypes = {};

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
