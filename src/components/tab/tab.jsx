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
 * @param {String} props.name - The name for the tab.
 * @param {Object} props.classes - Classes for the component. Provided by Jss.
 * @param {JSX} props.children - The text for the tab.
 * @param {Boolean} props.focused - Whether or not the tab is in the focused state.
 * @param {Boolean} props.selected - Whether or not the tab is selected.
 * @param {String} props.className - Additional className to be applied to the root.
 * @param {String} props.tabStyle - The style of the tab. Provided by the TabsContainer.
 * @param {Function} props.createRef - A function which will create a reference
 * to the root component. Used by the TabsContainer.
 * @param {Function} props.onPress - A handler when the tab gets pressed to change the state.
 * @param {Boolean} props.noink - Whether or not the tab has no ripple effect.
 * @param {String} props.icon - An icon that will be render when the tabStyle has an icon.
 * @returns {JSX} - Returns the component.
 */
function Tab({
  selected,
  className,
  classes,
  focused,
  tabStyle,
  createRef,
  onPress,
  name,
  noink,
  children,
  icon,
  ...props
}) {
  const classNames = classnames(
    className,
    classes.tab,
    focused && 'tab--focused',
    `tab--${tabStyle}`,
  );

  return (
    <EventHandler
      {...getNotDeclaredProps(props, Tab)}
      component="div"
      role="tab"
      data-name={name}
      aria-selected={selected}
      createRef={createRef}
      className={classNames}
      onPress={onPress}
    >
      {tabStyle.includes('icons') && (
        <Icon
          icon={icon}
          className={classes.icon}
        />
      )}

      {tabStyle.includes('text') && (
        <span className={classes.tabContent}>
          {children}
        </span>
      )}

      {!noink && (<Ripple className={classes.ripple} />)}
    </EventHandler>
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
