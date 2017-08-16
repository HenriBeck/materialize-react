import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import elevation from '../../styles/elevation';
import getNotDeclaredProps from '../../get-not-declared-props';

import CardActions from './card-actions';

/**
 * A component which renders a material design card.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes object provided by Jss.
 * @param {JSX} props.children - The content for the card.
 * @param {String} props.className - Additional className for the card.
 * @returns {JSX} - Returns the JSX.
 */
export function Card({
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

Card.styles = ({ card: theme }) => {
  return {
    card: {
      composes: 'card',
      position: 'relative',
      borderRadius: theme.borderRadius,
      boxShadow: elevation(theme.elevation),
      margin: theme.margin,
    },
  };
};

Card.CardActions = CardActions;

export default injectSheet(Card.styles)(Card);
