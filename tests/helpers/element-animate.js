import is from 'is_js';
import ReactDOM from 'react-dom';

window.Element.prototype.animate = function animate(keyframes, options) {
  // eslint-disable-next-line react/no-find-dom-node
  const elem = ReactDOM.findDOMNode(this);
  const isReverse = options.direction === 'reverse';

  if (is.array(keyframes)) {
    const lastKeyframe = keyframes[isReverse ? 0 : keyframes.length - 1];

    Object
      .keys(lastKeyframe)
      .forEach((key) => {
        elem.style[key] = lastKeyframe[key];
      });
  } else {
    Object
      .keys(keyframes)
      .forEach((key) => {
        const values = keyframes[key];

        elem.style[key] = values[isReverse ? 0 : values.length - 1];
      });
  }

  return this;
};
