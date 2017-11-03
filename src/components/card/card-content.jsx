import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import breakpoints from '../../styles/breakpoints';
import { body1 } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component to render the content of a card.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes object provided by Jss.
 * @param {JSX} props.children - The content.
 * @param {String} props.className - An additional class name to be applied to the element.
 * @returns {JSX} - Returns the JSX.
 */
function CardContent({
  classes,
  children,
  className,
  ...props
}) {
  return (
    <div
      className={`${classes.content} ${className}`}
      {...getNotDeclaredProps(props, CardContent)}
    >
      {children}
    </div>
  );
}

CardContent.propTypes = {
  classes: PropTypes.shape({ content: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.defaultProps = { className: '' };

CardContent.styles = {
  content: {
    composes: 'card--content',
    ...body1,
    padding: '0 16px',
    margin: '16px 0',

    '&:last-child': { marginBottom: 24 },

    [breakpoints.up('tablet')]: { padding: '0 24px' },
  },
};

export default injectSheet(CardContent.styles)(CardContent);
