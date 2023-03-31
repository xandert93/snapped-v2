import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';

import { Input } from '../../../../components';

import { ShowPasswordInputAdornment } from '../ShowPasswordInputAdornment';

export const PasswordInput = (props) => {
  const password = props.value;

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const togglePassword = () => setIsPasswordShown((prev) => !prev);

  useEffect(() => {
    !password && setIsPasswordShown(false);
  }, [password]);

  return (
    <Input
      type={isPasswordShown ? 'text' : 'password'}
      {...props}
      InputProps={{
        endAdornment: (
          <ShowPasswordInputAdornment {...{ togglePassword, password, isPasswordShown }} />
        ),
      }}
      FormHelperTextProps={{ component: Box }} // otherwise renders as *<p>
    />
  );
};
