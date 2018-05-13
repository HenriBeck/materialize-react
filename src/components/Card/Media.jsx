// @flow strict

import React from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';

type Props = {
  className: string,
  alt: string,
  url: string,
};

const Sheet = createSheet('Card-Media', {
  media: {
    width: '100%',
    height: 'auto',
  },
});

function Media(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <img
          alt={props.alt}
          className={`${classes.media} ${props.className}`}
          src={props.url}
          {...getNotDeclaredProps(props, Media)}
        />
      )}
    </Sheet>
  );
}

Media.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

Media.defaultProps = {
  className: '',
  alt: 'Card media',
};

export default Media;
