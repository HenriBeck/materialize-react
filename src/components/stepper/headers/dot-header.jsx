import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import HeaderWithButtons from './header-with-buttons';

/**
 * A header for the stepper which renders a dot for each section.
 *
 * @class
 */
export class DotHeader extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      dot: PropTypes.string.isRequired,
      activeDot: PropTypes.string.isRequired,
    }).isRequired,
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentSection: PropTypes.number.isRequired,
  };

  /**
   * The styles for the header.
   *
   * @param {Object} theme - The theme for the component.
   * @param {Object} theme.stepper - The actual stepper theme.
   * @returns {Object} - Returns the styles object.
   */
  static styles(theme) {
    return {
      dot: {
        composes: 'stepper--header-dots-dot',
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: theme.disabledColor,
        margin: 4,
        transition: 'background-color 200ms',
      },

      activeDot: {
        composes: 'stepper--header-dots-dot-active',
        backgroundColor: theme.primaryBase,
      },
    };
  }

  /**
   * Render one dot for each of the sections.
   *
   * @param {Object} classes - The classes for the component.
   * @returns {JSX} - Returns the JSX for the dots.
   */
  renderDots(classes) {
    return this.props.sections.map((section, index) => (
      <span
        key={section.name}
        className={`${classes.dot} ${this.props.currentSection === index && classes.activeDot}`}
      />
    ));
  }

  render() {
    const {
      classes,
      ...props
    } = this.props;

    return (
      <HeaderWithButtons {...props}>
        {this.renderDots(classes)}
      </HeaderWithButtons>
    );
  }
}

export default injectSheet(DotHeader.styles)(DotHeader);
