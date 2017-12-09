import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import { title } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which adds the appropriate styles for the header of a dialog.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function DialogHeader(props) {
  return (
    <header
      className={`${props.classes.header} ${props.className}`}
      {...getNotDeclaredProps(props, DialogHeader)}
    >
      {props.children}
    </header>
  );
}

DialogHeader.propTypes = {
  classes: PropTypes.shape({ header: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogHeader.defaultProps = { className: '' };

DialogHeader.styles = {
  header: {
    composes: 'dialog--header',
    ...title,
    padding: 24,
    paddingBottom: 20,
    width: '100%',
    boxSizing: 'border-box',
  },
};

export default injectSheet(DialogHeader.styles)(DialogHeader);
