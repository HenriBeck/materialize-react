import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A utility component to create a flex-box layout.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Layout(props) {
  const className = classnames(
    props.classes.layout,
    {
      [props.classes.layoutInline]: props.inline,
      [props.classes.layoutReverse]: props.reverse,
    },
    props.className,
  );
  const Component = props.component;

  return (
    <Component
      className={className}
      {...getNotDeclaredProps(props, Layout)}
    >
      {props.children}
    </Component>
  );
}

Layout.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  classes: PropTypes.shape({
    layout: PropTypes.string.isRequired,
    layoutInline: PropTypes.string.isRequired,
    layoutReverse: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  direction: PropTypes.oneOf([
    'row',
    'column',
  ]),
  reverse: PropTypes.bool,
  inline: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  mainAlign: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'initial',
    'inherit',
  ]),
  // eslint-disable-next-line react/no-unused-prop-types
  crossAlign: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'baseline',
    'stretch',
    'initial',
    'inherit',
  ]),
};

Layout.defaultProps = {
  component: 'div',
  className: '',
  direction: 'row',
  reverse: false,
  inline: false,
  mainAlign: 'flex-start',
  crossAlign: 'stretch',
};

Layout.styles = {
  layout: {
    composes: 'layout',
    display: 'flex',
    flexDirection: props => props.direction,
    justifyContent: props => props.mainAlign,
    alignItems: props => props.crossAlign,
  },

  layoutInline: {
    composes: 'layout--inline',
    display: 'inline-flex',
  },

  layoutReverse: {
    composes: 'layout--reverse',
    flexDirection: props => `${props.direction}-reverse`,
  },
};

export default injectSheet(Layout.styles)(Layout);
