"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import DashboardApp from '../components/DashboardApp';
import reducers from '../reducers/index';

const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <DashboardApp />
  </Provider>,
  document.getElementById('root')
);

