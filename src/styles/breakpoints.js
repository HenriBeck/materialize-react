export const devices = {
  mobile: [null, 640],
  tablet: [641, 1024],
  desktop: [1025, null],
};

/**
 * Get the min-width query for the specific device.
 *
 * @param {String} device - The device name.
 * @returns {String} - Returns the media query.
 */
export function getMinWidthQuery(device) {
  return devices[device][0] ? `and (min-width: ${devices[device][0]}px)` : '';
}

/**
 * Get the max-width query for the specified device.
 *
 * @param {String} device - The device name.
 * @returns {String} - Returns the media query.
 */
export function getMaxWidthQuery(device) {
  return devices[device][1] ? `and (max-width: ${devices[device][1]}px)` : '';
}

export default {
  up(device) {
    return `@media screen ${getMinWidthQuery(device)}`.trim();
  },

  down(device) {
    return `@media screen ${getMaxWidthQuery(device)}`.trim();
  },

  only(device) {
    return `@media screen ${getMinWidthQuery(device)} ${getMaxWidthQuery(device)}`.trim();
  },
};
