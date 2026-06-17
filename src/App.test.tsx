import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing and contains Clock', () => {
    const { container } = render(<App />);
    const clock = container.querySelector('#Clock');
    expect(clock).toBeInTheDocument();
    expect(clock).toHaveTextContent(/\d/);
  });
});
