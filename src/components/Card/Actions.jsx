// @flow strict-local

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  className: string,
  stacked: boolean,
};
type Data = { stacked: boolean };

const Sheet = createSheet('Card-Actions', {
  actions: {
    gridGap: '0 4px',
    padding: '8px 0',
    display: (data: Data) => (data.stacked ? 'grid' : 'flex'),
    gridTemplateColumns: (data: Data) => (data.stacked ? 'min-content' : null),
  },
});

function Actions(props: Props) {
  const data: Data = { stacked: props.stacked };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <div
          className={`${classes.actions} ${props.className}`}
          {...getNotDeclaredProps(props, Actions)}
        >
          {props.children}
        </div>
      )}
    </Sheet>
  );
}

Actions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  stacked: PropTypes.bool,
};

Actions.defaultProps = {
  stacked: false,
  className: '',
};

export default Actions;
