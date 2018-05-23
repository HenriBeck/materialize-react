// @flow strict-local

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Icon from '../Icon';
import createSheet from '../../styles/create-sheet';
import IconButton from '../IconButton';

type Props = {
  expanded: boolean,
  className: string,
  children: Node,
};
type Data = { expanded: boolean };

const Sheet = createSheet('ExpansionPanel-Summary', {
  summary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'min-height 140ms',
    padding: '0 24px',
    position: 'relative',
    cursor: 'pointer',
    minHeight: (data: Data) => (data.expanded ? 64 : 48),
  },

  content: {
    display: 'flex',
    flexGrow: 1,
    transition: 'margin 140ms',
    margin: (data: Data) => (data.expanded ? '20px 0' : '12px 0'),

    '& > :last-child': { paddingRight: 12 },
  },

  expandIcon: {
    transition: 'transform 140ms',
    transform: (data: Data) => (data.expanded ? 'rotate(180deg)' : 'rotate(0)'),
  },
});

function Summary(props: Props) {
  const data: Data = { expanded: props.expanded };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <div
          className={`${classes.summary} ${props.className}`}
          {...getNotDeclaredProps(props, Summary)}
        >
          <div className={classes.content}>
            {props.children}
          </div>

          <IconButton
            size={40}
            className={classes.expandIcon}
            onPress={noop}
          >
            <Icon icon="chevron-down" />
          </IconButton>
        </div>
      )}
    </Sheet>
  );
}

Summary.propTypes = {
  expanded: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Summary.defaultProps = {
  expanded: false,
  className: '',
};

export default Summary;
