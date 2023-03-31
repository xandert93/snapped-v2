import { FormGroup, Grid } from '@material-ui/core';
import { AuthForm } from '../AuthForm';
import { RegistrationCheckboxList } from '../RegistrationCheckboxList';

import { RegistrationReCAPTCHA } from '../RegistrationReCAPTCHA';
import { AuthSubmitButton } from '../AuthSubmitButton';

import useStyles from './styles';

export const RegistrationTermsForm = (props) => {
  const classes = useStyles();
  return (
    <AuthForm onSubmit={props.onSubmit}>
      <Grid item container spacing={2} component={FormGroup} className={classes['agreements-box']}>
        <RegistrationCheckboxList />
      </Grid>

      <RegistrationReCAPTCHA />

      <AuthSubmitButton children="Create Account" />
    </AuthForm>
  );
};
