import React from 'react';
import PropTypes from 'prop-types';

import Progress from '../progress';

import HeaderWithButtons from './header-with-buttons';

/**
 * A header component for a stepper which renders a progress bar inside the header.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
export default function ProgressHeader(props) {
  return (
    <HeaderWithButtons {...props}>
      <Progress progress={props.currentSection / (props.sections.length - 1) * 100} />
    </HeaderWithButtons>
  );
}

ProgressHeader.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSection: PropTypes.number.isRequired,
};
