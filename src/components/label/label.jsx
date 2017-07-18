import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { body1 } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';
import connectWithTheme from '../../styles/theme/connect-with-theme';

/**
 * A function to render a label tag with special material design stylings.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the label component.
 */
export function Label(props) {
  return (
    <label
      aria-disabled={props.disabled}
      htmlFor={props.htmlFor}
      className={`${props.classes.label} ${props.className}`}
      {...getNotDeclaredProps(props, Label)}
    >
      {props.children}
    </label>
  );
}

Label.propTypes = {
  classes: PropTypes.object.isRequired,
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
      ...body1,
      composes: 'label',
      userSelect: 'none',
      padding: '0 8px',
      color: theme.color,

      '&[aria-disabled=true]': { color: theme.disabledColor },
    },
  };
};

export default injectSheet(Label.styles)(Label);

