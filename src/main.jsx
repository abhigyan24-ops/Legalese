
/**
 * main.jsx — Application entry point.
 * Mounts React root with AppContext provider + Router-aware App + Offline Service Worker.
 * Includes a top-level error boundary so any uncaught render error shows a visible
 * fallback page instead of a blank cream screen.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import App from './App';
import './index.css';
import './lib/offlineQueue'; // Auto-listeners for online write flush

// ─── Top-Level Error Boundary ─────────────────────────────────────────────────
class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[Rights Quest] Fatal render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#161226',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF8F0',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: '2rem',
          textAlign: 'center',
          gap: '1.5rem',
        }}>
          <div style={{ fontSize: '3rem' }}>⚖️</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFB84D' }}>
            Oops — Rights Quest hit a snag
          </h1>
          <p style={{ color: '#B8B0D6', maxWidth: '480px', lineHeight: 1.6 }}>
            Something went wrong while loading the app. This is usually a temporary issue.
            Try refreshing the page. If it keeps happening, please contact support.
          </p>
          <details style={{ color: '#B8B0D6', fontSize: '0.75rem', maxWidth: '600px', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer', color: '#FFB84D' }}>Technical details (for debugging)</summary>
            <pre style={{ marginTop: '0.5rem', overflowX: 'auto', background: '#231C3D', padding: '1rem', borderRadius: '8px' }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#FFB84D',
              color: '#161226',
              fontWeight: 800,
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            🔄 Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Service Worker ───────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Rights Quest PWA Service Worker registered:', reg.scope))
        .catch((err) => console.warn('Service Worker registration skipped:', err));
    });
  } else {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    });
  }
}

// ─── Mount ────────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </RootErrorBoundary>
  </React.StrictMode>
);
