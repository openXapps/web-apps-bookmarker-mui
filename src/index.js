// https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
// import 'react-app-polyfill/ie11';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from './context/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);