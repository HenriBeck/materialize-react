import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import EventHandler from '../event-handler';
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
export function Tab(props) {
  const className = classnames(
    props.className,
    props.classes.tab,
    props.focused && 'tab--focused',
    `tab--${props.tabStyle}`,
  );

  return (
    <EventHandler
      {...getNotDeclaredProps(props, Tab, 'name')}
      component="div"
      role="tab"
      aria-selected={props.selected}
      createRef={props.createRef}
      className={className}
      onPress={props.onPress}
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

      {!props.noink && (
        <Ripple
          color={props.theme.rippleColor}
          className="tab--ripple"
        />
      )}
    </EventHandler>
  );
}

Tab.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
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

Tab.styles = ({ tab: theme }) => {
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
        opacity: theme.focusedOpacity,
      },

      '&.tab--focused $icon': { opacity: theme.focusedOpacity },

      '&[aria-selected=true] $tabContent': { opacity: theme.selectedOpacity },

      '&[aria-selected=true] $icon': { opacity: theme.selectedOpacity },
    },

    tabContent: {
      composes: 'tab--content',
      ...body1,
      transition: 'opacity 0.1s cubic-bezier(0.4, 0.0, 1, 1)',
      textTransform: 'uppercase',
      textAlign: 'center',
      lineHeight: 1,
      padding: '0 0 20px 0',
      opacity: theme.unselectedOpacity,
    },

    icon: {
      composes: 'tab--icon',
      padding: '0 0 12px 0',
      height: 24,
      width: 24,
      fontSize: 24,
      opacity: theme.unselectedOpacity,
    },
  };
};

export default injectSheet(Tab.styles)(Tab);
