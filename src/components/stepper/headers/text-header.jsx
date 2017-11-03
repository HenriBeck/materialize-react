import React from 'react';
import PropTypes from 'prop-types';

import HeaderWithButtons from './header-with-buttons';

/**
 * A header for the stepper component which renders some computed text.
 *
 * @param {Object} props - The props for the component.
 * @param {Function} props.generateText - A function to generate the text.
 * The function will be called with the current step and the max steps.
 * @returns {JSX} - Returns the JSX.
 */
function TextHeader({
  generateText,
  ...props
}) {
  return (
    <HeaderWithButtons {...props}>
      <span>
        {generateText(props.currentSection + 1, props.totalSections)}
      </span>
    </HeaderWithButtons>
  );
}

TextHeader.defaultProps = {
  generateText(currentStep, maxSteps) {
    return `Step ${currentStep} of ${maxSteps}`;
  },
};

TextHeader.propTypes = {
  totalSections: PropTypes.number.isRequired,
  currentSection: PropTypes.number.isRequired,
  generateText: PropTypes.func,
};

export default TextHeader;
