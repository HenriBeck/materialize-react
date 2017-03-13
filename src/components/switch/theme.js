import { PropTypes } from 'react';
import {
  grey50,
  grey400,
} from 'styles/colors';

export const schema = PropTypes.shape({
  thumbSize: PropTypes.number,
  rippleSize: PropTypes.number,
  trackWidth: PropTypes.number,
  trackHeight: PropTypes.number,

  activeThumbColor: PropTypes.string,
  activeTrackColor: PropTypes.string,
  activeRippleColor: PropTypes.string,

  inactiveThumbColor: PropTypes.string,
  inactiveTrackColor: PropTypes.string,
  inactiveRippleColor: PropTypes.string,

  disabledThumbColor: PropTypes.string,
  disabledTrackColor: PropTypes.string,
});

export const defaultTheme = {
  thumbSize: 20,
  rippleSize: 40,
  trackWidth: 36,
  trackHeight: 14,

  activeThumbColor: 'var(primaryBase)',
  activeTrackColor: 'var(primaryBase)',
  activeRippleColor: 'var(primaryBase)',

  inactiveThumbColor: grey50,
  inactiveTrackColor: 'rgba(0, 0, 0, 0.38)',
  inactiveRippleColor: '#000000',

  disabledThumbColor: grey400,
  disabledTrackColor: 'rgba(0, 0, 0, 0.12)',
};
