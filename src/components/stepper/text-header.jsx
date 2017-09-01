import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Typography from '../typography';

import HeaderWithButtons from './header-with-buttons';

export default class TextHeader extends PureComponent {
  static propTypes = {
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentSection: PropTypes.number.isRequired,
    generateText: PropTypes.func,
  };

  static defaultProps = {
    generateText(currentStep, maxSteps) {
      return `Step ${currentStep} of ${maxSteps}`;
    },
  };

  render() {
    const {
      generateText,
      ...props
    } = this.props;

    return (
      <HeaderWithButtons {...props}>
        <Typography typography="body1">
          {generateText(this.props.currentSection + 1, this.props.sections.length)}
        </Typography>
      </HeaderWithButtons>
    );
  }
}
