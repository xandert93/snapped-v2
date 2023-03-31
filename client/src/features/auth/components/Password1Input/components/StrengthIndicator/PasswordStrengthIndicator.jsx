import { Box, Collapse, Fade, LinearProgress, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { checkPasswordStrength } from '../../../../../../utils/validators/credential-validators';

import useStyles from './styles';

const genStrengthData = (score, { error, warning, success }) => {
  switch (score) {
    case -1:
      return { message: '' };
    case 0:
      return { color: error.main, message: 'Very weak 😩' };
    case 1:
      return { color: warning.dark, message: 'Weak 😅' };
    case 2:
      return { color: warning.light, message: 'Fair 😐' };
    case 3:
      return { color: success.dark, message: 'Good 😃' };
    case 4:
      return { color: success.light, message: 'Strong 🥳' };
  }
};

export const PasswordStrengthIndicator = ({ password }) => {
  const passwordScore = password.length < 6 ? -1 : checkPasswordStrength(password).score; // => -1 to 4

  const { color, message } = genStrengthData(passwordScore, useTheme().palette);

  const classes = useStyles({ color });
  return (
    <Collapse in={passwordScore !== -1} timeout={800} unmountOnExit>
      <Fade in={passwordScore !== -1} timeout={{ enter: 1200, exit: 400 }}>
        <Box>
          <LinearProgress
            variant="determinate"
            value={(passwordScore + 1) * 20} //value is x/100
            classes={{
              root: classes['progress-box'],
              bar: classes.progress,
            }}
          />
          <Typography className={classes['helper-text']} variant="caption" component="p">
            Password strength:{' '}
            <Typography className={classes['strength-message']} variant="caption" component="span">
              {message}
            </Typography>
          </Typography>
        </Box>
      </Fade>
    </Collapse>
  );
};
