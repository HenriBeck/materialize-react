import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

export function StepperSection({
  classes,
  children,
  className,
}) {
  return (
    <div className={`${classes.section} ${className}`}>
      {children}
    </div>
  );
}

StepperSection.propTypes = {
  classes: PropTypes.shape({ section: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

StepperSection.defaultProps = { className: '' };

StepperSection.styles = {
  section: {
    minWidth: '100%',
    minHeight: '100%',
  },
};

export default injectSheet(StepperSection.styles)(StepperSection);
