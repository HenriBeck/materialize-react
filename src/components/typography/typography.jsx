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
 * @param {Object} props.classes - Classes provided by Jss.
 * @param {String} props.typography - The typography.
 * @param {String} props.element - The element to render.
 * @param {JSX} props.children - The content to render inside.
 * @param {String} props.className - An additional className for the rendered root component.
 * @param {Boolean} props.secondary - Whether or not the secondary text color should be applied.
 * @returns {JSX} - Returns the JSX.
 */
export function Typography({
  classes,
  typography,
  element: Element,
  children,
  className,
  secondary,
  ...props
}) {
  const classNames = classnames(
    classes.typography,
    classes[typography],
    secondary && classes.secondaryColor,
    className,
  );

  return (
    <Element
      className={classNames}
      {...getNotDeclaredProps(props, Typography)}
    >
      {children}
    </Element>
  );
}

Typography.propTypes = {
  classes: PropTypes.shape({
    typography: PropTypes.string.isRequired,
    secondaryColor: PropTypes.string.isRequired,
  }).isRequired,
  typography: PropTypes.oneOf(Object.keys(typos)).isRequired,
  children: PropTypes.node.isRequired,
  element: PropTypes.string,
  className: PropTypes.string,
  secondary: PropTypes.bool,
};

Typography.defaultProps = {
  element: 'span',
  className: '',
  secondary: false,
};

Typography.styles = ({ typography: theme }) => {
  return {
    typography: {
      composes: 'typography',
      color: theme.color,
    },

    secondaryColor: {
      composes: 'typography--secondary',
      color: theme.secondaryColor,
    },

    ...typos,
  };
};

export default injectSheet(Typography.styles)(Typography);
