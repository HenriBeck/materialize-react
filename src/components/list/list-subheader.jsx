import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { body1 } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * Render a subheader for a list.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes for the component provided by Jss.
 * @param {JSX} props.children - The content for the subheader.
 * @param {Boolean} props.inset - Whether or not the subheader should have an inset.
 * This will not be added by the list component
 * because subheaders do not always need to have an inset.
 * @param {String} props.className - An additional class name for the subheader.
 * @returns {JSX} - Returns the JSX.
 */
function Subheader({
  classes,
  children,
  inset,
  className,
  ...props
}) {
  return (
    <li
      className={`${classes.subheader} ${inset ? classes.inset : ''} ${className}`}
      {...getNotDeclaredProps(props, Subheader)}
    >
      {children}
    </li>
  );
}

Subheader.propTypes = {
  classes: PropTypes.shape({ subheader: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  inset: PropTypes.bool,
  className: PropTypes.string,
};

Subheader.defaultProps = {
  inset: false,
  className: '',
};

Subheader.styles = (theme) => {
  return {
    subheader: {
      composes: 'list--subheader',
      ...body1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
      color: theme.secondaryTextColor,
      lineHeight: '16px',
    },

    inset: {
      composes: 'list--subheader-inset',
      paddingLeft: 72,
    },
  };
};

export default injectSheet(Subheader.styles)(Subheader);
