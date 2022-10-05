// REACT
import React from 'react';

// REACT DOM
import ReactDOM from 'react-dom/client';

// STYLESHEET
import './styles/index.css';

// COMPONENT
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
