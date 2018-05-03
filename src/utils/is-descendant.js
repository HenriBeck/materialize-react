// @flow strict

export default function isDescendant(el: HTMLElement, target?: HTMLElement) {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }

  return false;
}
