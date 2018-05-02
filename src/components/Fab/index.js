// @flow strict

import React, {
  type Element,
  type ElementType,
} from 'react';

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

function Fab({
  color,
  mini,
  className,
  onPress,
  children,
  ...props
}: Props) {
  const data: Data = { color };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <IconButton
          {...props}
          size={mini ? 40 : 56}
          className={`${classes.fab} ${className}`}
          onPress={onPress}
        >
          {cloneElement(children, { className: classes.icon })}
        </IconButton>
      )}
    </Sheet>
  );
}

Fab.defaultProps = {
  mini: false,
  className: '',
  color: 'primary',
};

export default Fab;
