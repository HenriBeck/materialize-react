import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component that renders a horizontal line.
 *
 * @param {Object} props - Props of the component.
 * @param {Object} props.classes - The classes provided by jss.
 * @param {String} props.className - Additional class names.
 * @param {Boolean} props.vertical - Whether or not the divider should be vertical.
 * @returns {JSX} - Returns the element.
 */
function Divider(props) {
  return (
    <div
      {...getNotDeclaredProps(props, Divider)}
      className={classnames(
        props.classes.divider,
        { [props.classes.vertical]: props.vertical },
        props.className,
      )}
    />
  );
}

Divider.propTypes = {
  classes: PropTypes.shape({
    divider: PropTypes.string.isRequired,
    vertical: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  vertical: PropTypes.bool,
};

Divider.defaultProps = {
  className: '',
  vertical: false,
};

Divider.styles = (theme) => {
  return {
    divider: {
      composes: 'divider',
      height: 1,
      width: '100%',
      backgroundColor: theme.dividerColor,
    },

    vertical: {
      composes: 'divider--vertical',
      height: '100%',
      width: 1,
    },
  };
};

export default injectSheet(Divider.styles)(Divider);
