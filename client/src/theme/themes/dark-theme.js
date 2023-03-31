import { createTheme } from '@material-ui/core';
import { amber, red } from '@material-ui/core/colors';

export const darkTheme = createTheme({
  palette: {
    type: 'dark',

    background: { default: '#071b2d', paper: '#112645' },
    // text: { primary: _____, secondary: _____ },

    primary: { main: '#00e5ff' },
    secondary: { main: '#CE57E2' },

    success: { main: '#76ff03' }, // bright green that suits darker background
    error: { main: red.A200 }, // lighter red that that suits darker background
    warning: { main: amber.A400 },
  },
});
