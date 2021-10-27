import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import App from './components/App/App';
import { userStore } from "./features/mobx/stores/userStore";
import { BrowserRouter } from 'react-router-dom';

const stores = {
  userStore,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider {...stores}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
