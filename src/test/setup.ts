/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia — provide a stub so components
// that rely on it (e.g. Tips) don't crash.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
