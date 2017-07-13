import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import connectWithTheme from '../../styles/theme/connect-with-theme';
import injectSheet from '../../styles/jss';
import EventHandler from '../event-handler';

/**
 * A component that renders a tablist.
 *
 * @class
 * @private
 */
export class TabsContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    createRef: PropTypes.func.isRequired,
    noBar: PropTypes.bool.isRequired,
  };

  /**
   * Expose the instance to the parent.
   */
  componentWillMount() {
    this.props.createRef(this);
  }

  /**
   * Create a reference to the root element of the tablist.
   *
   * @private
   * @param {Object} element - The root element.
   */
  createRootRef = (element) => {
    this.root = element;
  };

  render() {
    const {
      classes,
      className,
    } = this.props;

    return (
      <EventHandler
        component="div"
        role="tablist"
        tabIndex="0"
        onKeyPress={this.props.onKeyPress}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        createRef={this.createRootRef}
        className={`${className} ${classes.tabs}`}
      >
        {this.props.children}

        {!this.props.noBar && (
          <span
            className={classes.bar}
            ref={(element) => { this.bar = element; }}
          />
        )}
      </EventHandler>
    );
  }
}

const styles = {
  tabs: {
    composes: 'tabs',
    display: 'flex',
    flexDirection: 'row',

    '&:focus': { outline: 0 },
  },

  bar: {
    composes: 'tabs--bar',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 2,
    width: 1,
    transform: 'scaleX(0) translateX(0px)',
    transformOrigin: 'left center',
    backgroundColor: props => props.theme.barColor,
  },
};

export default connectWithTheme(injectSheet(styles)(TabsContainer), 'tabs');
