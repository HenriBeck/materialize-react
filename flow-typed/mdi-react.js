// @flow strict-local

import { type Node } from 'react';

declare module 'mdi-react' {
  declare type Props = {
    color: string,
    size: number,
    className?: string,
  };

  declare function PhoneIcon(props: Props): Node;
  declare function AccountIcon(props: Props): Node;
  declare function SettingsIcon(props: Props): Node;
  declare function BellIcon(props: Props): Node;
  declare function BluetoothIcon(props: Props): Node;
  declare function WifiIcon(props: Props): Node;
  declare function PencilIcon(props: Props): Node;
  declare function ChevronDownIcon(props: Props): Node;
  declare function PlusIcon(props: Props): Node;
  declare function MenuIcon(props: Props): Node;
  declare function CloseIcon(props: Props): Node;
  declare function CheckboxMarkedIcon(props: Props): Node;
  declare function CheckboxBlankOutlineIcon(props: Props): Node;
}
