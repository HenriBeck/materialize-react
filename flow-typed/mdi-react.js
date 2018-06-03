// @flow strict-local

import { type Node } from 'react';

declare type Props = {
  color: string,
  size: number,
  className?: string,
};

declare module 'mdi-react/BellIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/PhoneIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/AccountIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/SettingsIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/BluetoothIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/WifiIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/PencilIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/ChevronDownIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/PlusIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/MenuIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/CloseIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/CheckboxMarkedIcon' {
  declare export default function Icon(props: Props): Node;
}

declare module 'mdi-react/CheckboxBlankOutlineIcon' {
  declare export default function Icon(props: Props): Node;
}
