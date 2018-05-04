// @flow strict

type Breakpoints = {
  mobile: [null, number],
  tablet: [number, number],
  desktop: [number, null],
};
type Device = $Keys<Breakpoints>;

const defaultBreakpoints: Breakpoints = {
  mobile: [null, 640],
  tablet: [641, 1024],
  desktop: [1025, null],
};

export type {
  Breakpoints,
  Device,
};

export { defaultBreakpoints };
