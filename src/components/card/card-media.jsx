import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which renders an image inside a card.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {String} props.url - The url for the image.
 * @param {String} props.className - Additional className to be added to the img element.
 * @returns {JSX} - Returns the JSX.
 */
export function CardMedia({
  classes,
  url,
  className,
  ...props
}) {
  return (
    <img
      {...getNotDeclaredProps(props, CardMedia)}
      alt="card-media"
      className={`${classes.media} ${className}`}
      src={url}
    />
  );
}

CardMedia.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CardMedia.defaultProps = { className: '' };

CardMedia.styles = {
  media: {
    composes: 'card--media',
    width: '100%',
    height: 'auto',
  },
};

export default injectSheet(CardMedia.styles)(CardMedia);
