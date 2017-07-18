// Shadow colors
export const shadow1 = 'rgba(0, 0, 0, 0.14)';
export const shadow2 = 'rgba(0, 0, 0, 0.12)';
export const shadow3 = 'rgba(0, 0, 0, 0.2)';
/**
 * A function to generate shadows.
 *
 * @param {Number} elevate - The elevation to apply.
 * @returns {Object} - Returns an object with the boxShadow property.
 */
export default function elevation(elevate) {
  switch (elevate) {
    case 0:
      return 'none';
    case 1:
      return [
        `0 2px 2px  0   ${shadow1}`,
        `0 1px 5px  0   ${shadow2}`,
        `0 3px 1px -2px ${shadow3}`,
      ].join(',');
    case 2:
      return [
        `0 3px 4px  0   ${shadow1}`,
        `0 1px 8px  0   ${shadow2}`,
        `0 3px 3px -2px ${shadow3}`,
      ].join(',');
    case 3:
      return [
        `0 4px  5px  0   ${shadow1}`,
        `0 1px 10px  0   ${shadow2}`,
        `0 2px  4px -1px ${shadow3}`,
      ].join(',');
    case 4:
      return [
        `0 6px 10px  0   ${shadow1}`,
        `0 1px 18px  0   ${shadow2}`,
        `0 3px  5px -1px ${shadow3}`,
      ].join(',');
    case 5:
      return [
        `0 8px 10px  1px ${shadow1}`,
        `0 3px 14px  2px ${shadow2}`,
        `0 5px  5px -3px ${shadow3}`,
      ].join(',');
    case 6:
      return [
        `0 12px 16px  1px ${shadow1}`,
        `0  4px 22px  3px ${shadow2}`,
        `0  6px  7px -4px ${shadow3}`,
      ].join(',');
    case 7:
      return [
        `0 16px 24px  2px ${shadow1}`,
        `0  6px 30px  5px ${shadow2}`,
        `0  8px 10px -5px ${shadow3}`,
      ].join(',');
    default:
      return 'none';
  }
}
