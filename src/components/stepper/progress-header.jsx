import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Progress from '../progress';

import HeaderWithButtons from './header-with-buttons';

export class ProgressHeader extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ progress: PropTypes.string.isRequired }).isRequired,
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentSection: PropTypes.number.isRequired,
  };

  static styles = { progress: { width: '100%' } };

  render() {
    const {
      classes,
      ...props
    } = this.props;

    return (
      <HeaderWithButtons {...props}>
        <Progress
          progress={this.props.currentSection / (this.props.sections.length - 1) * 100}
          className={classes.progress}
        />
      </HeaderWithButtons>
    );
  }
}

export default injectSheet(ProgressHeader.styles)(ProgressHeader);
