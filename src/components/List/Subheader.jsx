// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import createSheet from '../../styles/create-sheet';
import Typography from '../Typography';

type Props = {
  children: Node,
  inset: boolean,
  className: string,
};
type Data = { inset: boolean };

const Sheet = createSheet('Subheader', {
  subheader: {
    position: 'relative',
    padding: 16,
    height: 48,
    boxSizing: 'border-box',
    width: '100%',
    lineHeight: '16px',
    paddingLeft(data: Data): number | null {
      return data.inset ? 72 : null;
    },
  },
});

function Subheader(props: Props) {
  const data: Data = { inset: props.inset };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <Typography
          {...getNotDeclaredProps(props, Subheader)}
          element="li"
          color="secondary"
          typography="body"
          className={`${classes.subheader} ${props.className}`}
        >
          {props.children}
        </Typography>
      )}
    </Sheet>
  );
}

Subheader.propTypes = {
  children: PropTypes.node.isRequired,
  inset: PropTypes.bool,
  className: PropTypes.string,
};

Subheader.defaultProps = {
  inset: false,
  className: '',
};

export default Subheader;
