import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import breakpoints from '../../styles/breakpoints';
import getNotDeclaredProps from '../../get-not-declared-props';

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
  ...props
}) {
  return (
    <div
      className={`${classes.section} ${className}`}
      {...getNotDeclaredProps(props, StepperSection)}
    >
      {children}
    </div>
  );
}

StepperSection.propTypes = {
  classes: PropTypes.shape({ section: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  className: PropTypes.string,
};

StepperSection.defaultProps = { className: '' };

StepperSection.styles = ({ stepper: theme }) => {
  return {
    section: {
      composes: 'stepper--section',
      minWidth: '100%',
      boxSizing: 'border-box',
      flex: 1,

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
