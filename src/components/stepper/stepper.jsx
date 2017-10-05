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
function Stepper({
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
      {...getNotDeclaredProps(props, Stepper)}
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

Stepper.propTypes = {
  classes: PropTypes.shape({
    stepper: PropTypes.string.isRequired,
    sectionContainer: PropTypes.string.isRequired,
    sectionWrapper: PropTypes.string.isRequired,
  }).isRequired,
  header: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
  currentSection: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  headerAtBottom: PropTypes.bool.isRequired,
};

Stepper.styles = {
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
    flex: 1,
    display: 'flex',
  },

  sectionWrapper: {
    composes: 'stepper--section-wrapper',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    transition: 'transform 200ms',
  },
};

export default injectSheet(Stepper.styles)(Stepper);
