import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * Renders the actual markup for the stepper component.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - The classes for the component.
 * @param {JSX} props.children - The sections for the stepper.
 * @param {JSX} props.header - The header for the stepper.
 * @param {Number} props.currentSection - The current section
 * for calculating the section wrapper transform.
 * @param {String} props.className - An additional class name for the root
 * component.
 * @param {Boolean} props.headerAtBottom - Whether or not the header should
 * be at the bottom.
 * @returns {JSX} - Returns the JSX.
 */
function StepperContainer({
  classes,
  children,
  headerAtBottom,
  header,
  className,
  currentSection,
  ...props
}) {
  const classNames = classnames(
    classes.stepper,
    headerAtBottom && classes.headerAtBottom,
    className,
  );

  return (
    <div
      className={classNames}
      {...getNotDeclaredProps(props, StepperContainer)}
    >
      {header}

      <div className={classes.sectionContainer}>
        <div
          className={classes.sectionWrapper}
          style={{ transform: `translateX(${currentSection * -100}%)` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

StepperContainer.propTypes = {
  classes: PropTypes.shape({
    stepper: PropTypes.string.isRequired,
    sectionContainer: PropTypes.string.isRequired,
    sectionWrapper: PropTypes.string.isRequired,
  }).isRequired,
  header: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
  currentSection: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  headerAtBottom: PropTypes.string.isRequired,
};

StepperContainer.styles = ({ stepper: theme }) => {
  return {
    stepper: {
      composes: 'stepper',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },

    headerAtBottom: {
      composes: 'stepper--header-at-bottom',
      flexDirection: 'column-reverse',
    },

    sectionContainer: {
      composes: 'stepper--section-container',
      position: 'relative',
      overflow: 'hidden',
    },

    sectionWrapper: {
      composes: 'stepper--section-wrapper',
      display: 'flex',
      flexDirection: 'row',
      transition: `transform ${theme.transitionDuration}ms linear`,
    },
  };
};

export default injectSheet(StepperContainer.styles)(StepperContainer);
