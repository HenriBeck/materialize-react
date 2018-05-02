// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';

type Props = {
  className: string,
  children: Node,
};

const Sheet = createSheet('ExpansionPanelDetails', {
  details: {
    display: 'flex',
    flexGrow: 1,
    padding: '8px 24px 24px',
  },
});

function Details({
  className,
  children,
  ...props
}: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div
          className={`${classes.details}${className}`}
          {...props}
        >
          {children}
        </div>
      )}
    </Sheet>
  );
}

Details.defaultProps = { className: '' };

export default Details;
