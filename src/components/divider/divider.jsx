import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component that renders a horizontal line.
 *
 * @param {Object} props - Props of the component.
 * @param {Object} props.classes - The classes provided by jss.
 * @param {String} props.className - Additional class names.
 * @returns {JSX} - Returns the element.
 */
export function Divider({
  classes,
  className,
  ...props
}) {
  return (
    <div
      className={`${classes.divider} ${className}`}
      {...getNotDeclaredProps(props, Divider)}
    />
  );
}

Divider.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Divider.defaultProps = { className: '' };

Divider.styles = ({ divider: theme }) => {
  return {
    divider: {
      composes: 'divider',
      height: theme.height,
      backgroundColor: theme.backgroundColor,
    },
  };
};

export default injectSheet(Divider.styles)(Divider);
