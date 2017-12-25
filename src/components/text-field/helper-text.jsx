import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { body1 } from '../../styles/typography';

/**
 * The helper text for the textfield and the textarea component.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function HelperText(props) {
  return (
    <span
      className={classnames(
        props.classes.helperText,
        { [props.classes.withError]: props.error.length > 0 },
      )}
    >
      {props.error.length > 0 ? props.error : props.helperText}
    </span>
  );
}

HelperText.propTypes = {
  classes: PropTypes.shape({
    helperText: PropTypes.string.isRequired,
    withError: PropTypes.string.isRequired,
  }).isRequired,
  helperText: PropTypes.string,
  error: PropTypes.string,
};

HelperText.defaultProps = {
  helperText: '',
  error: '',
};

HelperText.styles = (theme) => {
  return {
    helperText: {
      ...body1,
      fontSize: 12,
      lineHeight: 1,
      height: 12,
      color: theme.secondaryTextColor,
    },

    withError: { color: theme.errorColor },
  };
};

export default injectSheet(HelperText.styles)(HelperText);
