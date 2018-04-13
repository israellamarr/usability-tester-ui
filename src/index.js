// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import root from 'app/reducers';
import effects from 'app/effects';

import { applyMiddleware, compose, createStore } from 'redux';
import { effectsMiddleware } from 'redux-effex';
import { Provider } from 'react-redux';
import { persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import App from 'app/components/app';

let composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
let enhancers = composeEnhancers ( applyMiddleware(effectsMiddleware( effects )) );
let store = createStore( root, enhancers );
let persistor = persistStore( store );

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate persistor={ persistor }>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById( 'app-root' )
);

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
