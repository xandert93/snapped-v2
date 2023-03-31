import axios from 'axios';

import { selectAccessToken } from '../features/auth/state/auth-selectors';
import { reauthorise } from '../features/auth/state/auth-actions';
import { openDialog } from '../features/ui/state/ui-slice';

import { DIALOGS } from '../constants/modal-constants';

let dispatch, getState;
export const injectStore = (store) => ({ dispatch, getState } = store);

const log = (...args) => console.log('♨️ Express Server:', ...args);

const createAPI = (config) => {
  const api = axios.create({ ...config, withCredentials: true });

  // Attach access token to request headers:
  api.interceptors.request.use(async (reqConfig) => {
    const accessToken = selectAccessToken(getState());
    if (accessToken) reqConfig.headers.authorization = `Bearer ${accessToken}`;
    return reqConfig;
  });

  // Return data from success response (2xx)
  // Inspect error from failure response (non-2xx)
  api.interceptors.response.use(
    (res) => res.data,
    async (err) => {
      const reqConfig = err.response.config;
      const code = err.response.status;
      const statusText = err.response.statusText;
      const message = err.response.data;

      const { baseURL, url, method, _isRetried } = reqConfig;
      log(method.toUpperCase() + '❌ @ ' + baseURL + url);

      if (['/reauthenticate', '/reauthorise'].includes(url)) throw message; // don't retry these requests

      const isAccessTokenErr = code === 401 && !url.includes('/login') && !_isRetried;

      if (!isAccessTokenErr) {
        log('Request Error: ', message);
        throw message; // original request Promise rejects with the error message. Normal service in catch (message) block of original request!
      } else {
        log('AccessToken Error: ', message);

        reqConfig._isRetried = true;
        try {
          log('sending RefreshToken cookie to /auth/reauthorise...⌛');
          await dispatch(reauthorise()).unwrap(); // `unwrap` so we can handle RTK's serialised error below
          log('...reauthorised with new tokens! ✔️');

          return api(reqConfig); // retries initial request with new `accessToken`
        } catch (rtkErr) {
          log('RefreshToken Error: ', rtkErr.message);
          dispatch(openDialog(DIALOGS.SESSION_EXPIRED)); // not `throw`ing because I don't want to display error snackbar too. Instead, original Promise won't settle and remains `pending` (fine)
        }
      }
    }
  );

  return api;
};

export const api = createAPI({ baseURL: '/api' });
export const authAPI = createAPI({ baseURL: '/auth' });

/*
The `reauthorise` function:
Since reauthorise endpoint now called on AccessToken expiry AND on application start up, we have a reusable function for it.
Creating a similar function derived from `authAPI` would be tricky because:

1) importing that function here from 'auth-api' (which imports `authAPI` from here) would create a circular dependency.
2) accommodating for the request's failure in the error interceptor would require another conditional check in its fn body, cluttering it,

*/
