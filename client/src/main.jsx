import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { installClientMonitoring } from './utils/clientMonitoring.js';

// --- INÍCIO: SILENCIAR CONSOLA EM PRODUÇÃO ---
if (import.meta.env.PROD) {
  // Silencia os logs normais para visitantes
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
  console.warn = () => {};
  
  // Intercetar erros a vermelho e enviá-los para a API
  console.error = (...args) => {
    try {
      const errorMessage = args.map(arg => 
        typeof arg === 'object' && arg instanceof Error ? arg.message : String(arg)
      ).join(' ');

      // Envia silenciosamente para o backend
      fetch('/api/system/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: errorMessage, 
          url: window.location.href,
          data: new Date().toISOString()
        })
      }).catch(() => {});
    } catch (e) {
      // Falhanço silencioso
    }
  };

  // Impedir que excepções não tratadas cheguem à consola do navegador
  window.addEventListener('error', (event) => {
    event.preventDefault();
  });
}
// --- FIM: SILENCIAR CONSOLA ---

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

installClientMonitoring();
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const appTree = <App />;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {googleClientId ? (
      <GoogleOAuthProvider clientId={googleClientId}>{appTree}</GoogleOAuthProvider>
    ) : appTree}
  </React.StrictMode>,
)