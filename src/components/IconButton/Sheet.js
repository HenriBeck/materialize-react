// @flow strict-local

import createSheet from '../../styles/create-sheet';

export type Data = {
  size: number,
  disabled: boolean,
};

export default createSheet('IconButton', {
  iconButton: {
    position: 'relative',
    borderRadius: '50%',
    boxSizing: 'border-box',
    display: 'inline-flex',
    outline: 0,
    border: 0,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    height: (data: Data) => data.size,
    width: (data: Data) => data.size,
    cursor: (data: Data) => (data.disabled ? 'disabled' : 'pointer'),
    pointerEvents: (data: Data) => (data.disabled ? 'none' : 'auto'),
  },
});
