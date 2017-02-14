/**
 * A function to generate some layout flexbox styles.
 *
 * @param {Object} options - The options.
 * @param {String} options.direction - The direction the elements will be ordered.
 * @param {Boolean} options.reverse - Whether we should reverse the direction.
 * @param {Boolean} options.inline - Whether the layout should be inline.
 * @param {String} options.mainAlign - How the elements should be aligned on the main axis.
 * @param {String} options.crossAlign - How the elements should be aligned on the cross axis.
 * @param {Boolean} options.wrap - Whether the layout should wrap it's children.
 * @returns {Object} - Returns an object with style properties.
 */
export default function layout({
  direction,
  reverse = false,
  inline = false,
  mainAlign,
  crossAlign,
  wrap = false,
}) {
  const styles = { display: inline ? 'inline-flex' : 'flex' };

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
