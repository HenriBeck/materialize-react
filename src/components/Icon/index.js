// @flow strict

import {
  type Element,
  type ElementType,
} from 'react';
import { withTheme } from 'react-jss';

import { cloneElement } from '../../utils/react';
import { type Theme } from '../../theme/types';

type Props = {
  size: number,
  disabled: boolean,
  children: Element<ElementType>,
  theme: Theme,
};

function Icon({
  theme,
  size,
  disabled,
  children,
  ...props
}: Props) {
  return cloneElement(children, {
    size,
    color: disabled ? theme.disabled : theme.icon,
    ...props,
  });
}

Icon.defaultProps = {
  className: '',
  size: 24,
  disabled: false,
};

export default withTheme(Icon);
