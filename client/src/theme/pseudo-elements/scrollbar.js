export const scrollbar = {
  '&::-webkit-scrollbar': {
    // display: 'none',
    width: '0.5rem',
    position: 'relative',
  },

  /* Track */
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },

  /* Handle */
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
  },

  /* Handle on hover */
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'white',
  },
};

/*MUI5 seems to have a custom scrollbar...from docs:

import darkScrollbar from '@mui/material/darkScrollbar';
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: theme.palette.mode === 'dark' ? darkScrollbar() : null,
      },
    },
  },
});

*/
