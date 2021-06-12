import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// using redux for state management following steps will be followed 

// 1. importing redux and react-redux packages 
import { createStore , combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

// 2. create user reducer function

// 3. combine multiple reducers

// 4. create redux store

const store = createStore( rootReducer ,  composeWithDevTools())

// 5. provide redux store to entire app



ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
