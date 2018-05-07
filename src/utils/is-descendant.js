// @flow strict

export default function isDescendant(el: HTMLElement, target: ?HTMLElement) {
  if (target) {
    return el === target || isDescendant(el, target.parentNode);
  }

  return false;
}
