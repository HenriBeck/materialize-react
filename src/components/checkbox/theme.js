import { PropTypes } from 'react';

export const schema = PropTypes.shape({
  checkmarkColor: PropTypes.string,

  checkedBorderColor: PropTypes.string,
  checkedBackgroundColor: PropTypes.string,

  uncheckedBorderColor: PropTypes.string,
  uncheckedBackgroundColor: PropTypes.string,

  disabledBorderColor: PropTypes.string,
  disabledBackgroundColor: PropTypes.string,
  disabledCheckedBackgroundColor: PropTypes.string,

  checkedRippleColor: PropTypes.string,
  uncheckedRippleColor: PropTypes.string,

  checkedRippleFocusColor: PropTypes.string,
  uncheckedRippleFocusColor: PropTypes.string,

  labelColor: PropTypes.string,
  disabledLabelColor: PropTypes.string,

  padding: PropTypes.number,
  height: PropTypes.number,
  checkboxSize: PropTypes.number,
  checkboxBorderWidth: PropTypes.number,
});

export const defaultTheme = {
  checkmarkColor: 'white',

  checkedBorderColor: 'var(primaryBase)',
  checkedBackgroundColor: 'var(primaryBase)',

  uncheckedBorderColor: 'var(secondaryTextColor)',
  uncheckedBackgroundColor: 'transparent',

  disabledBorderColor: 'var(disabledColor)',
  disabledBackgroundColor: 'transparent',
  disabledCheckedBackgroundColor: 'var(disabledColor)',

  checkedRippleColor: 'var(primaryBase)',
  uncheckedRippleColor: 'var(secondaryTextColor)',

  checkedRippleFocusColor: 'var(primaryBase)',
  uncheckedRippleFocusColor: 'var(secondaryTextColor)',

  labelColor: 'var(textColor)',
  disabledLabelColor: 'var(disabledColor)',

  padding: 4,
  height: 48,
  checkboxSize: 20,
  checkboxBorderWidth: 2,
};
