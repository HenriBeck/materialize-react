// @flow strict

import React from 'react';

import createSheet from '../../styles/create-sheet';

type Props = {
  id: number,
  radius: number,
  startPosX: number,
  startPosY: number,
  color: string,
  animatingOut: boolean,
  initialOpacity: number,
  onTransitionEnd: (ev: SyntheticTransitionEvent<HTMLSpanElement>) => void,
};
type Data = {
  radius: number,
  startPosX: number,
  startPosY: number,
  color: string,
  animatingOut: boolean,
  initialOpacity: number,
};

const Sheet = createSheet('Ripple-Wave', {
  '@keyframes wave--scale-in': {
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
  },

  wave: {
    position: 'absolute',
    pointerEvents: 'none',
    overflow: 'hidden',
    borderRadius: '50%',
    transform: 'scale(0)',
    animationFillMode: 'forwards',
    transition: 'opacity 140ms linear',
    animationName: 'wave--scale-in',
    height: (data: Data) => data.radius * 2,
    width: (data: Data) => data.radius * 2,
    left: (data: Data) => data.startPosX - data.radius,
    top: (data: Data) => data.startPosY - data.radius,
    animationDuration: (data: Data) => 180 + data.radius * 0.11,
    backgroundColor: (data: Data) => data.color,
    opacity: (data: Data) => (data.animatingOut ? 0 : data.initialOpacity),
  },
});

function Wave(props: Props) {
  const data: Data = {
    radius: props.radius,
    startPosX: props.startPosX,
    startPosY: props.startPosY,
    color: props.color,
    animatingOut: props.animatingOut,
    initialOpacity: props.initialOpacity,
  };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <span
          role="presentation"
          id={props.id}
          className={classes.wave}
          onTransitionEnd={props.onTransitionEnd}
        />
      )}
    </Sheet>
  );
}

export default Wave;
