import {
  blue500,
  blue100,
  blue700,
  yellowA200,

  grey50,
  grey100,
  grey300,
  grey800,
  grey900,

  blackText,
  blackSecondaryText,
  blackDisabled,
  blackDivider,
  blackIcons,
  blackHint,

  whiteText,
  whiteSecondaryText,
  whiteDisabled,
  whiteDivider,
  whiteIcons,
  whiteHint,
} from '../../styles/colors';

const zIndexes = {
  fab: 100,
  snackbar: 1000,
  bottomNavigation: 1500,
  backdrop: 2000,
  dialog: 2500,
  drawer: 3000,
};

export default {
  light: {
    primaryBase: blue500,
    primaryLight: blue100,
    primaryDark: blue700,

    accent: yellowA200,

    statusBarColor: grey300,
    appBarColor: grey100,
    backgroundColor: grey50,
    sheetColor: '#ffffff',
    backdropColor: 'rgba(0, 0, 0, 0.56)',

    textColor: blackText,
    secondaryTextColor: blackSecondaryText,
    disabledColor: blackDisabled,
    iconColor: blackIcons,
    hintColor: blackHint,
    dividerColor: blackDivider,

    zIndexes,
  },

  dark: {
    primaryBase: blue500,
    primaryLight: blue100,
    primaryDark: blue700,

    accent: yellowA200,

    statusBarColor: '#000000',
    appBarColor: grey900,
    backgroundColor: '#303030',
    sheetColor: grey800,
    backdropColor: 'rgba(0, 0, 0, 0.56)',

    textColor: whiteText,
    secondaryTextColor: whiteSecondaryText,
    disabledColor: whiteDisabled,
    iconColor: whiteIcons,
    hintColor: whiteHint,
    dividerColor: whiteDivider,

    zIndexes,
  },
};
