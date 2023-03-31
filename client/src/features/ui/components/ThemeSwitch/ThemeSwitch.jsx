import { Box } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { toggleDarkMode } from '../../state/ui-slice';
import { selectIsDarkMode } from '../../state/ui-selectors';
import useStyles from './styles';

export const ThemeSwitch = () => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const classes = useStyles({ isDarkMode })();

  const dispatch = useDispatch();

  const handleClick = () => dispatch(toggleDarkMode());

  return (
    <Box onClick={handleClick} className={classes['theme-switch']}>
      <Box className={classes['theme-toggle']}>
        <Box className="moon-crater" />
        <Box className="moon-crater" />
      </Box>
      <Box className={classes['theme-switch-shapes']}>
        <Box className="shape-sm" />
        <Box className="shape-sm" />
        <Box className="shape-md" />
        <Box className="shape-lg" />
      </Box>
    </Box>
  );
};
