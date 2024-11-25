import '@backstage/cli/asset-types';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

// Post a message to the parent to say the app has loaded
window.top?.postMessage('backstage-loaded');
