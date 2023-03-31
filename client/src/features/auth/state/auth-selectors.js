export const selectisActivating = (state) => state.auth.isActivating;
export const selectIsAuthenticating = (state) => state.auth.isAuthenticating;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectKeepLoggedIn = (state) => state.auth.keepLoggedIn;

export const selectRegistrationStepIndex = (state) => state.auth.registration.stepIndex;
export const selectIsRegistrationDisabled = (state) => state.auth.registration.isDisabled;

export const selectRegistrationCredentials = (state) => state.auth.registration.credentials;
export const selectRegistrationCredential = (name) => (state) => {
  return state.auth.registration.credentials[name];
};

// Derived:
export const selectIsRegistering = (state) => state.auth.registration.stepIndex > 0;
