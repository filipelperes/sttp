import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TextHighlight from './index';

describe('TextHighlight', () => {
  it('renders the full name when value is empty', () => {
    render(<TextHighlight name="GitHub" value="" />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('highlights matching portion of name', () => {
    render(<TextHighlight name="GitHub" value="Git" />);
    const highlighted = screen.getByText('Git');
    expect(highlighted).toBeInTheDocument();
    expect(highlighted.tagName).toBe('SPAN');
    expect(highlighted).toHaveStyle('font-weight: 800');
  });

  it('renders non-matching parts as plain text', () => {
    render(<TextHighlight name="GitHub" value="Git" />);
    expect(screen.getByText('Hub')).toBeInTheDocument();
  });

  it('is case insensitive - renders matched text as-is from original', () => {
    render(<TextHighlight name="YouTube" value="youtube" />);
    // The component renders the original text (YouTube), not the search value
    expect(screen.getByText('YouTube')).toBeInTheDocument();
  });

  it('applies custom highlight style', () => {
    render(
      <TextHighlight
        name="Spotify"
        value="Spot"
        highlightStyle={{ fontWeight: '700' }}
      />
    );
    const highlighted = screen.getByText('Spot');
    expect(highlighted).toHaveStyle({ fontWeight: '700' });
  });

  it('handles no match gracefully', () => {
    render(<TextHighlight name="GitHub" value="nonexistent" />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('handles empty name gracefully', () => {
    const { container } = render(<TextHighlight name="" value="test" />);
    expect(container.querySelector('p')).toBeEmptyDOMElement();
  });

  it('escapes special regex characters in value', () => {
    render(<TextHighlight name="Price (USD)" value="(USD)" />);
    const highlighted = screen.getByText('(USD)');
    expect(highlighted).toBeInTheDocument();
  });

  it('handles multiple matches in name', () => {
    render(<TextHighlight name="TestTest" value="Test" />);
    const highlights = screen.getAllByText('Test');
    expect(highlights.length).toBe(2);
  });
});
