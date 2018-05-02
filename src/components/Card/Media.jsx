// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';

type Props = {
  className: string,
  alt: string,
  url: string,
};

const Sheet = createSheet('Media', {
  media: {
    width: '100%',
    height: 'auto',
  },
});

function Media({
  className,
  alt,
  url,
  ...props
}: Props): Node {
  return (
    <Sheet>
      {({ classes }) => (
        <img
          {...props}
          alt={alt}
          className={`${classes.media} ${className}`}
          src={url}
        />
      )}
    </Sheet>
  );
}

Media.defaultProps = {
  className: '',
  alt: 'Card media',
};

export default Media;
