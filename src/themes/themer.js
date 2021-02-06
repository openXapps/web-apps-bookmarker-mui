// import { createMuiTheme } from '@material-ui/core/styles';
// import { light } from '@material-ui/core/styles/createPalette';

const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: '#3b3b50',
    },
    secondary: {
      main: '#f50057',
    },
  },
}

const light = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
}

/**
 * 
 */
const getTheme = (isDark) => {
  return isDark ? dark : light;
};

export default getTheme;