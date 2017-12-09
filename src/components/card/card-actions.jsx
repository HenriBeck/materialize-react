import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which renders actions for a material design card.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes object provided by Jss.
 * @param {JSX} props.children - The content for the card.
 * @param {Boolean} props.stacked - Whether or not the actions should be stacked.
 * @param {String} props.className - Additional className for the card.
 * @returns {JSX} - Returns the JSX.
 */
function CardActions(props) {
  return (
    <div
      className={classnames(
        props.classes.actions,
        { [props.classes.actionsStacked]: props.stacked },
        props.className,
      )}
      {...getNotDeclaredProps(props, CardActions)}
    >
      {props.children}
    </div>
  );
}

CardActions.propTypes = {
  classes: PropTypes.shape({
    actions: PropTypes.string.isRequired,
    actionsStacked: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  stacked: PropTypes.bool,
  className: PropTypes.string,
};

CardActions.defaultProps = {
  stacked: false,
  className: '',
};

CardActions.styles = {
  actions: {
    composes: 'card--actions',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',

    '& > *': { margin: '0 8px' },

    '& > .spacer': { flex: 1 },
  },

  actionsStacked: {
    composes: 'card--actions-stacked',
    flexDirection: 'column',
    alignItems: 'flex-start',

    '& > *': { marginBottom: 4 },

    '& > *:last-child': { marginBottom: 0 },
  },
};

export default injectSheet(CardActions.styles)(CardActions);
