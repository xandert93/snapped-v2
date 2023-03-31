import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { selectIsDarkMode } from '../../state/ui-selectors';
import { genAppTheme } from '../../../../theme';

export const ThemeProvider = ({ children }) => {
  const isDarkMode = useSelector(selectIsDarkMode);

  return (
    <MuiThemeProvider theme={genAppTheme(isDarkMode)}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
