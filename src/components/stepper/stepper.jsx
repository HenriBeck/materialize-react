import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';

import getNotDeclaredProps from '../../get-not-declared-props';

import Section from './section';
import Headers from './headers';
import Stepper from './stepper';
import classnames from 'classnames';

/**
 * A component which renders a material design stepper.
 *
 * @class
 */
export default class StepperContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      stepper: PropTypes.string.isRequired,
      sectionContainer: PropTypes.string.isRequired,
      sectionWrapper: PropTypes.string.isRequired,
    }).isRequired,
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
    section: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    headerAtBottom: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    headerAtBottom: false,
    onChange: () => {},
  };

  static Section = Section;
  static Headers = Headers;

  static styles = {
    stepper: {
      composes: 'stepper',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },

    headerAtBottom: {
      composes: 'stepper--header-at-bottom',
      flexDirection: 'column-reverse',
    },

    sectionContainer: {
      composes: 'stepper--section-container',
      position: 'relative',
      overflow: 'hidden',
      flex: 1,
      display: 'flex',
    },

    sectionWrapper: {
      composes: 'stepper--section-wrapper',
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      width: '100%',
      transition: 'transform 200ms',
    },
  };

  /**
   * Render the passed header with some additional attributes.
   *
   * @returns {JSX} - Returns the cloned header.
   */
  renderHeader() {
    return React.cloneElement(this.props.header, {
      sections: Children.map(this.props.children, child => child.props),
      currentSection: this.props.section,
    });
  }

  render() {
    const {
      header,
      classes,
      className,
      section,
      children,
      headerAtBottom,
      ...props
    } = this.props;

    return (
      <div
        className={classnames(
          classes.stepper,
          headerAtBottom && classes.headerAtBottom,
          className,
        )}
        {...getNotDeclaredProps(props, Stepper)}
      >
        {this.renderHeader(header)}

        <div className={classes.sectionContainer}>
          <div
            className={classes.sectionWrapper}
            style={{ transform: `translateX(${section * -100}%)` }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
