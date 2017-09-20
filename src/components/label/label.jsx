import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { label } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A function to render a label tag with special material design stylings.
 *
 * @param {Object} props - The props for the component.
 * @param {Boolean} props.disabled - Whether or not the label is disabled.
 * It will apply a different text color.
 * @param {String} props.htmlFor - For which the element is a label.
 * Needed for better UX.
 * @param {Object} props.classes - Classes for the component. Provided by Jss.
 * @param {String} props.className - Additional className for the label component.
 * @param {JSX} props.children - Children to be rendered inside the Label.
 * @returns {JSX} - Returns the label component.
 */
export function Label({
  disabled,
  htmlFor,
  classes,
  className,
  children,
  ...props
}) {
  return (
    <label
      aria-disabled={disabled}
      htmlFor={htmlFor}
      className={`${classes.label} ${className}`}
      {...getNotDeclaredProps(props, Label)}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  classes: PropTypes.shape({ label: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Label.defaultProps = {
  className: '',
  disabled: false,
};

Label.styles = ({ label: theme }) => {
  return {
    label: {
      ...label,
      composes: 'label',
      userSelect: 'none',
      padding: '0 8px',
      color: theme.color,

      '&[aria-disabled=true]': { color: theme.disabledColor },
    },
  };
};

export default injectSheet(Label.styles)(Label);

