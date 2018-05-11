// @flow strict

import React, { type Node } from 'react';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('DialogContent', {
  content: {
    padding: 24,
    paddingTop: 0,
    width: '100%',
    boxSizing: 'border-box',
  },
});

function Content(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <main
          className={`${classes.content} ${props.className}`}
          {...getNotDeclaredProps(props, Content)}
        >
          {props.children}
        </main>
      )}
    </Sheet>
  );
}

Content.propTypes = {};

Content.defaultProps = { className: '' };

export default Content;
