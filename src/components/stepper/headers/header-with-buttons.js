import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import noop from 'lodash.noop';

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
    totalSections: PropTypes.number.isRequired,
    currentSection: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    back: PropTypes.func,
    forward: PropTypes.func,
    backButtonProps: PropTypes.shape({}),
    nextButtonProps: PropTypes.shape({}),
    nextButton: PropTypes.node,
    backButton: PropTypes.node,
  };

  static defaultProps = {
    back: noop,
    forward: noop,
    backButtonProps: {},
    nextButtonProps: {},

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
  disableBackButton = () => this.props.currentSection === 0;

  /**
   * Calculate whether or not the next button should be disabled.
   *
   * @returns {Boolean} - Returns whether or not the next button should be disabled.
   */
  disableNextButton = () => this.props.currentSection === this.props.totalSections - 1;

  handleBackButtonPress = () => this.props.back();

  handleNextButtonPress = () => this.props.forward();

  render() {
    const {
      nextButton,
      backButton,
      nextButtonProps,
      backButtonProps,
      children,
    } = this.props;

    return (
      <header className={this.props.classes.header}>
        {backButton ? (
          React.cloneElement(backButton, {
            ...backButtonProps,
            disabled: this.disableBackButton() || backButtonProps.disabled,
            onPress: this.handleBackButtonPress,
            className: `stepper--header-back-button ${backButton.props.className || ''}`,
          })
        ) : null}

        <div className={this.props.classes.content}>
          {children}
        </div>

        {nextButton ? (
          React.cloneElement(nextButton, {
            ...nextButtonProps,
            disabled: this.disableNextButton() || nextButtonProps.disabled,
            onPress: this.handleNextButtonPress,
            className: `stepper--header-next-button ${nextButton.props.className || ''}`,
          })
        ) : null}
      </header>
    );
  }
}

export default injectSheet(HeaderWithButtons.styles)(HeaderWithButtons);
