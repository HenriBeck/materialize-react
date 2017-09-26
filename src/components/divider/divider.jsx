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
 * @param {Boolean} props.vertical - Whether or not the divider should be vertical.
 * @returns {JSX} - Returns the element.
 */
export function Divider({
  classes,
  className,
  vertical,
  ...props
}) {
  return (
    <div
      {...getNotDeclaredProps(props, Divider)}
      className={`${classes.divider} ${vertical && classes.vertical}${className}`}
    />
  );
}

Divider.propTypes = {
  classes: PropTypes.shape({ divider: PropTypes.string.isRequired }).isRequired,
  className: PropTypes.string,
  vertical: PropTypes.bool,
};

Divider.defaultProps = {
  className: '',
  vertical: false,
};

Divider.styles = ({ divider: theme }) => {
  return {
    divider: {
      composes: 'divider',
      height: theme.height,
      width: '100%',
      backgroundColor: theme.backgroundColor,
    },

    vertical: {
      composes: 'divider--vertical',
      height: '100%',
      width: theme.height,
    },
  };
};

export default injectSheet(Divider.styles)(Divider);
