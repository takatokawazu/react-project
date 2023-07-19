import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToasterProvider from './providers/ToasterProvider';
import { AuthContextProvider } from './state/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToasterProvider />
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
