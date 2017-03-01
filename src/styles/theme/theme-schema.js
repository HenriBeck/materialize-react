import { PropTypes } from 'react';

import { schema as button } from 'components/button/theme';
import { schema as checkbox } from 'components/checkbox/theme';
import { schema as divider } from 'components/divider/theme';
import { schema as fab } from 'components/fab/theme';
import { schema as label } from 'components/label/theme';
import { schema as progress } from 'components/progress/theme';
import { schema as spinner } from 'components/spinner/theme';
import { schema as icon } from 'components/icon/theme';
import { schema as switchSchema } from 'components/switch/theme';
import { schema as radioButton } from 'components/radio-button/theme';
import { schema as iconButton } from 'components/icon-button/theme';
import { schema as tabs } from 'components/tabs/theme';
import { schema as tab } from 'components/tab/theme';
import { schema as chip } from 'components/chip/theme';

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
});
