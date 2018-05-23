// @flow strict-local

import React, {
  type ElementType,
  type Node,
} from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import {
  type Typography as TypographyTheme,
  defaultTypography,
} from '../../theme/typography';

import Sheet, { type Data } from './Sheet';

type Color = 'secondary' | 'primary' | 'hint' | 'disabled' | 'accent' | 'error' | 'text' | null;
type Props = {
  typography: $Keys<TypographyTheme>,
  children: Node,
  element: ElementType,
  color: Color,
  className: string,
  truncate: boolean,
};

function Typography(props: Props) {
  const data: Data = {
    typography: props.typography,
    color: props.color,
    truncate: props.truncate,
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

Typography.propTypes = {
  typography: PropTypes.oneOf(Object.keys(defaultTypography)).isRequired,
  children: PropTypes.node.isRequired,
  element: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  color: PropTypes.oneOf([
    'text',
    'secondary',
    'hint',
    'disabled',
    'primary',
    'accent',
    'error',
    null,
  ]),
  className: PropTypes.string,
  truncate: PropTypes.bool,
};

Typography.defaultProps = {
  element: 'span',
  className: '',
  color: null,
  truncate: false,
};

export type { Color };

export default Typography;
