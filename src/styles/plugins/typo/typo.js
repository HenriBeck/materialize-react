import typos from './typography';
import warning from 'utils/warning';

/**
 * A function to get the typography based on a name.
 *
 * @param {String} name - The name of the typography specified in typography.js.
 * @returns {Object} - Returns the styles for the typography.
 */
export default function typo(name) {
  warning(
    !typos[name],
    `${name} doesn't exists as a valid typography`,
  );

  return typos[name];
}
