// @flow strict

type Event = SyntheticMouseEvent<HTMLElement> | SyntheticTouchEvent<HTMLElement>;

export default function getCoords(ev: Event): { x: number, y: number } | null {
  // Check for touch positions
  if (Array.isArray(ev.touches) && ev.touches.length > 0) {
    return {
      // $FlowFixMe
      x: ev.touches[0].clientX,
      // $FlowFixMe
      y: ev.touches[0].clientY,
    };
  }

  // Check for other common values in the event
  if (typeof ev.clientX === 'number' && typeof ev.clientY === 'number') {
    return {
      x: ev.clientX,
      y: ev.clientY,
    };
  }

  return null;
}
