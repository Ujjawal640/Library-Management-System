import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LibraryProvider } from './context/LibraryContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LibraryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LibraryProvider>
  </React.StrictMode>
);
