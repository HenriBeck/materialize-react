// @flow strict

import React, { type Node } from 'react';

import createSheet from '../../styles/create-sheet';
import Typography from '../Typography';

type Props = {
  children: Node,
  className: string,
  avatar: Node,
  subtitle: Node,
};
type Data = { withAvatar: boolean };

const Sheet = createSheet('Header', {
  header: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    padding: '0 16px',
    margin: (data: Data) => (data.withAvatar ? '16px 0' : '24px 0 16px'),

    '&:last-child': { marginBottom: (data: Data) => (data.withAvatar ? null : 24) },
  },

  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: { lineHeight: (data: Data) => (data.withAvatar ? '20px' : 1) },

  subtitle: {
    lineHeight: (data: Data) => (data.withAvatar ? '20px' : 1),
    paddingTop: (data: Data) => (data.withAvatar ? 0 : 12),
  },

  avatar: {
    height: 40,
    width: 40,
    marginRight: 16,
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
  },
});

function Header({
  className,
  avatar,
  children,
  subtitle,
  ...props
}: Props): Node {
  const withAvatar = Boolean(avatar);
  const data: Data = { withAvatar };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <header
          className={`${classes.header} ${className}`}
          {...props}
        >
          {withAvatar && (
            <span className={classes.avatar}>
              {avatar}
            </span>
          )}

          <div className={classes.container}>
            <Typography
              typography={withAvatar ? 'body' : 'headline'}
              className={classes.title}
            >
              {children}
            </Typography>

            {Boolean(subtitle) && (
              <Typography
                color="secondary"
                typography="body"
                className={classes.subtitle}
              >
                {subtitle}
              </Typography>
            )}
          </div>
        </header>
      )}
    </Sheet>
  );
}

Header.defaultProps = {
  subtitle: '',
  avatar: null,
  className: '',
};

export default Header;
