import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import breakpoints from '../../styles/breakpoints';
import getNotDeclaredProps from '../../get-not-declared-props';
import {
  headline,
  body1,
} from '../../styles/typography';

/**
 * A component which renders a header for a card.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes provided by Jss.
 * @param {JSX} props.children - The main title for the card.
 * @param {JSX} props.subtitle - An optional subtitle for the card.
 * @param {JSX} props.avatar - An optional avatar element for the header.
 * @returns {JSX} - Returns the JSX.
 */
function CardHeader(props) {
  return (
    <header
      className={`${props.classes.header} ${props.avatar && props.classes.withAvatar}`}
      {...getNotDeclaredProps(props, CardHeader)}
    >
      {props.avatar && (
        <span className={props.classes.avatar}>
          {props.avatar}
        </span>
      )}

      <div className={props.classes.container}>
        <span className={props.classes.title}>
          {props.children}
        </span>

        {props.subtitle && (
          <span className={props.classes.subtitle}>
            {props.subtitle}
          </span>
        )}
      </div>
    </header>
  );
}

CardHeader.propTypes = {
  classes: PropTypes.shape({
    header: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    withAvatar: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  avatar: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
};

CardHeader.defaultProps = {
  subtitle: '',
  avatar: false,
};

CardHeader.styles = (theme) => {
  return {
    header: {
      composes: 'card--header',
      display: 'flex',
      flexDirection: 'row',
      padding: '0 16px',
      margin: '16px 0',

      '&:last-child': { marginBottom: 24 },

      [breakpoints.up('tablet')]: { padding: '0 24px' },
    },

    container: {
      composes: 'card--header-container',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    title: {
      composes: 'card--header-title',
      ...headline,
      lineHeight: 1,
    },

    subtitle: {
      composes: 'card--header-subtitle',
      ...body1,
      lineHeight: 1,
      paddingTop: 12,
      color: theme.secondaryTextColor,
    },

    avatar: {
      composes: 'card--header-avatar',
      ...body1,
      height: 40,
      width: 40,
      marginRight: 16,
      position: 'relative',

      '& > *': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: 'center',
        borderRadius: '50%',
        lineHeight: '40px',
      },
    },

    withAvatar: {
      composes: 'card--header-with-avatar',
      margin: '16px 0',

      '& $title': {
        ...body1,
        lineHeight: '20px',
      },

      '& $subtitle': {
        paddingTop: 0,
        lineHeight: '20px',
      },
    },
  };
};

export default injectSheet(CardHeader.styles)(CardHeader);
