import warning from 'warning';

const generateShadow = color => (...values) => `${values.join('px ')}${color}`;
const keyUmbra = generateShadow('rgba(0, 0, 0, 0.14)');
const keyPenumbra = generateShadow('rgba(0, 0, 0, 0.12)');
const ambientShadow = generateShadow('rgba(0, 0, 0, 0.4)');

/**
 * A function to generate shadows.
 * Taken from here:
 * https://github.com/PolymerElements/paper-styles/blob/master/shadow.html.
 *
 * @param {Number} elevate - The elevation to apply.
 * @returns {Object} - Returns an object with the boxShadow property.
 */
export default function elevation(elevate) {
  switch (elevate) {
    case 0:
      return 'none';
    case 2:
      return [
        keyUmbra(0, 2, 2, 0),
        keyPenumbra(0, 1, 5, 0),
        generateShadow('rgba(0, 0, 0, 0.2)')(0, 3, 1, -2),
      ].join(',');
    case 3:
      return [
        keyUmbra(0, 3, 4, 0),
        keyPenumbra(0, 1, 8, 0),
        ambientShadow(0, 3, 3, -2),
      ].join(',');
    case 4:
      return [
        keyUmbra(0, 4, 5, 0),
        keyPenumbra(0, 1, 10, 0),
        ambientShadow(0, 2, 4, -1),
      ].join(',');
    case 6:
      return [
        keyUmbra(0, 6, 10, 0),
        keyPenumbra(0, 1, 18, 0),
        ambientShadow(0, 3, 5, -1),
      ].join(',');
    case 8:
      return [
        keyUmbra(0, 8, 10, 1),
        keyPenumbra(0, 3, 14, 2),
        ambientShadow(0, 5, 5, -3),
      ].join(',');
    case 12:
      return [
        keyUmbra(0, 12, 16, 1),
        keyPenumbra(0, 4, 22, 3),
        ambientShadow(0, 6, 7, -4),
      ].join(',');
    case 16:
      return [
        keyUmbra(0, 16, 24, 2),
        keyPenumbra(0, 6, 30, 5),
        ambientShadow(0, 8, 10, -5),
      ].join(', ');
    case 24:
      return [
        keyUmbra(0, 24, 38, 3),
        keyPenumbra(0, 9, 46, 8),
        ambientShadow(0, 11, 15, -7),
      ].join(',');
    default:
      warning(
        false,
        `${elevate} is not a valid elevation! Please choose from: 0, 2, 3, 4, 6, 8, 12, 16, 24`,
      );

      return 'none';
  }
}
