// @flow strict-local

import React, {
  type Element,
  type ComponentType,
} from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';
import { withTheme } from 'react-jss';

import { themes } from '../../theme';
import { type Theme } from '../../theme/types';

type Props = {
  theme: Theme,
  size: number,
  disabled: boolean,
  color: 'light' | 'dark' | null,
  children: Element<ComponentType<{
    size: number,
    color: string,
  }>>,
};

function Icon(props: Props) {
  const type = props.color ? props.color : props.theme.type;
  const color = props.disabled ? themes[type].disabled : themes[type].icon;

  return React.cloneElement(props.children, {
    size: props.size,
    color,
    ...getNotDeclaredProps(props, Icon),
  });
}

Icon.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(['light', 'dark', null]),
};

Icon.defaultProps = {
  size: 24,
  disabled: false,
  color: null,
};

export default withTheme(Icon);
