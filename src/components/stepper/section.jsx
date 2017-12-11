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
function Section({
  classes,
  children,
  className,
  ...props
}) {
  return (
    <div
      className={`${classes.section} ${className}`}
      {...getNotDeclaredProps(props, Section, ['onShow', 'onHide'])}
    >
      {children}
    </div>
  );
}

Section.propTypes = {
  classes: PropTypes.shape({ section: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Section.defaultProps = { className: '' };

Section.styles = {
  section: {
    composes: 'stepper--section',
    minWidth: '100%',
    boxSizing: 'border-box',
    flex: 1,
    padding: '8px 16px',

    [breakpoints.up('tablet')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
};

export default injectSheet(Section.styles)(Section);
