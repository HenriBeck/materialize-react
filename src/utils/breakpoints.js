// @flow strict

import { type Device } from '../theme/breakpoints';
import { type Theme } from '../theme/schema';

function getMinWidthQuery({ breakpoints }: Theme, device: Device): string {
  return typeof breakpoints[device][0] === 'number'
    ? ` and (min-width: ${breakpoints[device][0]}px)`
    : '';
}

function getMaxWidthQuery({ breakpoints }: Theme, device: Device): string {
  return typeof breakpoints[device][1] === 'number'
    ? ` and (max-width: ${breakpoints[device][1]}px)`
    : '';
}

function up(theme: Theme, device: Device): string {
  return `@media screen${getMinWidthQuery(theme, device)}`;
}

function down(theme: Theme, device: Device): string {
  return `@media screen${getMaxWidthQuery(theme, device)}`;
}

function only(theme: Theme, device: Device): string {
  const minWidth = getMinWidthQuery(theme, device);
  const maxWidth = getMaxWidthQuery(theme, device);

  return `@media screen${minWidth}${maxWidth}`;
}

export {
  up,
  down,
  only,
};
