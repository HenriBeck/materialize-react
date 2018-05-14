// eslint-disable-line max-lines
// @flow strict-local

type Shade = '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'a100'
  | 'a200'
  | 'a400'
  | 'a700';

type Color = 'red'
  | 'pink'
  | 'purple'
  | 'deepPurple'
  | 'indigo'
  | 'blue'
  | 'lightBlue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'lightGreen'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'deepOrange'
  | 'brown'
  | 'grey'
  | 'blueGrey';

type Colors = {
  [key: Color]: {
    [key: Shade]: string,
  },
};

const colors: Colors = {
  red: {
    '50': '#ffebee', // eslint-disable-line quote-props
    '100': '#ffcdd2', // eslint-disable-line quote-props
    '200': '#ef9a9a', // eslint-disable-line quote-props
    '300': '#e57373', // eslint-disable-line quote-props
    '400': '#ef5350', // eslint-disable-line quote-props
    '500': '#f44336', // eslint-disable-line quote-props
    '600': '#e53935', // eslint-disable-line quote-props
    '700': '#d32f2f', // eslint-disable-line quote-props
    '800': '#c62828', // eslint-disable-line quote-props
    '900': '#b71c1c', // eslint-disable-line quote-props
    a100: '#ff8a80',
    a200: '#ff5252',
    a400: '#ff1744',
    a700: '#d50000',
  },

  pink: {
    '50': '#fce4ec', // eslint-disable-line quote-props
    '100': '#f8bbd0', // eslint-disable-line quote-props
    '200': '#f48fb1', // eslint-disable-line quote-props
    '300': '#f06292', // eslint-disable-line quote-props
    '400': '#ec407a', // eslint-disable-line quote-props
    '500': '#e91e63', // eslint-disable-line quote-props
    '600': '#d81b60', // eslint-disable-line quote-props
    '700': '#c2185b', // eslint-disable-line quote-props
    '800': '#ad1457', // eslint-disable-line quote-props
    '900': '#880e4f', // eslint-disable-line quote-props
    a100: '#ff80ab',
    a200: '#ff4081',
    a400: '#f50057',
    a700: '#c51162',
  },

  purple: {
    '50': '#f3e5f5', // eslint-disable-line quote-props
    '100': '#e1bee7', // eslint-disable-line quote-props
    '200': '#ce93d8', // eslint-disable-line quote-props
    '300': '#ba68c8', // eslint-disable-line quote-props
    '400': '#ab47bc', // eslint-disable-line quote-props
    '500': '#9c27b0', // eslint-disable-line quote-props
    '600': '#8e24aa', // eslint-disable-line quote-props
    '700': '#7b1fa2', // eslint-disable-line quote-props
    '800': '#6a1b9a', // eslint-disable-line quote-props
    '900': '#4a148c', // eslint-disable-line quote-props
    a100: '#ea80fc',
    a200: '#e040fb',
    a400: '#d500f9',
    a700: '#aa00ff',
  },

  deepPurple: {
    '50': '#ede7f6', // eslint-disable-line quote-props
    '100': '#d1c4e9', // eslint-disable-line quote-props
    '200': '#b39ddb', // eslint-disable-line quote-props
    '300': '#9575cd', // eslint-disable-line quote-props
    '400': '#7e57c2', // eslint-disable-line quote-props
    '500': '#673ab7', // eslint-disable-line quote-props
    '600': '#5e35b1', // eslint-disable-line quote-props
    '700': '#512da8', // eslint-disable-line quote-props
    '800': '#4527a0', // eslint-disable-line quote-props
    '900': '#311b92', // eslint-disable-line quote-props
    a100: '#b388ff',
    a200: '#7c4dff',
    a400: '#651fff',
    a700: '#6200ea',
  },

  indigo: {
    '50': '#e8eaf6', // eslint-disable-line quote-props
    '100': '#c5cae9', // eslint-disable-line quote-props
    '200': '#9fa8da', // eslint-disable-line quote-props
    '300': '#7986cb', // eslint-disable-line quote-props
    '400': '#5c6bc0', // eslint-disable-line quote-props
    '500': '#3f51b5', // eslint-disable-line quote-props
    '600': '#3949ab', // eslint-disable-line quote-props
    '700': '#303f9f', // eslint-disable-line quote-props
    '800': '#283593', // eslint-disable-line quote-props
    '900': '#1a237e', // eslint-disable-line quote-props
    a100: '#8c9eff',
    a200: '#536dfe',
    a400: '#3d5afe',
    a700: '#304ffe',
  },

  blue: {
    '50': '#e3f2fd', // eslint-disable-line quote-props
    '100': '#bbdefb', // eslint-disable-line quote-props
    '200': '#90caf9', // eslint-disable-line quote-props
    '300': '#64b5f6', // eslint-disable-line quote-props
    '400': '#42a5f5', // eslint-disable-line quote-props
    '500': '#2196f3', // eslint-disable-line quote-props
    '600': '#1e88e5', // eslint-disable-line quote-props
    '700': '#1976d2', // eslint-disable-line quote-props
    '800': '#1565c0', // eslint-disable-line quote-props
    '900': '#0d47a1', // eslint-disable-line quote-props
    a100: '#82b1ff',
    a200: '#448aff',
    a400: '#2979ff',
    a700: '#2962ff',
  },

  lightBlue: {
    '50': '#e1f5fe', // eslint-disable-line quote-props
    '100': '#b3e5fc', // eslint-disable-line quote-props
    '200': '#81d4fa', // eslint-disable-line quote-props
    '300': '#4fc3f7', // eslint-disable-line quote-props
    '400': '#29b6f6', // eslint-disable-line quote-props
    '500': '#03a9f4', // eslint-disable-line quote-props
    '600': '#039be5', // eslint-disable-line quote-props
    '700': '#0288d1', // eslint-disable-line quote-props
    '800': '#0277bd', // eslint-disable-line quote-props
    '900': '#01579b', // eslint-disable-line quote-props
    a100: '#80d8ff',
    a200: '#40c4ff',
    a400: '#00b0ff',
    a700: '#0091ea',
  },

  cyan: {
    '50': '#e0f7fa', // eslint-disable-line quote-props
    '100': '#b2ebf2', // eslint-disable-line quote-props
    '200': '#80deea', // eslint-disable-line quote-props
    '300': '#4dd0e1', // eslint-disable-line quote-props
    '400': '#26c6da', // eslint-disable-line quote-props
    '500': '#00bcd4', // eslint-disable-line quote-props
    '600': '#00acc1', // eslint-disable-line quote-props
    '700': '#0097a7', // eslint-disable-line quote-props
    '800': '#00838f', // eslint-disable-line quote-props
    '900': '#006064', // eslint-disable-line quote-props
    a100: '#84ffff',
    a200: '#18ffff',
    a400: '#00e5ff',
    a700: '#00b8d4',
  },

  teal: {
    '50': '#e0f2f1', // eslint-disable-line quote-props
    '100': '#b2dfdb', // eslint-disable-line quote-props
    '200': '#80cbc4', // eslint-disable-line quote-props
    '300': '#4db6ac', // eslint-disable-line quote-props
    '400': '#26a69a', // eslint-disable-line quote-props
    '500': '#009688', // eslint-disable-line quote-props
    '600': '#00897b', // eslint-disable-line quote-props
    '700': '#00796b', // eslint-disable-line quote-props
    '800': '#00695c', // eslint-disable-line quote-props
    '900': '#004d40', // eslint-disable-line quote-props
    a100: '#a7ffeb',
    a200: '#64ffda',
    a400: '#1de9b6',
    a700: '#00bfa5',
  },

  green: {
    '50': '#e8f5e9', // eslint-disable-line quote-props
    '100': '#c8e6c9', // eslint-disable-line quote-props
    '200': '#a5d6a7', // eslint-disable-line quote-props
    '300': '#81c784', // eslint-disable-line quote-props
    '400': '#66bb6a', // eslint-disable-line quote-props
    '500': '#4caf50', // eslint-disable-line quote-props
    '600': '#43a047', // eslint-disable-line quote-props
    '700': '#388e3c', // eslint-disable-line quote-props
    '800': '#2e7d32', // eslint-disable-line quote-props
    '900': '#1b5e20', // eslint-disable-line quote-props
    a100: '#b9f6ca',
    a200: '#69f0ae',
    a400: '#00e676',
    a700: '#00c853',
  },

  lightGreen: {
    '50': '#f1f8e9', // eslint-disable-line quote-props
    '100': '#dcedc8', // eslint-disable-line quote-props
    '200': '#c5e1a5', // eslint-disable-line quote-props
    '300': '#aed581', // eslint-disable-line quote-props
    '400': '#9ccc65', // eslint-disable-line quote-props
    '500': '#8bc34a', // eslint-disable-line quote-props
    '600': '#7cb342', // eslint-disable-line quote-props
    '700': '#689f38', // eslint-disable-line quote-props
    '800': '#558b2f', // eslint-disable-line quote-props
    '900': '#33691e', // eslint-disable-line quote-props
    a100: '#ccff90',
    a200: '#b2ff59',
    a400: '#76ff03',
    a700: '#64dd17',
  },

  lime: {
    '50': '#f9fbe7', // eslint-disable-line quote-props
    '100': '#f0f4c3', // eslint-disable-line quote-props
    '200': '#e6ee9c', // eslint-disable-line quote-props
    '300': '#dce775', // eslint-disable-line quote-props
    '400': '#d4e157', // eslint-disable-line quote-props
    '500': '#cddc39', // eslint-disable-line quote-props
    '600': '#c0ca33', // eslint-disable-line quote-props
    '700': '#afb42b', // eslint-disable-line quote-props
    '800': '#9e9d24', // eslint-disable-line quote-props
    '900': '#827717', // eslint-disable-line quote-props
    a100: '#f4ff81',
    a200: '#eeff41',
    a400: '#c6ff00',
    a700: '#aeea00',
  },

  yellow: {
    '50': '#fffde7', // eslint-disable-line quote-props
    '100': '#fff9c4', // eslint-disable-line quote-props
    '200': '#fff59d', // eslint-disable-line quote-props
    '300': '#fff176', // eslint-disable-line quote-props
    '400': '#ffee58', // eslint-disable-line quote-props
    '500': '#ffeb3b', // eslint-disable-line quote-props
    '600': '#fdd835', // eslint-disable-line quote-props
    '700': '#fbc02d', // eslint-disable-line quote-props
    '800': '#f9a825', // eslint-disable-line quote-props
    '900': '#f57f17', // eslint-disable-line quote-props
    a100: '#ffff8d',
    a200: '#ffff00',
    a400: '#ffea00',
    a700: '#ffd600',
  },

  amber: {
    '50': '#fff8e1', // eslint-disable-line quote-props
    '100': '#ffecb3', // eslint-disable-line quote-props
    '200': '#ffe082', // eslint-disable-line quote-props
    '300': '#ffd54f', // eslint-disable-line quote-props
    '400': '#ffca28', // eslint-disable-line quote-props
    '500': '#ffc107', // eslint-disable-line quote-props
    '600': '#ffb300', // eslint-disable-line quote-props
    '700': '#ffa000', // eslint-disable-line quote-props
    '800': '#ff8f00', // eslint-disable-line quote-props
    '900': '#ff6f00', // eslint-disable-line quote-props
    a100: '#ffe57f',
    a200: '#ffd740',
    a400: '#ffc400',
    a700: '#ffab00',
  },

  orange: {
    '50': '#fff3e0', // eslint-disable-line quote-props
    '100': '#ffe0b2', // eslint-disable-line quote-props
    '200': '#ffcc80', // eslint-disable-line quote-props
    '300': '#ffb74d', // eslint-disable-line quote-props
    '400': '#ffa726', // eslint-disable-line quote-props
    '500': '#ff9800', // eslint-disable-line quote-props
    '600': '#fb8c00', // eslint-disable-line quote-props
    '700': '#f57c00', // eslint-disable-line quote-props
    '800': '#ef6c00', // eslint-disable-line quote-props
    '900': '#e65100', // eslint-disable-line quote-props
    a100: '#ffd180',
    a200: '#ffab40',
    a400: '#ff9100',
    a700: '#ff6d00',
  },

  deepOrange: {
    '50': '#fbe9e7', // eslint-disable-line quote-props
    '100': '#ffccbc', // eslint-disable-line quote-props
    '200': '#ffab91', // eslint-disable-line quote-props
    '300': '#ff8a65', // eslint-disable-line quote-props
    '400': '#ff7043', // eslint-disable-line quote-props
    '500': '#ff5722', // eslint-disable-line quote-props
    '600': '#f4511e', // eslint-disable-line quote-props
    '700': '#e64a19', // eslint-disable-line quote-props
    '800': '#d84315', // eslint-disable-line quote-props
    '900': '#bf360c', // eslint-disable-line quote-props
    a100: '#ff9e80',
    a200: '#ff6e40',
    a400: '#ff3d00',
    a700: '#dd2c00',
  },

  brown: {
    '50': '#efebe9', // eslint-disable-line quote-props
    '100': '#d7ccc8', // eslint-disable-line quote-props
    '200': '#bcaaa4', // eslint-disable-line quote-props
    '300': '#a1887f', // eslint-disable-line quote-props
    '400': '#8d6e63', // eslint-disable-line quote-props
    '500': '#795548', // eslint-disable-line quote-props
    '600': '#6d4c41', // eslint-disable-line quote-props
    '700': '#5d4037', // eslint-disable-line quote-props
    '800': '#4e342e', // eslint-disable-line quote-props
    '900': '#3e2723', // eslint-disable-line quote-props
    a100: '',
    a200: '',
    a400: '',
    a700: '',
  },

  grey: {
    '50': '#fafafa', // eslint-disable-line quote-props
    '100': '#f5f5f5', // eslint-disable-line quote-props
    '200': '#eeeeee', // eslint-disable-line quote-props
    '300': '#e0e0e0', // eslint-disable-line quote-props
    '400': '#bdbdbd', // eslint-disable-line quote-props
    '500': '#9e9e9e', // eslint-disable-line quote-props
    '600': '#757575', // eslint-disable-line quote-props
    '700': '#616161', // eslint-disable-line quote-props
    '800': '#424242', // eslint-disable-line quote-props
    '900': '#212121', // eslint-disable-line quote-props
    a100: '',
    a200: '',
    a400: '',
    a700: '',
  },

  blueGrey: {
    '50': '#eceff1', // eslint-disable-line quote-props
    '100': '#cfd8dc', // eslint-disable-line quote-props
    '200': '#b0bec5', // eslint-disable-line quote-props
    '300': '#90a4ae', // eslint-disable-line quote-props
    '400': '#78909c', // eslint-disable-line quote-props
    '500': '#607d8b', // eslint-disable-line quote-props
    '600': '#546e7a', // eslint-disable-line quote-props
    '700': '#455a64', // eslint-disable-line quote-props
    '800': '#37474f', // eslint-disable-line quote-props
    '900': '#263238', // eslint-disable-line quote-props
    a100: '',
    a200: '',
    a400: '',
    a700: '',
  },
};

function getColor(color: Color, shade: Shade = '500'): string {
  return colors[color] ? colors[color][shade] : '';
}

export type {
  Color,
  Shade,
  Colors,
};

export {
  colors,
  getColor,
};
