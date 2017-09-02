import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

import StepperSection from './stepper-section';
import TextHeader from './text-header';
import DotHeader from './dot-header';
import ProgressHeader from './progress-header';

/**
 * A component which renders a material design stepper.
 *
 * @class
 */
export class Stepper extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      sectionContainer: PropTypes.string.isRequired,
      sectionWrapper: PropTypes.string.isRequired,
    }).isRequired,
    children({ children }) { // eslint-disable-line react/require-default-props
      const childrenArray = Children.toArray(children);

      if (children.length < 2) {
        return new Error('The Stepper is required to have at least 2 children');
      }

      const hasNotSectionChild = childrenArray.some(child => child.type !== StepperSection);

      if (hasNotSectionChild) {
        return new Error('The Stepper component only accepts StepperSection as children!');
      }

      return null;
    },
    header: PropTypes.element.isRequired,
    initialSection: PropTypes.number,
  };

  static defaultProps = { initialSection: 0 };

  static Section = StepperSection;

  static Headers = {
    Text: TextHeader,
    Dot: DotHeader,
    Progress: ProgressHeader,
  };

  /**
   * The styles for the stepper.
   *
   * @param {Object} theme - The theme for the component.
   * @param {Object} theme.stepper - The actual stepper theme.
   * @returns {Object} - Returns the styles object.
   */
  static styles({ stepper: theme }) {
    return {
      root: {
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      },

      sectionContainer: {
        position: 'relative',
        overflow: 'hidden',
      },

      sectionWrapper: {
        display: 'flex',
        flexDirection: 'row',
        transition: `transform ${theme.transitionDuration}ms linear`,
      },
    };
  }

  state = { currentSection: this.props.initialSection };

  childrenCount = Children.count(this.props.children);

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
      if (currentSection === this.childrenCount - 1) {
        return null;
      }

      return { currentSection: currentSection + 1 };
    });
  };

  /**
   * Calculate how much the container should be translated to show the correct stepper sectiond.
   *
   * @returns {Object} - Returns the styles object.
   */
  computeContainerStyles() {
    return { transform: `translateX(${this.state.currentSection * -100}%)` };
  }

  /**
   * Render the passed header with some additional attributes.
   *
   * @returns {JSX} - Returns the cloned header.
   */
  renderHeader() {
    return React.cloneElement(this.props.header, {
      sections: Children.map(this.props.children, child => child.props),
      currentSection: this.state.currentSection,
      back: this.back,
      forward: this.forward,
    });
  }

  render() {
    const {
      classes,
      children,
      ...props
    } = this.props;

    return (
      <div
        className={classes.root}
        {...getNotDeclaredProps(props, Stepper)}
      >
        {this.renderHeader()}

        <div className={classes.sectionContainer}>
          <div
            className={classes.sectionWrapper}
            style={this.computeContainerStyles()}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(Stepper.styles)(Stepper);
