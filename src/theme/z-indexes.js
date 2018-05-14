// @flow strict-local

type ZIndexes = {
  appBar: number,
  fab: number,
  snackbar: number,
  backdrop: number,
  dialog: number,
  drawer: number,
};

const defaultZIndexes: ZIndexes = {
  appBar: 50,
  fab: 100,
  snackbar: 1000,
  backdrop: 2000,
  dialog: 2500,
  drawer: 3000,
};

export type { ZIndexes };

export { defaultZIndexes };
