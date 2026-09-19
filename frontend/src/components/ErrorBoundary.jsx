import React from 'react';
import { Link } from 'react-router-dom';

// Catches any render crash in the whole app and shows a friendly
// recovery screen instead of a blank page. "Try again" resets the
// boundary; the Home link always works as an escape hatch.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Visible in devtools for debugging; never shown raw to users.
    console.error('Page crashed:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={styles.wrap}>
          <div style={styles.card}>
            <p style={styles.kicker}>Oops</p>
            <h2 style={styles.title}>Something went wrong</h2>
            <p style={styles.text}>
              This page hit an unexpected error. Your data is safe — try again or head home.
            </p>
            <div style={styles.actions}>
              <button
                type="button"
                style={styles.primary}
                onClick={() => this.setState({ error: null })}
              >
                Try again
              </button>
              <Link to="/" style={styles.ghost} onClick={() => this.setState({ error: null })}>
                Go to home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Inline styles on purpose: this must render even if the CSS
// bundle itself failed to load.
const styles = {
  wrap: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    fontFamily: 'system-ui, sans-serif',
  },
  card: {
    maxWidth: 460,
    textAlign: 'center',
    background: '#fffdf6',
    border: '1px solid #e2d2b2',
    borderRadius: 20,
    padding: '36px 32px',
  },
  kicker: {
    margin: 0,
    fontSize: 12,
    letterSpacing: 3,
    fontWeight: 800,
    color: '#c2521e',
  },
  title: { fontFamily: 'Georgia, serif', fontSize: 28, margin: '8px 0' },
  text: { color: '#7c6c55', fontSize: 15, lineHeight: 1.6 },
  actions: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' },
  primary: {
    background: '#c2521e',
    color: '#fff8ee',
    border: 'none',
    borderRadius: 11,
    padding: '11px 22px',
    fontWeight: 800,
    fontSize: 14,
    cursor: 'pointer',
  },
  ghost: {
    border: '1.5px solid #e2d2b2',
    color: '#241708',
    borderRadius: 11,
    padding: '11px 22px',
    fontWeight: 700,
    fontSize: 14,
    textDecoration: 'none',
  },
};
