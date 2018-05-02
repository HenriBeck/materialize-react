// @flow strict

import React, {
  type Element,
  type ElementType,
  type ChildrenArray,
} from 'react';

type Event = SyntheticMouseEvent<HTMLElement> | SyntheticTouchEvent<HTMLElement>;
type Props = { className?: string };

function mergeClassNames(...classNames: $ReadOnlyArray<?mixed>): string {
  return classNames
    .filter((className: mixed) => typeof className === 'string')
    .join(' ');
}

function clamp({
  value,
  min,
  max,
}: {
  value: number,
  min: number,
  max: number,
}): number {
  return Math.max(min, Math.min(Math.floor(value), max));
}

function getCoords(ev: Event): { x: number, y: number } | null {
  // Check for touch positions
  if (Array.isArray(ev.touches) && ev.touches.length > 0) {
    return {
      // $FlowFixMe
      x: ev.touches[0].clientX,
      // $FlowFixMe
      y: ev.touches[0].clientY,
    };
  }

  // Check for other common values in the event
  if (typeof ev.clientX === 'number' && typeof ev.clientY === 'number') {
    return {
      x: ev.clientX,
      y: ev.clientY,
    };
  }

  return null;
}

function cloneElement<E: Element<ElementType>>(
  element: E,
  props: Props,
): E {
  return React.cloneElement(element, {
    ...props,
    className: mergeClassNames(
      props.className,
      element.props.className,
    ),
  });
}

function cloneChildren<E: Element<ElementType>>(
  children: ChildrenArray<E>,
  props: Props | (element: E) => Props,
): ChildrenArray<E> {
  return React.Children.map(children, (child: E): E => {
    if (React.isValidElement(child)) {
      return typeof props === 'function'
        ? cloneElement(child, props(child))
        : cloneElement(child, props);
    }

    return child;
  });
}

function isDescendant(el: HTMLElement, target: HTMLElement) {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }

  return false;
}

export {
  mergeClassNames,
  clamp,
  cloneElement,
  cloneChildren,
  getCoords,
  isDescendant,
};
