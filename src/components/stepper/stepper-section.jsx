import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import breakpoints from '../../styles/breakpoints';

/**
 * A section for a stepper component.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes for the component. Provided by Jss.
 * @param {JSX} props.children - The content for the section.
 * @param {String} props.className - An additional class name for the section.
 * @returns {JSX} - Returns the JSX.
 */
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
      composes: 'stepper--section',
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
