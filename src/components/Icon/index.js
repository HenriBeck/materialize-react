// @flow strict-local

import React from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  size: number | string,
  disabled: boolean,
  icon: string,
  color: 'light' | 'dark' | null,
  className: string,
  children?: Node,
};

function Icon(props: Props) {
  const data: Data = {
    disabled: props.disabled,
    size: props.size,
    color: props.color,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <i
          {...getNotDeclaredProps(props, Icon)}
          className={`mdi mdi-${props.icon} ${classes.icon} ${props.className}`}
          aria-disabled={props.disabled}
        />
      )}
    </Sheet>
  );
}

Icon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['light', 'dark', null]),
};

Icon.defaultProps = {
  className: '',
  size: 24,
  disabled: false,
  color: null,
};

export default Icon;
