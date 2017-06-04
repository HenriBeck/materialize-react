'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = layout;
/**
 * A function to generate some layout flexbox styles.
 *
 * @param {Object} options - The options.
 * @param {String} options.direction - The direction the elements will be ordered.
 * @param {Boolean} [options.reverse] - Whether we should reverse the direction.
 * @param {Boolean} [options.inline] - Whether the layout should be inline.
 * @param {String} options.mainAlign - How the elements should be aligned on the main axis.
 * @param {String} options.crossAlign - How the elements should be aligned on the cross axis.
 * @param {Boolean} [options.wrap] - Whether the layout should wrap it's children.
 * @returns {Object} - Returns an object with style properties.
 */
function layout(_ref) {
  var direction = _ref.direction,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === undefined ? false : _ref$reverse,
      _ref$inline = _ref.inline,
      inline = _ref$inline === undefined ? false : _ref$inline,
      mainAlign = _ref.mainAlign,
      crossAlign = _ref.crossAlign,
      _ref$wrap = _ref.wrap,
      wrap = _ref$wrap === undefined ? false : _ref$wrap;

  var styles = { display: inline ? 'inline-flex' : 'flex' };

  if (direction === 'horizontal') {
    styles.flexDirection = reverse ? 'row-reverse' : 'row';
  } else if (direction === 'vertical') {
    styles.flexDirection = reverse ? 'column-reverse' : 'column';
  }

  if (mainAlign) {
    styles.justifyContent = mainAlign;
  }

  if (crossAlign) {
    styles.alignItems = crossAlign;
  }

  if (wrap) {
    styles.flexWrap = reverse ? 'wrap-reverse' : 'wrap';
  }

  return styles;
}