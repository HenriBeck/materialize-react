// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

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

const Sheet = createSheet('Card', (theme: Theme) => {
  return {
    card: {
      borderRadius: 2,
      backgroundColor: theme.sheet,
      boxShadow: theme.elevation['3'],
    },
  };
});

function Card(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div
          className={`${classes.card} ${props.className}`}
          {...getNotDeclaredProps(props, Card)}
        >
          {props.children}
        </div>
      )}
    </Sheet>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = { className: '' };

Card.Actions = Actions;
Card.Content = Content;
Card.Media = Media;
Card.Header = Header;

export default Card;
