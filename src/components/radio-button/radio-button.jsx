import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import randomstring from 'randomstring';

import Ripple from '../ripple';
import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';
import EventHandler from '../event-handler';
import Label from '../label';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';

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
    isFocused: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    noink: PropTypes.bool,
    labelPosition: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    noink: false,
    labelPosition: 'right',
    className: '',
  };

  id = randomstring.generate();

  render() {
    const {
      classes,
      checked,
      disabled,
      children,
      isFocused,
      onPress,
      noink,
      className,
      labelPosition,
      ...props
    } = this.props;
    const labelClass = labelPosition === 'left' && 'radio-button--label-left';

    return (
      <span
        {...getNotDeclaredProps(props, RadioButton)}
        role="radio"
        id={this.id}
        className={`${className} ${classes.radioButton} ${labelClass}`}
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
            className={classes.ripple}
          />

          <span className={classes.border} />

          <span className={classes.circle} />
        </EventHandler>

        <Label
          htmlFor={this.id}
          disabled={disabled}
          className={classes.label}
        >
          {children}
        </Label>
      </span>
    );
  }
}

const styles = {
  radioButton: {
    composes: 'radio-button',
    display: 'inline-flex',
    alignItems: 'center',
    padding: 4,

    '&.radio-button--label-left': { flexDirection: 'row-reverse' },

    '&[aria-checked=true] $border': { borderColor: props => props.theme.checkedColor },

    '&[aria-checked=true] $circle': { transform: 'scale(0.5)' },

    '&[aria-disabled=true]': { pointerEvents: 'none' },

    '&[aria-disabled=true] $border': { borderColor: props => props.theme.disabledColor },

    '&[aria-disabled=true] $circle': { backgroundColor: props => props.theme.disabledColor },
  },

  container: {
    composes: 'radio-button--container',
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
    composes: 'radio-button--circle',
    position: 'absolute',
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

  label: {
    composes: 'radio-button--label',
    padding: 4,
  },

  ripple: {
    composes: 'radio-button--ripple',
    zIndex: 1,
    top: ({ theme }) => (theme.rippleSize - theme.size) / -2,
    right: ({ theme }) => (theme.rippleSize - theme.size) / -2,
    left: ({ theme }) => (theme.rippleSize - theme.size) / -2,
    bottom: ({ theme }) => (theme.rippleSize - theme.size) / -2,
  },
};

export default connectWithTheme(injectSheet(styles)(RadioButton), 'radioButton');
