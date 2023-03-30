import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import store from './redux/store';
import { Provider } from 'react-redux';
import toolkitStore from './toolkit/toolkitStore';
// import toolkitStore from './toolkit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={toolkitStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

