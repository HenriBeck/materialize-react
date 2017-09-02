import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Button from '../../button/index';
import Icon from '../../icon/index';

/**
 * A utility component which renders a header with a back and forward button.
 *
 * @class
 */
class HeaderWithButtons extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      header: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentSection: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    back: PropTypes.func.isRequired,
    forward: PropTypes.func.isRequired,
    disableBackButton: PropTypes.func,
    disableNextButton: PropTypes.func,
    nextButton: PropTypes.node,
    backButton: PropTypes.node,
  };

  static defaultProps = {
    disableBackButton: () => false,
    disableNextButton: () => false,

    nextButton: (
      <Button>
        Next
        <Icon
          icon="chevron-right"
          style={{ color: 'inherit' }}
        />
      </Button>
    ),
    backButton: (
      <Button>
        <Icon
          icon="chevron-left"
          style={{ color: 'inherit' }}
        />
        Back
      </Button>
    ),
  };

  static styles = {
    header: {
      composes: 'stepper--header',
      display: 'flex',
      width: '100%',
      height: 64,
      alignItems: 'center',
      boxSizing: 'border-box',
      padding: '8px 16px',
    },

    content: {
      composes: 'stepper--header-content',
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 24px',
    },
  };

  /**
   * Calculate whether or not the back button should be disabled.
   *
   * @returns {Boolean} - Returns whether or not the back button should be disabled.
   */
  calculateDisabledForBackButton() {
    const { currentSection } = this.props;

    if (currentSection === 0) {
      return true;
    }

    return this.props.disableBackButton(currentSection, this.props.sections[currentSection]);
  }

  /**
   * Calculate whether or not the next button should be disabled.
   *
   * @returns {Boolean} - Returns whether or not the next button should be disabled.
   */
  calculateDisabledForNextButton() {
    const {
      currentSection,
      sections,
    } = this.props;

    if (currentSection === sections.length - 1) {
      return true;
    }

    return this.props.disableNextButton(currentSection, sections[currentSection]);
  }

  handleBackButtonPress = () => this.props.back();

  handleNextButtonPress = () => this.props.forward();

  render() {
    const {
      classes,
      nextButton,
      backButton,
      children,
    } = this.props;
    const disableBackButton = this.calculateDisabledForBackButton();
    const disableNextButton = this.calculateDisabledForNextButton();

    return (
      <header className={classes.header}>
        {backButton ? (
          React.cloneElement(backButton, {
            disabled: disableBackButton,
            onPress: this.handleBackButtonPress,
            className: `stepper--header-back-button ${backButton.props.className || ''}`,
          })
        ) : null}

        <div className={classes.content}>
          {children}
        </div>

        {nextButton ? (
          React.cloneElement(nextButton, {
            disabled: disableNextButton,
            onPress: this.handleNextButtonPress,
            className: `stepper--header-next-button ${nextButton.props.className || ''}`,
          })
        ) : null}
      </header>
    );
  }
}

export default injectSheet(HeaderWithButtons.styles)(HeaderWithButtons);
