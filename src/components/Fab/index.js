// @flow strict-local

import React, {
  type Element,
  type ElementType,
} from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import IconButton from '../IconButton';
import { cloneElement } from '../../utils/react';

import Sheet, { type Data } from './Sheet';

type Props = {
  color: 'accent' | 'primary',
  mini: boolean,
  className: string,
  onPress: () => void,
  children: Element<ElementType>,
};

function Fab(props: Props) {
  const data: Data = { color: props.color };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <IconButton
          size={props.mini ? 40 : 56}
          className={`${classes.fab} ${props.className}`}
          onPress={props.onPress}
          {...getNotDeclaredProps(props, Fab)}
        >
          {cloneElement(props.children, { className: classes.icon })}
        </IconButton>
      )}
    </Sheet>
  );
}

Fab.propTypes = {
  children: PropTypes.element.isRequired,
  onPress: PropTypes.func.isRequired,
  mini: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'accent']),
};

Fab.defaultProps = {
  mini: false,
  className: '',
  color: 'primary',
};

export default Fab;
