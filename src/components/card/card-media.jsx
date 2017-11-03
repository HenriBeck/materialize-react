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
 * @param {String} props.alt - A custom alt description.
 * @param {String} props.className - Additional className to be added to the img element.
 * @returns {JSX} - Returns the JSX.
 */
function CardMedia({
  classes,
  url,
  className,
  alt,
  ...props
}) {
  return (
    <img
      {...getNotDeclaredProps(props, CardMedia)}
      alt={alt}
      className={`${classes.media} ${className}`}
      src={url}
    />
  );
}

CardMedia.propTypes = {
  classes: PropTypes.shape({ media: PropTypes.string.isRequired }).isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
  alt: PropTypes.string,
};

CardMedia.defaultProps = {
  className: '',
  alt: 'card media',
};

CardMedia.styles = {
  media: {
    composes: 'card--media',
    width: '100%',
    height: 'auto',
  },
};

export default injectSheet(CardMedia.styles)(CardMedia);
