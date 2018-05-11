// @flow strict

import React, {
  type ElementType,
  type Node,
} from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Color = 'secondary' | 'primary' | 'hint' | 'disabled' | 'accent' | 'error' | 'text' | null;
type Props = {
  typography: string,
  children: Node,
  element: string,
  color: Color,
  className: string,
};

function Typography(props: Props) {
  const data: Data = {
    typography: props.typography,
    color: props.color,
  };
  const Element = props.element;

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <Element
          className={`${classes.typography} ${props.className}`}
          {...getNotDeclaredProps(props, Typography)}
        >
          {props.children}
        </Element>
      )}
    </Sheet>
  );
}

Typography.propTypes = {};

Typography.defaultProps = {
  element: 'span',
  className: '',
  color: null,
};

export type { Color };

export default Typography;
