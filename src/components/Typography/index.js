// @flow strict

import React, {
  type ElementType,
  type Node,
} from 'react';

import Sheet, { type Data } from './Sheet';

type Color = 'secondary' | 'primary' | 'hint' | 'disabled' | 'accent' | 'error' | 'text';
type Props = {
  typography: string,
  children: Node,
  element: ElementType,
  color: Color,
  className: string,
};

function Typography({
  element: Element,
  color = 'text',
  typography,
  className = '',
  children,
  ...props
}: Props) {
  const data: Data = {
    typography,
    color,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <Element
          className={`${classes.typography} ${className}`}
          {...props}
        >
          {children}
        </Element>
      )}
    </Sheet>
  );
}

Typography.defaultProps = {
  element: 'span',
  className: '',
  color: 'text',
};

export type { Color };

export default Typography;
