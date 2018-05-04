// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

import Actions from './Actions';
import Content from './Content';
import Media from './Media';
import Header from './Header';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('Card', (theme: Theme): { card: {} } => {
  return {
    card: {
      borderRadius: 2,
      backgroundColor: theme.sheet,
      boxShadow: theme.elevation['3'],
    },
  };
});

function Card({
  className,
  children,
  ...props
}: Props): Node {
  return (
    <Sheet>
      {({ classes }) => (
        <div
          className={`${classes.card} ${className}`}
          {...props}
        >
          {children}
        </div>
      )}
    </Sheet>
  );
}

Card.defaultProps = { className: '' };

Card.Actions = Actions;
Card.Content = Content;
Card.Media = Media;
Card.Header = Header;

export default Card;
