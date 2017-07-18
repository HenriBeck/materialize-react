import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A function to inherit some global styling like color and backgroundColor.
 *
 * @param {Object} props - Props object.
 * @param {JSX} props.children - The children to render inside.
 * @param {Object} props.classes - The object with the classNames inside.
 * @param {String} [props.className] - Additional className to be added.
 * @returns {JSX} - Returns the JSX.
 */
function Background({
  children,
  classes,
  className,
  ...props
}) {
  return (
    <div
      className={`${classes.root} ${className}`}
      {...getNotDeclaredProps(props, Background)}
    >
      {children}
    </div>
  );
}

Background.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Background.defaultProps = { className: '' };

const styles = ({ background: theme }) => {
  return {
    root: {
      composes: 'background',
      color: theme.color,
      backgroundColor: theme.backgroundColor,
    },
  };
};

export default injectSheet(styles)(Background);
