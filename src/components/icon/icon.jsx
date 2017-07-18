import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import connectWithTheme from '../../styles/theme/connect-with-theme';
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
export function Icon({
  icon,
  className,
  classes,
  disabled,
  ...props
}) {
  return (
    <i
      className={`mdi-${icon} ${className} ${classes.icon} ${disabled && 'icon--disabled'}`}
      {...getNotDeclaredProps(props, Icon)}
    />
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
  disabled: false,
};

const styles = {
  icon: {
    composes: 'icon mdi mdi-24px',
    color: props => props.theme.color,
    lineHeight: 24,

    '&.icon--disabled': { color: props => props.theme.disabledColor },
  },
};

export default connectWithTheme(injectSheet(styles)(Icon), 'icon');
