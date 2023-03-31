import { authAPI } from '../../../api';

/*CORE*/
export const register = (credentials) => authAPI.post('/register', credentials);

export const login = (credentials) => authAPI.post('/login', credentials);
export const googleLogin = (idToken) => authAPI.post('/login/google', { idToken });
export const facebookLogin = (credentials) => authAPI.post('/login/facebook', credentials);

export const reauthorise = () => authAPI.get('/reauthorise');
export const reauthenticate = () => authAPI.get('/reauthenticate');

export const logout = () => authAPI.delete('/logout');

/*EXTRA*/
export const checkEmailOrUsername = (credentials) =>
  authAPI.post('/check-email-or-username', credentials);

export const activate = (credentials) => authAPI.patch('/activation/activate', credentials);

export const rerequestActivationEmail = () => authAPI.get('/activation/rerequest-email'); //protected endpoint (user must be logged in) that receives `userId` from `ensureAuth` middleware

// export const resetEmail = (email) =>  authAPI.patch('/activation/reset-email', { email });

export const requestPasswordReset = (email) =>
  authAPI.post('/password-reset/request-email', { email });

export const verifyPasswordResetCredentials = (credentials) =>
  authAPI.post('/password-reset/verify', credentials);

export const resetPassword = (credentials) => authAPI.patch('/password-reset/reset', credentials);
