import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx';

const CHUNK_RELOAD_KEY = '@Noxvelia:chunk-reload';
const CHUNK_RELOAD_WINDOW_MS = 30000;

function getLastChunkReloadAt() {
  try {
    return Number(window.sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0);
  } catch {
    return 0;
  }
}

function markChunkReload() {
  try {
    window.sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
  } catch {
    // Ignore storage errors; reloading is still the best recovery path.
  }
}

function reloadOnStaleChunk(error) {
  const message = String(error?.message || error || '');
  const isStaleChunk =
    message.includes('error loading dynamically imported module') ||
    message.includes('Failed to fetch dynamically imported module') ||
    message.includes('Importing a module script failed') ||
    message.includes('Unable to preload CSS');

  if (!isStaleChunk || Date.now() - getLastChunkReloadAt() < CHUNK_RELOAD_WINDOW_MS) {
    return;
  }

  markChunkReload();
  window.location.reload();
}

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  reloadOnStaleChunk(event.payload);
});

window.addEventListener('unhandledrejection', (event) => {
  reloadOnStaleChunk(event.reason);
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
        <App />    
    </ThemeProvider>
  </React.StrictMode>,
)
