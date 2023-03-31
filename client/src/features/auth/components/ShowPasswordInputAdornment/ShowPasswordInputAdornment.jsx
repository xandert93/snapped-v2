import { IconButton, InputAdornment } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';

export const ShowPasswordInputAdornment = ({ togglePassword, password, isPasswordShown }) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={togglePassword} disabled={!password}>
        {isPasswordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </IconButton>
    </InputAdornment>
  );
};
