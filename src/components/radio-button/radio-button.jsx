import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import Ripple from '../ripple';
import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import EventHandler from '../event-handler';
import Label from '../label';

/**
 * A component to render a RadioButton.
 *
 * @class
 */
export class RadioButton extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
  };

  id = randomstring.generate();

  render() {
    const {
      classes,
      checked,
      disabled,
      children,
      onKeyPress,
      isFocused,
      onPress,
      noink,
      ...props
    } = this.props;

    return (
      <EventHandler
        {...props}
        component="span"
        role="radio"
        id={this.id}
        onKeyPress={onKeyPress}
        className={classes.radioButton}
        aria-checked={checked}
        aria-disabled={disabled}
      >
        <EventHandler
          component="span"
          onPress={onPress}
          className={classes.container}
        >
          <Ripple
            isFocused={isFocused}
            round
            center
            nowaves={noink}
          />

          <span className={classes.border} />

          <span className={classes.circle} />
        </EventHandler>

        <Label
          htmlFor={this.id}
          disabled={disabled}
        >
          {children}
        </Label>
      </EventHandler>
    );
  }
}

const styles = {
  radioButton: {
    composes: 'radio-button',
    display: 'inline-flex',
    alignItems: 'center',
    padding: 4,

    '&[aria-checked=true] $border': { borderColor: props => props.theme.checkedColor },

    '&[aria-checked=true] $circle': { transform: 'scale(0.5)' },

    '&[aria-disabled=true]': { pointerEvents: 'none' },

    '&[aria-disabled=true] $border': { borderColor: props => props.theme.disabledColor },

    '&[aria-disabled=true] $circle': { backgroundColor: props => props.theme.disabledColor },
  },

  container: {
    position: 'relative',
    borderRadius: '50%',
    boxSizing: 'border-box',
    margin: ({ theme }) => (theme.rippleSize - theme.size) / 2,
    height: props => props.theme.size,
    width: props => props.theme.size,
  },

  border: {
    composes: 'radio-button--border',
    position: 'absolute',
    borderRadius: '50%',
    borderStyle: 'solid',
    boxSizing: 'border-box',
    transitionProperty: 'border-color',
    display: 'block',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: props => props.theme.borderWidth,
    borderColor: props => props.theme.uncheckedColor,
    transitionDuration: props => props.theme.transitionDuration,
  },

  circle: {
    position: 'absolute',
    composes: 'radio-button--circle',
    transform: 'scale(0)',
    borderRadius: '50%',
    transitionProperty: 'transform',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transitionDuration: props => props.theme.transitionDuration,
    backgroundColor: props => props.theme.checkedColor,
  },
};

export default connectWithTheme(injectSheet(styles)(RadioButton), 'radioButton');
