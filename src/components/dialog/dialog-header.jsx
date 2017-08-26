import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import { title } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which adds the appropriate styles for the header of a dialog.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {String} props.className - Additional className.
 * @param {JSX} props.children - The content for the header.
 * @returns {JSX} - Returns the jsx.
 */
export function DialogHeader({
  classes,
  className,
  children,
  ...props
}) {
  return (
    <header
      className={`${classes.header} ${className}`}
      {...getNotDeclaredProps(props, DialogHeader)}
    >
      {children}
    </header>
  );
}

DialogHeader.propTypes = {
  classes: PropTypes.shape({ header: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogHeader.defaultProps = { className: '' };

DialogHeader.styles = ({ dialog: theme }) => {
  return {
    header: {
      composes: 'dialog--header',
      ...title,
      padding: theme.padding,
      paddingBottom: theme.headerBottomPadding,
      width: '100%',
      boxSizing: 'border-box',
    },
  };
};

export default injectSheet(DialogHeader.styles)(DialogHeader);
