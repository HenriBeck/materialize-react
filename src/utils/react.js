import {
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import classnames from 'classnames';

/**
 * Clone the passed children with some additional props and merge the class names.
 *
 * @param {JSX[]} children - An array of JSX nodes.
 * @param {Object} props - The props to merge.
 * @returns {JSX[]} - Returns the cloned children.
 */
export function cloneChildrenWithClassName(children, props) { // eslint-disable-line
  return Children.map(children, child => (
    isValidElement(child)
    && cloneElement(child, {
      ...props,
      className: classnames(
        props.className,
        child.props.className,
      ),
    })
  ));
}
