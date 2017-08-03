import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import EventHandler from '../event-handler';
import Label from '../label';

/**
 * A function to render a group of radio buttons.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
export function RadioButtonContainer(props) {
  const {
    onFocus,
    onBlur,
    children,
    label,
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
      className={`${className} ${classes.radioButtonGroup}`}
      tabIndex="0"
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
    >
      <Label
        className={classes.label}
        htmlFor={id}
      >
        {label}
      </Label>

      {children}
    </EventHandler>
  );
}

RadioButtonContainer.propTypes = {
  classes: PropTypes.shape({
    radioButtonGroup: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

RadioButtonContainer.defaultProps = { className: '' };

RadioButtonContainer.styles = {
  radioButtonGroup: {
    composes: 'radio-button-group',
    display: 'inline-flex',
    flexDirection: 'column',

    '&:focus': { outline: 0 },
  },

  label: {
    composes: 'radio-button-group--label',
    padding: '4px 8px',
  },
};

export default injectSheet(RadioButtonContainer.styles)(RadioButtonContainer);
