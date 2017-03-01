import {
  blue500,
  blue100,
  blue700,
  yellowA200,
  yellowA100,
  yellowA400,
  whiteText,
  whiteSecondaryText,
  whiteDivider,
  whiteDisabled,
  whiteIcons,
  whiteHint,
  orangeA700,
} from '../colors';
import { defaultTheme as button } from 'components/button/theme';
import { defaultTheme as checkbox } from 'components/checkbox/theme';
import { defaultTheme as divider } from 'components/divider/theme';
import { defaultTheme as fab } from 'components/fab/theme';
import { defaultTheme as label } from 'components/label/theme';
import { defaultTheme as progress } from 'components/progress/theme';
import { defaultTheme as spinner } from 'components/spinner/theme';
import { defaultTheme as icon } from 'components/icon/theme';
import { defaultTheme as switchTheme } from 'components/switch/theme';
import { defaultTheme as radioButton } from 'components/radio-button/theme';
import { defaultTheme as iconButton } from 'components/icon-button/theme';
import { defaultTheme as tabs } from 'components/tabs/theme';
import { defaultTheme as tab } from 'components/tab/theme';
import { defaultTheme as chip } from 'components/chip/theme';

export default {
  variables: {
    primaryBase: blue500,
    primaryLight: blue100,
    primaryDark: blue700,

    accentBase: yellowA200,
    accentLight: yellowA100,
    accentDark: yellowA400,

    backgroundColor: '#303030',

    textColor: whiteText,
    secondaryTextColor: whiteSecondaryText,
    dividerColor: whiteDivider,
    disabledColor: whiteDisabled,
    iconColor: whiteIcons,
    hintColor: whiteHint,

    // Other
    errorColor: orangeA700,

    transitionTime: 140,
  },

  label,
  button,
  divider,
  progress,
  spinner,
  fab,
  checkbox,
  icon,
  switch: switchTheme,
  radioButton,
  iconButton,
  tabs,
  tab,
  chip,
};
