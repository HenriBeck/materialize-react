import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import omit from 'lodash.omit';

import HeaderWithButtons from './header-with-buttons';

/**
 * A header for the stepper which renders a dot for each section.
 *
 * @class
 */
class DotHeader extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      dot: PropTypes.string.isRequired,
      activeDot: PropTypes.string.isRequired,
    }).isRequired,
    totalSections: PropTypes.number.isRequired,
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
   * @returns {JSX[]} - Returns the JSX for the dots.
   */
  renderDots() {
    return new Array(this.props.totalSections)
      .fill(1)
      .map((section, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={classnames(
            this.props.classes.dot,
            { [this.props.classes.activeDot]: this.props.currentSection === index },
          )}
        />
      ));
  }

  render() {
    return (
      <HeaderWithButtons {...omit(this.props, 'classes')}>
        {this.renderDots()}
      </HeaderWithButtons>
    );
  }
}

export default injectSheet(DotHeader.styles)(DotHeader);
