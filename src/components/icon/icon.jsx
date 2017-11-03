import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A function to render a material design icon.
 * You will need to import the material design icons stylesheet.
 *
 * @param {Object} props - The props for the component.
 * @param {String} props.icon - The icon name.
 * @param {String} props.className - An additional className that will be added to the icon.
 * @param {String} props.classes - The classes provided by jss.
 * @param {Boolean} props.disabled - If the icon is disabled. It will have a darker color then.
 * @returns {JSX} - Returns the element.
 */
function Icon({
  icon,
  className,
  classes,
  disabled,
  ...props
}) {
  return (
    <i
      {...getNotDeclaredProps(props, Icon)}
      className={`${classes.icon} mdi-${icon} ${className}`}
      aria-disabled={disabled}
    />
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  classes: PropTypes.shape({ icon: PropTypes.string.isRequired }).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
  disabled: false,
};

Icon.styles = (theme) => {
  return {
    icon: {
      composes: 'mdi mdi-24px icon',
      color: theme.iconColor,
      lineHeight: 1,

      '&[aria-disabled=true]': { color: theme.disabledColor },
    },
  };
};

export default injectSheet(Icon.styles)(Icon);
