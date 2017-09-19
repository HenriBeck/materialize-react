import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import EventHandler from '../event-handler';

/**
 * A function to render a group of radio buttons.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
export function RadioButtonGroupContainer(props) {
  const {
    onFocus,
    onBlur,
    children,
    className,
    classes,
    onKeyPress,
    id,
    ...otherProps
  } = props;

  return (
    <EventHandler
      {...otherProps}
      component="div"
      id={id}
      className={`${className} ${classes.container}`}
      tabIndex="0"
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
    >
      {children}
    </EventHandler>
  );
}

RadioButtonGroupContainer.propTypes = {
  classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

RadioButtonGroupContainer.defaultProps = { className: '' };

RadioButtonGroupContainer.styles = {
  container: {
    composes: 'radio-button-group',
    display: 'inline-flex',
    flexDirection: 'column',

    '&:focus': { outline: 0 },
  },
};

export default injectSheet(RadioButtonGroupContainer.styles)(RadioButtonGroupContainer);
