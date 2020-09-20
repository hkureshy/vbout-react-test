import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './Redux';

import { ApplicationContainer } from './Redux/Containers/ApplicationContainer';

import './Styles/styles.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ApplicationContainer />
  </Provider>,
  rootElement
);
