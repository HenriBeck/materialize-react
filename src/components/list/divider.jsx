import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Divider from '../divider';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component which renders a divider for a list.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.classes - Classes for the component provided by Jss.
 * @param {Boolean} props.inset - Whether or not the divider should be inset.
 * Will be applied by the list component.
 * @param {String} props.className - An additional for the divider.
 * @returns {JSX} - Returns the JSX.
 */
export function ListDivider({
  classes,
  inset,
  className,
  ...props
}) {
  return (
    <li
      className={`list--divider ${inset && classes.inset} ${className}`}
      {...getNotDeclaredProps(props, ListDivider)}
    >
      <Divider className={classes.divider} />
    </li>
  );
}

ListDivider.propTypes = {
  classes: PropTypes.shape({
    inset: PropTypes.string.isRequired,
    divider: PropTypes.string.isRequired,
  }).isRequired,
  inset: PropTypes.bool,
  className: PropTypes.string,
};

ListDivider.defaultProps = {
  inset: false,
  className: '',
};

ListDivider.styles = {
  inset: {
    composes: 'list--divider-inset',
    paddingLeft: 72,
  },

  divider: {
    composes: 'list--divider-divider',
    width: '100%',
  },
};

export default injectSheet(ListDivider.styles)(ListDivider);
