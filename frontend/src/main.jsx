import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Enables / , /explore , /login , /dashboard … page routing */}
    <BrowserRouter>
      {/* Any render crash becomes a recovery screen, never a blank page */}
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

// Last-resort boot check: if the JS bundle itself failed to load,
// #root stays empty — show a message instead of a blank page.
setTimeout(() => {
  const root = document.getElementById('root');
  if (root && !root.hasChildNodes()) {
    root.innerHTML =
      '<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;' +
      'font-family:system-ui,sans-serif;color:#7c6c55;padding:24px;text-align:center;">' +
      '<div><p style="font-size:40px;margin:0">☕</p>' +
      '<p><b>Could not start the app.</b><br/>Please check your connection and refresh the page.</p></div></div>';
  }
}, 5000);
