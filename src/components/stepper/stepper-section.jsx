import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import breakpoints from '../../styles/breakpoints';

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

StepperSection.styles = ({ stepper: theme }) => {
  return {
    section: {
      minWidth: '100%',
      minHeight: '100%',
      boxSizing: 'border-box',

      paddingLeft: theme.section.mobilePadding,
      paddingRight: theme.section.mobilePadding,
      paddingTop: 8,
      paddingBottom: 8,

      [breakpoints.up('tablet')]: {
        paddingLeft: theme.section.tabletPadding,
        paddingRight: theme.section.tabletPadding,
      },
    },
  };
};

export default injectSheet(StepperSection.styles)(StepperSection);
