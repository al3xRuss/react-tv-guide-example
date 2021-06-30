import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './helpers/store';
import 'regenerator-runtime/runtime'

// setup fake backend
import { configureFakeBackend } from './helpers/fake-backend';
configureFakeBackend();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);