import {
  blue500,
  blue100,
  blue700,
  yellowA200,
  yellowA100,
  yellowA400,
  blackText,
  blackSecondaryText,
  blackDisabled,
  blackDivider,
  blackIcons,
  blackHint,
  grey300,
  grey100,
  grey50,
  white500,
  orangeA700,
} from '../colors';
import { defaultTheme as button } from '/src/components/button/theme';
import { defaultTheme as checkbox } from '/src/components/checkbox/theme';
import { defaultTheme as divider } from '/src/components/divider/theme';
import { defaultTheme as fab } from '/src/components/fab/theme';
import { defaultTheme as label } from '/src/components/label/theme';
import { defaultTheme as progress } from '/src/components/progress/theme';
import { defaultTheme as spinner } from '/src/components/spinner/theme';
import { defaultTheme as icon } from '/src/components/icon/theme';
import { defaultTheme as switchTheme } from '/src/components/switch/theme';
import { defaultTheme as radioButton } from '/src/components/radio-button/theme';
import { defaultTheme as iconButton } from '/src/components/icon-button/theme';
import { defaultTheme as tabs } from '/src/components/tabs/theme';
import { defaultTheme as tab } from '/src/components/tab/theme';
import { defaultTheme as chip } from '/src/components/chip/theme';
import { defaultTheme as expansionPanel } from '/src/components/expansion-panel/theme';

export default {
  variables: {
    primaryBase: blue500,
    primaryLight: blue100,
    primaryDark: blue700,

    accentBase: yellowA200,
    accentLight: yellowA100,
    accentDark: yellowA400,

    statusBarColor: grey300,
    appBar: grey100,
    backgroundColor: grey50,
    cards: white500,

    textColor: blackText,
    secondaryTextColor: blackSecondaryText,
    disabledColor: blackDisabled,
    iconColor: blackIcons,
    hintColor: blackHint,
    dividerColor: blackDivider,

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
  expansionPanel,
};
