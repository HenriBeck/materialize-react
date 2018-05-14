// @flow strict-local

import React from 'react';
import clamp from 'clamp';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Sheet, { type Data } from './Sheet';

type Props = {
  progress: number,
  indeterminate: boolean,
  active: boolean,
  className: string,
};

function Progress(props: Props) {
  const progress = clamp(props.progress, 0, 100);
  const data: Data = {
    indeterminate: props.indeterminate,
    active: props.active,
    progress,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <span
          {...getNotDeclaredProps(props, Progress)}
          role="progressbar"
          className={`${classes.progress} ${props.className}`}
          aria-valuenow={progress}
          aria-valuemax="100"
          aria-valuemin="0"
        >
          <div className={classes.bar} />
        </span>
      )}
    </Sheet>
  );
}

Progress.propTypes = {
  progress: PropTypes.number,
  indeterminate: PropTypes.bool,
  active: PropTypes.bool,
  className: PropTypes.string,
};

Progress.defaultProps = {
  progress: 0,
  indeterminate: false,
  className: '',
  active: false,
};

export default Progress;
