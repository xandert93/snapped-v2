import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './state/store';
import { injectStore } from './api';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { App } from './App';

injectStore(store); // initialise `store` in API setup file

const history = createBrowserHistory({
  getUserConfirmation: (message, allowNav) => allowNav(window.confirm(message)),
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(<ChatApp />, document.getElementById('root'));
