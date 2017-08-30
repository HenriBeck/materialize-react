import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import getNotDeclaredProps from '../../get-not-declared-props';

import StepperSection from './stepper-section';

export class Stepper extends PureComponent {
  static propTypes = {
    children({ children }) { // eslint-disable-line react/require-default-props
      const childrenArray = Children.toArray(children);

      if (children.length === 0) {
        return new Error();
      }

      const hasNotSectionChild = childrenArray.some(child => child.type !== StepperSection);

      if (hasNotSectionChild) {
        return new Error();
      }

      return null;
    },
    header: PropTypes.element,
    initialSection: PropTypes.number,
  };

  static defaultProps = { initialSection: 0 };

  static Section = StepperSection;

  static styles = {
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
      transition: 'transform 250ms linear',
    },
  };

  state = { currentSection: this.props.initialSection };

  childrenCount = Children.count(this.props.children);

  back = () => {
    this.setState(({ currentSection }) => {
      if (currentSection === 0) {
        return null;
      }

      return { currentSection: currentSection - 1 };
    });
  };

  forward = () => {
    this.setState(({ currentSection }) => {
      if (currentSection === this.childrenCount - 1) {
        return null;
      }

      return { currentSection: currentSection + 1 };
    });
  };

  computeContainerStyles() {
    return { transform: `translateX(${this.state.currentSection * -100}%)` };
  }

  renderSections(children) {
    return Children.map(children, (child) => {
      const props = {
        style: {
          ...child.props.style,
        },
      };

      return React.cloneElement(child, props);
    });
  }

  renderHeader() {
    return React.cloneElement(this.props.header, {
      sections: Children.map(this.props.children, child => child.props),
      currentSection: this.state.currentSection,
      back: this.back,
      forward: this.forward,
    });
  }

  render() {
    return (
      <div
        className={this.props.classes.root}
        {...getNotDeclaredProps(this.props, Stepper)}
      >
        {this.renderHeader()}

        <div className={this.props.classes.sectionContainer}>
          <div
            className={this.props.classes.sectionWrapper}
            style={this.computeContainerStyles()}
          >
            {this.renderSections(this.props.children)}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(Stepper.styles)(Stepper);
