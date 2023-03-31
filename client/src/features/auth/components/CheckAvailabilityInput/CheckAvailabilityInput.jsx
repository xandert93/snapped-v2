import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { auth } from '../../api';

import { disableForm, enableForm } from '../../../ui/state/ui-slice';
import { validateCredential } from '../../../../utils/validators/credential-validators';

import useStyles from './styles';

import { Box } from '@material-ui/core';

import { debounce } from 'lodash';
import { Input, CollapsingCaption } from '../../../../components';

import { CheckingAvailabilityInputAdornment } from '../CheckingAvailabilityInputAdornment';

const defaultState = {
  isChecking: false,
  isAvailable: false,
  hasErr: false,
  message: '.', //so helper text <p> always mounted in DOM
};

// receives { type, name, label, minLength, value, onChange, autoFocus? }
export const CheckAvailabilityInput = (props) => {
  const { name, minLength, value: credential } = props;

  const dispatch = useDispatch();

  const [{ isChecking, isAvailable, hasErr, message }, setState] = useState(defaultState);
  const resetInput = () => setState(defaultState);

  const checkAvailability = useCallback(
    debounce(async (credential) => {
      try {
        validateCredential(name, credential); //protects API call + throws err object if invalid
        const { message } = await auth.checkEmailOrUsername({ [name]: credential });
        setState((prev) => ({ ...prev, isAvailable: true, message }));
      } catch (message) {
        setState((prev) => ({ ...prev, hasErr: true, message }));
      } finally {
        setState((prev) => ({ ...prev, isChecking: false }));
      }
    }, 1200),
    []
  );

  const isMinLength = credential.length >= minLength;
  const canSubmit = isMinLength && isAvailable;

  useEffect(() => {
    dispatch(disableForm());

    if (!isMinLength) resetInput();
    else {
      setState({ ...defaultState, isChecking: true });
      checkAvailability(credential);
    }
  }, [credential]);

  useEffect(() => {
    if (!canSubmit) {
      dispatch(disableForm());
      resetInput();
    } else {
      dispatch(enableForm());
    }
  }, [isAvailable]);

  useEffect(() => {
    if (hasErr && !isMinLength) resetInput();
  }, [hasErr]);

  const classes = useStyles({ isAvailable });
  return (
    <Input
      {...props}
      InputProps={{
        endAdornment: (
          <CheckingAvailabilityInputAdornment {...{ isChecking, hasErr, isAvailable }} />
        ),
      }}
      error={hasErr}
      FormHelperTextProps={{ component: Box, classes: { root: classes.helperText } }}
      helperText={<CollapsingCaption in={message !== defaultState.message} text={message} />}
    />
  );
};

/*
The 2nd useEffect() protects against occasions where the API response's 
setting of canSubmit(true) takes place after user input. For example, user may type in a 6 letter
username and while awaiting response, delete a letter. This triggers the 1st useEffect() and
canSubmit(false) & default local state implemented. However, given that the API response comes in
afterwards and is successful, it sets canSubmit(true), even though 5 letters are showing.

4th useEffect() is necessary for making submit button disabled on final step
*/
