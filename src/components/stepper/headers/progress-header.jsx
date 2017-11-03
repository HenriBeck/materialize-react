import React from 'react';
import PropTypes from 'prop-types';

import Progress from '../../progress/index';

import HeaderWithButtons from './header-with-buttons';

/**
 * A header component for a stepper which renders a progress bar inside the header.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function ProgressHeader(props) {
  return (
    <HeaderWithButtons {...props}>
      <Progress progress={props.currentSection / (props.totalSections - 1) * 100} />
    </HeaderWithButtons>
  );
}

ProgressHeader.propTypes = {
  totalSections: PropTypes.number.isRequired,
  currentSection: PropTypes.number.isRequired,
};

export default ProgressHeader;
