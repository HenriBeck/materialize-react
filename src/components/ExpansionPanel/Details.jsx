// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

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

function Details(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div
          className={`${classes.details} ${props.className}`}
          {...getNotDeclaredProps(props, Details)}
        >
          {props.children}
        </div>
      )}
    </Sheet>
  );
}

Details.propTypes = {
  node: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Details.defaultProps = { className: '' };

export default Details;
