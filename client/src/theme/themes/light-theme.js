import { createTheme } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

export const lightTheme = createTheme({
  palette: {
    type: 'light',
    secondary: red,
    success: {
      main: green[500],
      //darker green better for white backgrounds
    },

    text: { secondary: '#000000a6' }, // a touch darker

    // background: { default: '#f5ebda' },

    action: {
      active: 'rgba(0,0,0,0.87)',
    },
  },
});
