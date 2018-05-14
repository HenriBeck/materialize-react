// @flow strict-local

import createSheet from '../../styles/create-sheet';

export type Data = { disabled: boolean };

export default createSheet('Label', {
  label: {
    display: 'flex',
    alignItems: 'center',
  },

  text: {
    padding: '4px 4px 4px 8px',
    userSelect: 'none',
    cursor: (data: Data) => (data.disabled ? 'disabled' : 'pointer'),
    pointerEvents: (data: Data) => (data.disabled ? 'none' : 'auto'),
  },
});
