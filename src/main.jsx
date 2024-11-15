
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your main App component
import './index.scss';
import './styles/reset.css';
import './styles/app.scss';
// Create a root and render the App component into the root div
ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);