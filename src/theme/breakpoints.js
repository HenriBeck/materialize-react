// @flow strict

import { shape } from 'prop-types';

type Device = 'mobile' | 'tablet' | 'desktop';

type Breakpoints = { [key: Device]: [?number, ?number] };

const defaultBreakpoints: Breakpoints = {
  mobile: [null, 640],
  tablet: [641, 1024],
  desktop: [1025, null],
};

function validator(props: {}, propName: string): ?Error {
  const prop = props[propName];

  if (!Array.isArray(prop)) {
    return new Error(`Theme: breakpoints.${propName} must be an Array!`);
  }

  if (prop.length !== 2) {
    return new Error(`Theme: breakpoints.${propName} must have exactly two elements!`);
  }

  if (!prop.every(number => number === null || typeof number === 'number')) {
    return new Error(`Theme: The items inside breakpoints.${propName} must be a number or null!`);
  }

  return null;
}

const schema = shape({
  mobile: validator,
  tablet: validator,
  desktop: validator,
}).isRequired;

export type {
  Breakpoints,
  Device,
};

export {
  schema,
  defaultBreakpoints,
};
