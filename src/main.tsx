import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './App.css';

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

// Why Did You Render — dev-only performance debugging.
// Must load BEFORE React renders to prevent hook ordering violations.
// Dynamic import keeps WDYR code-split in dev; tree-shaken in production.
if (import.meta.env.DEV) {
  Promise.all([
    import('@welldone-software/why-did-you-render'),
    import('react'),
  ]).then(([{ default: whyDidYouRender }, reactModule]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ReactRef = (reactModule as any).default ?? reactModule;
    whyDidYouRender(ReactRef, {
      trackAllPureComponents: false,
      collapseGroups: true,
      logOnDifferentValues: true,
      exclude: [/HandleCommandPalette/],
    });
    renderApp();
  });
} else {
  renderApp();
}
