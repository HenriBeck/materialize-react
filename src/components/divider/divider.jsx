import React from 'react';
import PropTypes from 'prop-types';

import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';

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
      {...getNotDeclaredProps({ props }, Divider)}
    />
  );
}

Divider.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Divider.defaultProps = { className: '' };

const styles = {
  divider: {
    composes: 'divider',
    height: props => props.theme.height,
    backgroundColor: props => props.theme.backgroundColor,
  },
};

export default connectWithTheme(injectSheet(styles)(Divider), 'divider');
