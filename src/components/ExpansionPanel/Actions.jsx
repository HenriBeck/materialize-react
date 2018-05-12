// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

type Props = {
  children: Node,
  className: string,
};

const Sheet = createSheet('ExpansionPanel-Actions', (theme: Theme) => {
  return {
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '16px 8px',

      '&::before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        backgroundColor: theme.divider,
      },
    },
  };
});

function Actions(props: Props) {
  return (
    <Sheet>
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
};

Actions.defaultProps = { className: '' };

export default Actions;
