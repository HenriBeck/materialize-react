import type Jss from 'jss/lib/Jss';
import type SheetsManager from 'jss/lib/SheetsManager';
import type StyleSheet from 'jss/lib/StyleSheet';
import { type JssOptions } from 'jss/lib/types';

declare module 'jss' {
  declare export function getDynamicStyles(styles: {}): {} | null;
  declare export function create(options?: JssOptions): Jss;
}

declare module 'jss/lib/Jss' {
  declare export default Jss;
}

declare module 'jss/lib/StyleSheet' {
  declare export default StyleSheet;
}

declare module 'jss/lib/SheetsManager' {
  declare export default SheetsManager;
}

declare module 'jss-preset-default' {
  declare function preset(): JssOptions;

  declare export default typeof preset;
}
