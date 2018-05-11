// @flow strict

import React, { type Node } from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('Content', {
  content: {
    padding: '0 16px',
    margin: '16px 0',

    '&:last-child': { marginBottom: 24 },
  },
});

function Content(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div
          className={`${classes.content} ${props.className}`}
          {...getNotDeclaredProps(props, Content)}
        >
          {props.children}
        </div>
      )}
    </Sheet>
  );
}

Content.propTypes = {};

Content.defaultProps = { className: '' };

export default Content;
