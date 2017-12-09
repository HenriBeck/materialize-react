import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

/**
 * Render the actual content for the ExpansionPanel.
 *
 * @param {Object} props - The props for the component.
 * @returns {Object} - Returns the JSX.
 */
function ExpansionPanelDetails(props) {
  return (
    <div
      className={classNames(
        props.classes.expansionPanelDetails,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

ExpansionPanelDetails.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({ expansionPanelDetails: PropTypes.string.isRequire }).isRequired,
  className: PropTypes.string,
};

ExpansionPanelDetails.defaultProps = { className: '' };

ExpansionPanelDetails.styles = {
  expansionPanelDetails: {
    composes: 'expansion-panel--details',
    display: 'flex',
    flexGrow: 1,
    padding: '8px 24px 24px',
  },
};

export default injectSheet(ExpansionPanelDetails.styles)(ExpansionPanelDetails);
