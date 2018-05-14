// @flow strict-local

type Elevation = '0' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '24';
type Elevations = { [key: Elevation]: string };

const generateShadow = color => (...values) => values
  .map(value => `${value}px`)
  .concat([color])
  .join(' ');
const keyUmbra = generateShadow('rgba(0, 0, 0, 0.14)');
const keyPenumbra = generateShadow('rgba(0, 0, 0, 0.12)');
const ambientShadow = generateShadow('rgba(0, 0, 0, 0.4)');

const defaultElevations: Elevations = {
  '0': 'none', // eslint-disable-line quote-props
  '2': [ // eslint-disable-line quote-props
    keyUmbra(0, 2, 2, 0),
    keyPenumbra(0, 1, 5, 0),
    generateShadow('rgba(0, 0, 0, 0.2)')(0, 3, 1, -2),
  ].join(', '),
  '3': [ // eslint-disable-line quote-props
    keyUmbra(0, 3, 4, 0),
    keyPenumbra(0, 1, 8, 0),
    ambientShadow(0, 3, 3, -2),
  ].join(', '),
  '4': [ // eslint-disable-line quote-props
    keyUmbra(0, 4, 5, 0),
    keyPenumbra(0, 1, 10, 0),
    ambientShadow(0, 2, 4, -1),
  ].join(', '),
  '6': [ // eslint-disable-line quote-props
    keyUmbra(0, 6, 10, 0),
    keyPenumbra(0, 1, 18, 0),
    ambientShadow(0, 3, 5, -1),
  ].join(', '),
  '8': [ // eslint-disable-line quote-props
    keyUmbra(0, 8, 10, 1),
    keyPenumbra(0, 3, 14, 2),
    ambientShadow(0, 5, 5, -3),
  ].join(', '),
  '12': [ // eslint-disable-line quote-props
    keyUmbra(0, 12, 16, 1),
    keyPenumbra(0, 4, 22, 3),
    ambientShadow(0, 6, 7, -4),
  ].join(', '),
  '16': [ // eslint-disable-line quote-props
    keyUmbra(0, 16, 24, 2),
    keyPenumbra(0, 6, 30, 5),
    ambientShadow(0, 8, 10, -5),
  ].join(', '),
  '24': [ // eslint-disable-line quote-props
    keyUmbra(0, 24, 38, 3),
    keyPenumbra(0, 9, 46, 8),
    ambientShadow(0, 11, 15, -7),
  ].join(', '),
};

export type {
  Elevation,
  Elevations,
};

export { defaultElevations };
