import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

// eslint-disable-next-line import/no-namespace
import * as typos from '../../styles/typography';
import getNotDeclaredProps from '../../get-not-declared-props';

/**
 * A component to render a set of text with the specified typography.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Typography(props) {
  const Element = props.element;

  return (
    <Element
      className={classnames(
        props.classes.typography,
        props.classes[props.typography],
        {
          [props.classes.secondary]: props.secondary,
          [props.classes.primary]: props.primary,
          [props.classes.accent]: props.accent,
        },
        props.className,
      )}
      {...getNotDeclaredProps(props, Typography)}
    >
      {props.children}
    </Element>
  );
}

Typography.propTypes = {
  classes: PropTypes.shape({
    typography: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    accent: PropTypes.string.isRequired,
  }).isRequired,
  typography: PropTypes.oneOf(Object.keys(typos)).isRequired,
  children: PropTypes.node.isRequired,
  element: PropTypes.string,
  className: PropTypes.string,
  secondary: PropTypes.bool,
  primary: PropTypes.bool,
  accent: PropTypes.bool,
};

Typography.defaultProps = {
  element: 'span',
  className: '',
  secondary: false,
  primary: false,
  accent: false,
};

Typography.styles = (theme) => {
  return {
    typography: {
      composes: 'typography',
      color: theme.textColor,
    },

    secondary: {
      composes: 'typography--secondary',
      color: theme.secondaryTextColor,
    },

    primary: {
      composes: 'typography--primary',
      color: theme.primaryBase,
    },

    accent: {
      composes: 'typography--accent',
      color: theme.accent,
    },

    ...typos,
  };
};

export default injectSheet(Typography.styles)(Typography);
