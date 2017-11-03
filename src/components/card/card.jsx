import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import elevation from '../../styles/elevation';
import getNotDeclaredProps from '../../get-not-declared-props';
import breakpoints from '../../styles/breakpoints';

import Actions from './card-actions';
import CardContent from './card-content';
import Media from './card-media';
import Header from './card-header';

/**
 * A component which renders a material design card.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes object provided by Jss.
 * @param {JSX} props.children - The content for the card.
 * @param {String} props.className - Additional className for the card.
 * @returns {JSX} - Returns the JSX.
 */
function Card({
  classes,
  children,
  className,
  ...props
}) {
  return (
    <div
      className={`${classes.card} ${className}`}
      {...getNotDeclaredProps(props, Card)}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  classes: PropTypes.shape({ card: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = { className: '' };

Card.styles = (theme) => {
  return {
    card: {
      overflow: 'hidden',
      composes: 'card',
      position: 'relative',
      borderRadius: 2,
      backgroundColor: theme.sheetColor,
      boxShadow: elevation(3),
      margin: 8,

      [breakpoints.only('tablet')]: { margin: 16 },

      [breakpoints.only('desktop')]: { margin: 24 },
    },
  };
};

Card.Actions = Actions;
Card.Content = CardContent;
Card.Media = Media;
Card.Header = Header;

export default injectSheet(Card.styles)(Card);
