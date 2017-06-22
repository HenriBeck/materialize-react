import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import omit from 'lodash.omit';

import connectWithTheme from '../../styles/theme/connect-with-theme';

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
      {...omit(props, 'theme', 'sheet')}
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

const styles = {
  root: {
    composes: 'background',
    color: props => props.theme.color,
    backgroundColor: props => props.theme.backgroundColor,
  },
};

export default connectWithTheme(injectSheet(styles)(Background), 'background');
