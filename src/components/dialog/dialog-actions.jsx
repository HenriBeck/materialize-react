import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which adds the appropriate styles for a button row inside a dialog.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function DialogActions(props) {
  return (
    <div
      className={`${props.classes.actions} ${props.className}`}
      {...getNotDeclaredProps(props, DialogActions)}
    >
      {props.children}
    </div>
  );
}

DialogActions.propTypes = {
  classes: PropTypes.shape({ actions: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DialogActions.defaultProps = { className: '' };

DialogActions.styles = {
  actions: {
    composes: 'dialog--buttons',
    padding: 8,
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};

export default injectSheet(DialogActions.styles)(DialogActions);
