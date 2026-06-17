import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DateDisplay from './index';

describe('DateDisplay', () => {
  it('renders current date in Portuguese format', () => {
    render(<DateDisplay />);
    const today = new Date();
    const expected = today.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    // The component renders capitalized text; normalize for comparison
    const text = screen.getByText((content) =>
      content.toLowerCase().includes(today.getFullYear().toString()),
    );
    expect(text).toBeInTheDocument();
  });

  it('renders a time element with date attribute', () => {
    const { container } = render(<DateDisplay />);
    const timeEl = container.querySelector('time');
    expect(timeEl).toBeInTheDocument();
    expect(timeEl).toHaveAttribute('id', 'DateDisplay');
    expect(timeEl).toHaveAttribute('datetime');
  });

  it('contains weekday, day, month and year in text', () => {
    render(<DateDisplay />);
    const today = new Date();
    const yearStr = today.getFullYear().toString();
    const dayStr = today.getDate().toString();
    expect(screen.getByText(new RegExp(yearStr))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`\\b${dayStr}\\b`))).toBeInTheDocument();
  });
});
