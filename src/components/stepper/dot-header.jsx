import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import HeaderWithButtons from './header-with-buttons';

export class DotHeader extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      dot: PropTypes.string.isRequired,
      activeDot: PropTypes.string.isRequired,
    }).isRequired,
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentSection: PropTypes.number.isRequired,
  };

  static styles({ stepper: theme }) {
    return {
      dot: {
        width: theme.headers.dots.dotSize,
        height: theme.headers.dots.dotSize,
        borderRadius: '50%',
        backgroundColor: theme.headers.dots.inactiveColor,
        margin: theme.headers.dots.margin,
        transition: 'background-color 250ms linear',
      },

      activeDot: { backgroundColor: theme.headers.dots.activeColor },
    };
  }

  renderDots() {
    const {
      sections,
      classes,
      currentSection,
    } = this.props;

    return sections.map((section, index) => (
      <span
        key={section.name}
        className={`${classes.dot} ${currentSection === index && classes.activeDot}`}
      />
    ));
  }

  render() {
    return (
      <HeaderWithButtons {...this.props}>
        {this.renderDots()}
      </HeaderWithButtons>
    );
  }
}

export default injectSheet(DotHeader.styles)(DotHeader);
