import React from 'react';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import Icon from '../icon';
import Ripple from '../ripple';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * Render the summary which will be shown at all times.
 *
 * @param {Object} props - The props for the component.
 * @returns {Object} - Returns the JSX.
 */
function ExpansionPanelSummary(props) {
  return (
    <div
      className={classnames(
        props.classes.expansionPanelSummary,
        { [props.classes.expanded]: props.expanded },
        props.className,
      )}
      {...getNotDeclaredProps(props, ExpansionPanelSummary)}
    >
      <div
        className={classnames(
          props.classes.content,
          { [props.classes.contentExpanded]: props.expanded },
        )}
      >
        {props.children}
      </div>

      <span
        className={classnames(
          props.classes.expandIcon,
          { [props.classes.expandIconExpanded]: props.expanded },
        )}
      >
        <Ripple
          round
          center
        />

        <Icon icon="chevron-down" />
      </span>
    </div>
  );
}

ExpansionPanelSummary.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    expansionPanelSummary: PropTypes.string.isRequired,
    expanded: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    contentExpanded: PropTypes.string.isRequired,
    expandIcon: PropTypes.string.isRequired,
    expandIconExpanded: PropTypes.string.isRequired,
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

ExpansionPanelSummary.defaultProps = { className: '' };

ExpansionPanelSummary.styles = {
  expansionPanelSummary: {
    composes: 'expansion-panel--summary',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
    transition: 'min-height, background-color 140ms',
    padding: '0 24px',
    position: 'relative',
    cursor: 'pointer',
  },

  expanded: {
    composes: 'expansion-panel--summary-expanded',
    minHeight: 64,
  },

  content: {
    composes: 'expansion-panel--summary-content',
    display: 'flex',
    flexGrow: 1,
    transition: 'margin 140ms',
    margin: '12px 0',

    '& > :last-child': { paddingRight: 12 },
  },

  contentExpanded: { margin: '20px 0' },

  expandIcon: {
    composes: 'expansion-panel--summary-icon',
    margin: 4,
    width: 40,
    height: 40,
    padding: 8,
    boxSizing: 'border-box',
    transform: 'rotate(0deg)',
    transition: 'transform 140ms',
  },

  expandIconExpanded: { transform: 'rotate(180deg)' },
};

export default injectSheet(ExpansionPanelSummary.styles)(ExpansionPanelSummary);
