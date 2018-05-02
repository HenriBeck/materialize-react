// @flow strict

import React, { type Node } from 'react';
import noop from 'lodash.noop';

import Icon from '../Icon';
import createSheet from '../../styles/create-sheet';
import IconButton from '../IconButton';

type Props = {
  expanded: boolean,
  className: string,
  children: Node,
};
type Data = { expanded: boolean };

const Sheet = createSheet('ExpansionPanelSummary', {
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

function Summary({
  expanded,
  className,
  children,
  ...props
}: Props): Node {
  const data: Data = { expanded };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <div
          className={`${classes.summary} ${className}`}
          {...props}
        >
          <div className={classes.content}>
            {children}
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

Summary.defaultProps = {
  expanded: false,
  className: '',
};

export default Summary;
