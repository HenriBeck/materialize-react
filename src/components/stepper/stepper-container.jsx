import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';

import Section from './section';
import Headers from './headers';
import Stepper from './stepper';

/**
 * A component which renders a material design stepper.
 *
 * @class
 */
export default class StepperContainer extends PureComponent {
  static propTypes = {
    children({ children }) { // eslint-disable-line react/require-default-props
      const childrenArray = Children.toArray(children);
      const hasNotSectionChild = childrenArray.some(child => child.type !== Section);

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

  static Section = Section;
  static Headers = Headers;

  state = { currentSection: this.props.initialSection };

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
    }, () => this.props.onChange(this.state.currentSection));
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
    }, () => this.props.onChange(this.state.currentSection));
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
      <Stepper
        header={this.renderHeader(header)}
        currentSection={this.state.currentSection}
        className={className}
        headerAtBottom={headerAtBottom}
        {...getNotDeclaredProps(props, StepperContainer)}
      >
        {children}
      </Stepper>
    );
  }
}
