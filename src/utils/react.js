// @flow strict

import React, {
  type Element,
  type ElementType,
  type ChildrenArray,
} from 'react';

type Props = { className?: string };

function cloneElement<E: Element<ElementType>>(
  element: E,
  props: Props,
): E {
  return React.cloneElement(element, {
    ...props,
    className: `${props.className || ''} ${element.props.className || ''}`.trim(),
  });
}

function cloneChildren<E: Element<ElementType>>(
  children: ChildrenArray<E>,
  props: Props | (child: E) => Props,
) {
  return React.Children.map(children, (child: E): E => {
    if (React.isValidElement(child)) {
      return typeof props === 'function'
        ? cloneElement(child, props(child))
        : cloneElement(child, props);
    }

    return child;
  });
}

export {
  cloneElement,
  cloneChildren,
};
