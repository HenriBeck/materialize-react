// @flow strict

import React from 'react';

import { clamp } from '../../utils/react';

import Sheet, { type Data } from './Sheet';

type Props = {
  progress: number,
  indeterminate: boolean,
  active: boolean,
  className: string,
};

function Progress({
  progress: progressProp,
  indeterminate,
  active,
  className,
  ...props
}: Props) {
  const progress = clamp({
    value: progressProp,
    min: 0,
    max: 100,
  });
  const data: Data = {
    indeterminate,
    active,
    progress,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <span
          {...props}
          role="progressbar"
          className={`${classes.progress} ${className}`}
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

Progress.defaultProps = {
  progress: 0,
  indeterminate: false,
  className: '',
  active: false,
};

export default Progress;
