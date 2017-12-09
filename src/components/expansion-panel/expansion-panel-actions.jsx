import React from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';
import { cloneChildrenWithClassName } from '../../utils/react';

/**
 * Render a set of actions for the ExpansionPanel content.
 *
 * @param {Object} props - The props for the component.
 * @returns {Object} - Returns the JSX.
 */
function ExpansionPanelActions(props) {
  return (
    <div
      className={classnames(
        props.classes.expansionPanelActions,
        props.className,
      )}
      {...getNotDeclaredProps(props, ExpansionPanelActions)}
    >
      {cloneChildrenWithClassName(props.children, { className: props.classes.action })}
    </div>
  );
}

ExpansionPanelActions.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    expansionPanelActions: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

ExpansionPanelActions.defaultProps = { className: '' };

ExpansionPanelActions.styles = {
  expansionPanelActions: {
    composes: 'expansion-panel--actions',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '16px 8px',
  },

  action: { marginLeft: 8 },
};

export default injectSheet(ExpansionPanelActions.styles)(ExpansionPanelActions);
