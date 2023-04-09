import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { disableForm, enableForm } from '../../../ui/state/ui-slice';

import { selectRegistrationCredential } from '../../state/auth-selectors';
import { useInput } from '../../../../hooks';
import { validateName } from '../../../../utils/validators/credential-validators';
import { CollapsingCaption, Input } from '../../../../components';

import { AuthForm } from '../AuthForm';
import { FormTitle } from '../FormTitle';

export const RegistrationNamesForm = (props) => {
  const dispatch = useDispatch();

  const initialFirstName = useSelector(selectRegistrationCredential('firstName'));
  const { value: firstName, ...firstNameProps } = useInput(initialFirstName, validateName);

  const initialLastName = useSelector(selectRegistrationCredential('lastName'));
  const { value: lastName, ...lastNameProps } = useInput(initialLastName, validateName);

  useEffect(() => {
    const areFilled = Boolean(firstName.trim() && lastName.trim());
    const areValid = firstNameProps.isValid && lastNameProps.isValid;

    dispatch(areFilled && areValid ? enableForm() : disableForm());
  });

  const handleSubmit = () => props.onSubmit({ firstName, lastName });
  return (
    <AuthForm onSubmit={handleSubmit}>
      <FormTitle children="What is your name?" />

      <Input
        name="firstName"
        label="First name"
        value={firstName}
        {...firstNameProps}
        helperText={
          <CollapsingCaption in={firstNameProps.error} text="Please enter a valid first name" />
        }
      />

      <Input
        name="lastName"
        label="Last name"
        value={lastName}
        {...lastNameProps}
        helperText={
          <CollapsingCaption in={lastNameProps.error} text="Please enter a valid last name" />
        }
      />
    </AuthForm>
  );
};
