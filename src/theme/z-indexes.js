// @flow strict

import {
  number,
  shape,
} from 'prop-types';

type ZIndexes = {
  appBar: number,
  fab: number,
  snackbar: number,
  backdrop: number,
  dialog: number,
  drawer: number,
};

const schema = shape({
  appBar: number.isRequired,
  fab: number.isRequired,
  snackbar: number.isRequired,
  backdrop: number.isRequired,
  dialog: number.isRequired,
  drawer: number.isRequired,
}).isRequired;

const defaultZIndexes: ZIndexes = {
  appBar: 50,
  fab: 100,
  snackbar: 1000,
  backdrop: 2000,
  dialog: 2500,
  drawer: 3000,
};

export type { ZIndexes };

export {
  schema,
  defaultZIndexes,
};
