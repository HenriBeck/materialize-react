import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import Icon from '../icon';
import { body1 } from '../../styles/typography';
import Ripple from '../ripple';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * Renders a tab.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the component.
 */
function Tab(props) {
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <span // eslint-disable-line jsx-a11y/click-events-have-key-events
      {...getNotDeclaredProps(props, Tab)}
      role="tab"
      aria-selected={props.selected}
      ref={props.createRef}
      className={classnames(
        props.classes.tab,
        props.focused && 'tab--focused',
        `tab--${props.tabStyle}`,
        props.className,
      )}
    >
      {props.tabStyle.includes('icons') && (
        <Icon
          icon={props.icon}
          className={props.classes.icon}
        />
      )}

      {props.tabStyle.includes('text') && (
        <span className={props.classes.tabContent}>
          {props.children}
        </span>
      )}

      {!props.noink && (<Ripple className={props.classes.ripple} />)}
    </span>
  );
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    tab: PropTypes.string.isRequired,
    tabContent: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    ripple: PropTypes.string.isRequired,
  }).isRequired,
  tabStyle: PropTypes.string.isRequired,
  createRef: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  focused: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  noink: PropTypes.bool,
};

Tab.defaultProps = {
  children: '',
  icon: '',
  className: '',
  noink: false,
};

Tab.styles = (theme) => {
  return {
    tab: {
      composes: 'tab',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      minWidth: 160,
      maxWidth: 264,
      padding: '0 12px',
      height: 48,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      boxSizing: 'border-box',

      '&.tab--text-and-icons': {
        height: 72,
        padding: '0 16px',
      },

      '&.tab--text-and-icons $tabContent': { padding: '10px 0 16px 0' },

      '&.tab--text-and-icons $icon': { padding: 0 },

      '&.tab--focused $tabContent': {
        fontWeight: 700,
        opacity: 1,
      },

      '&.tab--focused $icon': { opacity: 0.8 },

      '&[aria-selected=true] $tabContent': { opacity: 1 },

      '&[aria-selected=true] $icon': { opacity: 1 },
    },

    tabContent: {
      composes: 'tab--content',
      ...body1,
      transition: 'opacity 0.1s cubic-bezier(0.4, 0.0, 1, 1)',
      textTransform: 'uppercase',
      textAlign: 'center',
      lineHeight: 1,
      padding: '0 0 20px 0',
      opacity: 0.8,
    },

    icon: {
      composes: 'tab--icon',
      padding: '0 0 12px 0',
      height: 24,
      width: 24,
      fontSize: 24,
      opacity: 0.8,
    },

    ripple: {
      composes: 'tab--ripple',
      color: theme.primaryBase,
    },
  };
};

export default injectSheet(Tab.styles)(Tab);
