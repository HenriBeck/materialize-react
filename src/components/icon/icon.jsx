import React from 'react';
import PropTypes from 'prop-types';

import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';

function Icon({
  icon,
  className,
  classes,
  ...props
}) {
  return (
    <i
      className={`mdi-${icon} ${className} ${classes.icon}`}
      {...getNotDeclaredProps({ props }, Icon)}
    />
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = { className: '' };

const styles = {
  icon: {
    composes: 'icon mdi mdi-24px',
    color: props => (props.disabled ? props.theme.disabledColor : props.theme.color),
    lineHeight: 24,
  },
};

export default connectWithTheme(injectSheet(styles)(Icon), 'icon');
