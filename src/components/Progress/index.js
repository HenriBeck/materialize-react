// @flow strict

import React from 'react';
import clamp from 'clamp';

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
  const progress = clamp(progressProp, 0, 100);
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
