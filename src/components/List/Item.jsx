// @flow strict

import React, { type Node } from 'react';

import Typography from '../Typography';
import createSheet from '../../styles/create-sheet';

type Props = {
  children: Node,
  secondaryContent: Node,
  inset: boolean,
  className: string,
  rightItem: Node,
  leftItem: Node,
};
type Data = { withSecondaryContent: boolean };

const Sheet = createSheet('Item', {
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  },

  leftItem: {
    width: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    lineHeight: '16px',
    padding: (data: Data) => `${data.withSecondaryContent ? 20 : 16}px 8px`,
  },

  mainText: { fontSize: 16 },

  rightItem: {
    minWidth: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Item({
  children,
  secondaryContent,
  inset,
  className,
  rightItem,
  leftItem,
  ...props
}: Props) {
  const data: Data = { withSecondaryContent: Boolean(secondaryContent) };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <li
          className={`${classes.item} ${className}`}
          {...props}
        >
          {(inset || leftItem) && (
            <span className={classes.leftItem}>
              {leftItem}
            </span>
          )}

          <span className={classes.textContainer}>
            <Typography
              typography="body"
              className={classes.mainText}
            >
              {children}
            </Typography>

            {secondaryContent && (
              <Typography
                typography="body"
                color="secondary"
                className={classes.secondaryContent}
              >
                {secondaryContent}
              </Typography>
            )}
          </span>

          {rightItem && (
            <span className={classes.rightItem}>
              {rightItem}
            </span>
          )}
        </li>
      )}
    </Sheet>
  );
}

Item.defaultProps = {
  inset: false,
  leftItem: null,
  rightItem: null,
  secondaryContent: null,
  className: '',
};

export default Item;
