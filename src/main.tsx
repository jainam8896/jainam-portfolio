import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Self-hosted variable fonts: no third-party request, no render-blocking CSS.
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './index.css';

import App from './App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root was not found in the document.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
