import { PropTypes } from 'react';

import { schema as button } from '/src/components/button/theme';
import { schema as checkbox } from '/src/components/checkbox/theme';
import { schema as divider } from '/src/components/divider/theme';
import { schema as fab } from '/src/components/fab/theme';
import { schema as label } from '/src/components/label/theme';
import { schema as progress } from '/src/components/progress/theme';
import { schema as spinner } from '/src/components/spinner/theme';
import { schema as icon } from '/src/components/icon/theme';
import { schema as switchSchema } from '/src/components/switch/theme';
import { schema as radioButton } from '/src/components/radio-button/theme';
import { schema as iconButton } from '/src/components/icon-button/theme';
import { schema as tabs } from '/src/components/tabs/theme';
import { schema as tab } from '/src/components/tab/theme';
import { schema as chip } from '/src/components/chip/theme';
import { schema as toolbar } from '/src/components/toolbar/theme';
import { schema as drawer } from '/src/components/drawer/theme';

export default PropTypes.shape({
  variables: PropTypes.shape({
    primaryBase: PropTypes.string,
    primaryLight: PropTypes.string,
    primaryDark: PropTypes.string,

    accentBase: PropTypes.string,
    accentLight: PropTypes.string,
    accentDark: PropTypes.string,

    backgroundColor: PropTypes.string,

    textColor: PropTypes.string,
    secondaryTextColor: PropTypes.string,
    dividerColor: PropTypes.string,
    disabledColor: PropTypes.string,
    iconColor: PropTypes.string,
    hintColor: PropTypes.string,

    // Other
    errorColor: PropTypes.string,

    defaultTransitionTime: PropTypes.number,
  }),

  label,
  divider,
  button,
  checkbox,
  fab,
  progress,
  spinner,
  icon,
  switch: switchSchema,
  radioButton,
  iconButton,
  tabs,
  tab,
  chip,
  toolbar,
  drawer,
});
