import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRegistrationReCAPTCHAToken } from '../../state/auth-slice';
import { useUpdateEffect } from '../../../../hooks';
import { selectIsFormDisabled } from '../../../ui/state/ui-selectors';

import ReCAPTCHAv2 from 'react-google-recaptcha';

export const RegistrationReCAPTCHA = (props) => {
  const dispatch = useDispatch();

  const reCAPTCHARef = useRef();
  const resetReCAPTCHA = () => reCAPTCHARef.current.reset();

  const isFormDisabled = useSelector(selectIsFormDisabled);

  const handleSuccess = (token) => {
    dispatch(setRegistrationReCAPTCHAToken(token));
  };

  useUpdateEffect(() => {
    if (isFormDisabled) return;

    reCAPTCHARef.current.executeAsync().then(handleSuccess).finally(resetReCAPTCHA);
  }, [isFormDisabled]);

  return (
    <ReCAPTCHAv2
      sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_ID}
      size="invisible"
      ref={reCAPTCHARef}
    />
  );
};
