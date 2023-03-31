import { Prompt } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  RegistrationNamesForm,
  RegistrationEmailForm,
  RegistrationUsernameForm,
  RegistrationPasswordsForm,
  RegistrationTermsForm,
  RegistrationMobileStepper,
} from '../../../features/auth/components';

import { useSetDocumentTitle } from '../../../hooks';

import { toNextRegistrationStep } from '../../../features/auth/state/auth-slice';
import { register } from '../../../features/auth/state/auth-actions';
import {
  selectRegistrationStepIndex,
  selectRegistrationCredentials,
} from '../../../features/auth/state/auth-selectors';

const steps = [
  RegistrationNamesForm,
  RegistrationEmailForm,
  RegistrationUsernameForm,
  RegistrationPasswordsForm,
  RegistrationTermsForm,
];

const stepCount = steps.length;

export const RegistrationPage = () => {
  useSetDocumentTitle('Create Account');
  const dispatch = useDispatch();

  const credentials = useSelector(selectRegistrationCredentials);
  const stepIndex = useSelector(selectRegistrationStepIndex);
  const isLastStep = stepIndex === stepCount - 1;

  const handleSubmit = (newCredentials) => {
    dispatch(!isLastStep ? toNextRegistrationStep(newCredentials) : register(credentials));
  };

  const RegistrationForm = steps[stepIndex];
  return (
    <>
      <RegistrationForm onSubmit={handleSubmit} />
      <RegistrationMobileStepper stepCount={stepCount} />
      <Prompt
        when={stepIndex !== 0}
        message={(newLocation) => `Unsaved changes. Are you sure you want to leave?`}
      />
    </>
  );
};

/*

Thought "stepIndex" state is only needed here and in <RegistrationMobileStepper>, I have inserted it into the store
simply because it makes the handleSubmit function much more readable. Pre-store:

const handleSubmit = isLastStep ? () => dispatch(login()) : updateStepIndex

In addition, the fact the <AuthForm /> onSubmit attribute had to be prepared for an action or a standard function made
the other calls to <AuthForm /> more verbose - useDispatch has to be called within each and handleSubmit needed to be
written as dispatch(...())

Instead, now, <AuthForm> uses a single useDispatch() hook and instead dispatches the passed "handleSubmit" from it instead.
This is a lot cleaner. 

So all in all, while I don't think "stepIndex" state deserves to be in the store, it enables a small readablity and consistency
boost across the various calls to <AuthForm />

*/

/*
<Prompt/>'s "when" prop should arguably check if auth.credentials === defaultCredentials (export from reducer?)
This should be the case for all application's <form>s where user is creating data e.g. registering, posting etc.
Something to ponder...

Also, check other websites and decide on an appropriate "message". Mine is currently winged.

I'm thinking a container component for each kind of <Prompt/> should be created.
Each container component could just be subscribed to the state it's interested in e.g. credentials, new post details etc.

*/
