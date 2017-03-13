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
  checkedBgColor: 'var(primaryBase)',

  uncheckedBorderColor: 'rgba(0, 0, 0, 0.55)',
  uncheckedBgColor: 'transparent',

  disabledBorderColor: 'rgba(0, 0, 0, 0.26)',
  disabledBgColor: 'transparent',
  disabledCheckedBgColor: 'rgba(0, 0, 0, 0.26)',

  labelColor: 'var(textColor)',
  disabledLabelColor: 'var(disabledColor)',

  padding: 4,
  height: 48,
  checkboxSize: 20,
  checkboxBorderWidth: 2,
};
