import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { body1 } from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A function to inherit some global styling like color and backgroundColor.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
export function Background(props) {
  return (
    <div
      {...getNotDeclaredProps(props, Background)}
      className={`${props.classes.background} ${props.className}`}
    >
      {props.children}
    </div>
  );
}

Background.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({ background: PropTypes.string.isRequired }).isRequired,
  className: PropTypes.string,
};

Background.defaultProps = { className: '' };

Background.styles = (theme) => {
  return {
    background: {
      composes: 'background',
      ...body1,
      color: theme.textColor,
      backgroundColor: theme.backgroundColor,

      '& *': { WebkitTapHighlightColor: 'transparent' },
    },
  };
};

export default injectSheet(Background.styles)(Background);
