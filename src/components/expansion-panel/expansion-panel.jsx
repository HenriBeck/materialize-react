import React, {
  PureComponent,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import getNotDeclaredProps from '../../get-not-declared-props';
import elevation from '../../styles/elevation';
import Collapse from '../collapse';
import withKeyPress from '../../utils/with-key-press';
import withFocusedState from '../../utils/with-focused-state';
import {
  filter,
  head,
  pipe,
} from '../../utils/functions';

import ExpansionPanelSummary from './expansion-panel-summary';
import ExpansionPanelActions from './expansion-panel-actions';
import ExpansionPanelDetails from './expansion-panel-details';

/**
 * The main component for the ExpansionPanel.
 *
 * @class
 */
class ExpansionPanel extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({
      expansionPanel: PropTypes.string.isRequired,
      expanded: PropTypes.string.isRequired,
    }).isRequired,
    expanded: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    createKeyDownHandler: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = { className: '' };

  static Summary = ExpansionPanelSummary;

  static Actions = ExpansionPanelActions;

  static Details = ExpansionPanelDetails;

  static keyCodes = [13, 32];

  /**
   * Get the styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles.
   */
  static styles(theme) {
    return {
      expansionPanel: {
        composes: 'expansion-panel',
        position: 'relative',
        margin: 0,
        transition: 'margin 140ms',
        backgroundColor: theme.sheetColor,
        boxShadow: elevation(2),
        outline: 0,

        '&::before': {
          position: 'absolute',
          left: 0,
          top: -1,
          right: 0,
          height: 1,
          content: '""',
          opacity: 1,
          backgroundColor: theme.dividerColor,
          transition: 'opacity, background-color 140ms',
        },

        '&:first-child': {
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,

          '&::before': { display: 'none' },
        },

        '&:last-child': {
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        },

        '&$expanded + &::before': { display: 'none' },
      },

      expanded: {
        composes: 'expansion-panel--expanded',
        margin: '16px 0',

        '&:first-child': { marginTop: 0 },

        '&:last-child': { marginBottom: 0 },

        '&::before': { opacity: 0 },
      },
    };
  }

  handleKeyDown = this.props.createKeyDownHandler(this.props.onChange);

  render() {
    const children = Children.toArray(this.props.children);
    const summary = pipe(
      filter(child => child.type === ExpansionPanelSummary),
      head,
    )(children);
    const content = filter(child => child.type !== ExpansionPanelSummary)(children);

    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        {...getNotDeclaredProps(this.props, ExpansionPanel)}
        className={classnames(
          this.props.classes.expansionPanel,
          { [this.props.classes.expanded]: this.props.expanded },
          this.props.className,
        )}
        aria-expanded={this.props.expanded}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onKeyUp={this.props.onKeyUp}
        onKeyDown={this.handleKeyDown}
      >
        {React.cloneElement(summary, {
          expanded: this.props.expanded,
          onClick: this.props.onChange,
          isFocused: this.props.isFocused,
        })}

        <Collapse
          isOpen={this.props.expanded}
          className="expansion-panel--collapsed"
        >
          {content}
        </Collapse>
      </div>
    );
  }
}

export default pipe(
  injectSheet(ExpansionPanel.styles),
  withFocusedState,
  withKeyPress({ keyCodes: ExpansionPanel.keyCodes }),
)(ExpansionPanel);
