import PropTypes from 'prop-types';

import { schema as background } from '../../components/background/theme';
import { schema as button } from '../../components/button/theme';
import { schema as divider } from '../../components/divider/theme';
import { schema as label } from '../../components/label/theme';
import { schema as spinner } from '../../components/spinner/theme';
import { schema as icon } from '../../components/icon/theme';
import { schema as iconButton } from '../../components/icon-button/theme';
import { schema as progress } from '../../components/progress/theme';
import { schema as fab } from '../../components/fab/theme';

export default PropTypes.shape({
  variables: PropTypes.object,
  background,
  label,
  divider,
  button,
  spinner,
  icon,
  iconButton,
  progress,
  fab,
});
