import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';

import StepperSection from './stepper-section';
import Headers from './headers';
import StepperContainer from './stepper-container';

/**
 * A component which renders a material design stepper.
 *
 * @class
 */
export default class Stepper extends PureComponent {
  static propTypes = {
    children({ children }) { // eslint-disable-line react/require-default-props
      const childrenArray = Children.toArray(children);
      const hasNotSectionChild = childrenArray.some(child => child.type !== StepperSection);

      if (hasNotSectionChild) {
        return new Error('The Stepper component only accepts StepperSection as children!');
      }

      if (childrenArray.length < 2) {
        return new Error('The Stepper is required to have at least 2 children');
      }

      return null;
    },
    header: PropTypes.element.isRequired,
    onChange: PropTypes.func,
    initialSection: PropTypes.number,
    className: PropTypes.string,
    headerAtBottom: PropTypes.bool,
  };

  static defaultProps = {
    initialSection: 0,
    className: '',
    headerAtBottom: false,
    onChange: () => {},
  };

  static Section = StepperSection;
  static Headers = Headers;

  state = { currentSection: this.props.initialSection };

  /**
   * Call the onChange prop when the currentSection state has changed.
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentSection !== this.state.currentSection) {
      this.props.onChange(this.state.currentSection);
    }
  }

  /**
   * Change the current section.
   *
   * @param {Number} currentSection - The index of the current section.
   */
  set currentSection(currentSection) {
    this.setState({ currentSection });
  }

  /**
   * Get the current section.
   *
   * @returns {Number} - Returns the index of the current section.
   */
  get currentSection() {
    return this.state.currentSection;
  }

  /**
   * Move one step back.
   */
  back = () => {
    this.setState(({ currentSection }) => {
      if (currentSection === 0) {
        return null;
      }

      return { currentSection: currentSection - 1 };
    });
  };

  /**
   * Move one step forward.
   */
  forward = () => {
    this.setState(({ currentSection }) => {
      if (currentSection === Children.count(this.props.children) - 1) {
        return null;
      }

      return { currentSection: currentSection + 1 };
    });
  };

  /**
   * Render the passed header with some additional attributes.
   *
   * @param {JSX} header - The header element to clone.
   * @returns {JSX} - Returns the cloned header.
   */
  renderHeader(header) {
    return React.cloneElement(header, {
      sections: Children.map(this.props.children, child => child.props),
      currentSection: this.state.currentSection,
      back: this.back,
      forward: this.forward,
    });
  }

  render() {
    const {
      children,
      header,
      className,
      headerAtBottom,
      ...props
    } = this.props;

    return (
      <StepperContainer
        header={this.renderHeader(header)}
        currentSection={this.state.currentSection}
        className={className}
        headerAtBottom={headerAtBottom}
        {...getNotDeclaredProps(props, Stepper)}
      >
        {children}
      </StepperContainer>
    );
  }
}
