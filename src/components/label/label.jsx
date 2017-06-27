import React from 'react';
import PropTypes from 'prop-types';

import typo from '../../styles/plugins/typo';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';

/**
 * A function to render a label tag with special material design stylings.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes object provided by jss.
 * @param {String} props.children - Text for the label.
 * @param {String} props.className - Additional className to apply.
 * @param {Boolean} props.disabled - If the label is disabled.
 * @returns {JSX} - Returns the label component.
 */
export function Label({
  classes,
  children,
  className,
  disabled,
  ...props
}) {
  return (
    <label
      aria-disabled={disabled}
      htmlFor={props.for}
      className={`${classes.label} ${className}`}
      {...getNotDeclaredProps(props, Label, 'for')}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  for: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Label.defaultProps = {
  className: '',
  disabled: false,
};

const styles = {
  label: {
    ...typo('body1'),
    composes: 'label',
    userSelect: 'none',
    padding: '0 8px',
    color: props => props.theme.color,

    '&[aria-disabled]': { color: props => props.theme.disabledColor },
  },
};

export default connectWithTheme(injectSheet(styles)(Label), 'label');

