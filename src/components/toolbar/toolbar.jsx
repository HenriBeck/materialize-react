import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';
import breakpoints from '../../styles/breakpoints';

/**
 * A component which renders an AppBar.
 *
 * @param {Object}  props - The props for the component.
 * @param {Object} props.classes - Class names provided by Jss.
 * @param {JSX} props.children - The children to render inside.
 * @param {String} props.height - The height of the toolbar. Either normal, medium-tall or tall.
 * @param {String} props.className - Additional className for the root component.
 * @param {Boolean} props.noShadow - Whether or not the AppBar should have no shadow.
 * @returns {JSX} - Returns the jsx for the component.
 */
function Toolbar({
  classes,
  children,
  height,
  className,
  noShadow,
  ...props
}) {
  return (
    <div
      {...getNotDeclaredProps(props, Toolbar)}
      className={`${classes.toolbar} toolbar--${height} ${className}`}
    >
      {children}

      {!noShadow && <span className={classes.shadow} />}
    </div>
  );
}

Toolbar.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string.isRequired,
    shadow: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  height: PropTypes.oneOf([
    'normal',
    'medium-tall',
    'tall',
  ]),
  noShadow: PropTypes.bool,
};

Toolbar.defaultProps = {
  className: '',
  height: 'normal',
  noShadow: false,
};

Toolbar.styles = (theme) => {
  return {
    toolbar: {
      composes: 'toolbar',
      position: 'relative',
      width: '100%',
      padding: '0 16px',
      boxSizing: 'border-box',
      display: 'flex',
      backgroundColor: theme.appBarColor,

      height: 56,

      '& > .row': {
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },

      '&.toolbar--medium-tall': {
        height: 56 * 2,
        flexDirection: 'column',
      },

      '&.toolbar--tall': {
        height: 56 * 3,
        flexDirection: 'column',
      },

      [breakpoints.up('tablet')]: {
        height: 64,

        '& > .row': { height: 64 },

        '&.toolbar--medium-tall': { height: 64 * 2 },

        '&.toolbar--tall': { height: 64 * 3 },
      },
    },

    shadow: {
      composes: 'toolbar--shadow',
      position: 'absolute',
      bottom: -6,
      left: 0,
      right: 0,
      height: 6,
      boxShadow: 'inset 0 5px 6px -3px rgba(0, 0, 0, 0.4)',
    },
  };
};

export default injectSheet(Toolbar.styles)(Toolbar);
