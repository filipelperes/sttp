import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Icon from './index';

describe('Icon', () => {
  it('renders fallback when icon is undefined', () => {
    const { container } = render(<Icon icon={undefined} />);
    expect(container.textContent).toBe('🧩');
  });

  it('renders fallback when icon is null/undefined', () => {
    const { container } = render(<Icon icon={undefined} />);
    expect(container.textContent).toBe('🧩');
  });

  it('renders img element for img type', () => {
    const icon = { icon: 'https://example.com/icon.png', type: 'img' as const };
    render(<Icon icon={icon} alt="Test Icon" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/icon.png');
    expect(img).toHaveAttribute('alt', 'Test Icon');
  });

  it('renders emoji text for emoji type', () => {
    const icon = { icon: '🔍', type: 'emoji' as const };
    render(<Icon icon={icon} alt="Search" />);
    const emoji = screen.getByRole('img', { name: 'Search' });
    expect(emoji).toBeInTheDocument();
    expect(emoji.textContent).toBe('🔍');
  });

  it('shows fallback on image error', () => {
    const icon = { icon: 'https://example.com/broken.png', type: 'img' as const };
    render(<Icon icon={icon} alt="Broken" />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('🧩')).toBeInTheDocument();
  });

  it('renders react-icons type correctly', () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;
    const icon = { icon: MockIcon, type: 'react-icons' as const };
    render(<Icon icon={icon} size="2rem" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('renders svgr type with width and height', () => {
    const MockSvg = (props: Record<string, unknown>) => <svg data-testid="svgr-icon" {...props} />;
    const icon = { icon: MockSvg, type: 'svgr' as const };
    render(<Icon icon={icon} width={48} height={48} />);
    const svg = screen.getByTestId('svgr-icon');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });

  it('applies fill prop to icon elements', () => {
    const MockIcon = (props: Record<string, unknown>) => <svg data-testid="fill-icon" {...props} />;
    const icon = { icon: MockIcon, type: 'react-icons' as const };
    render(<Icon icon={icon} fill="#ff0000" />);
    expect(screen.getByTestId('fill-icon')).toHaveAttribute('fill', '#ff0000');
  });

  it('uses currentColor as default fill', () => {
    const MockIcon = (props: Record<string, unknown>) => <svg data-testid="default-fill" {...props} />;
    const icon = { icon: MockIcon, type: 'react-icons' as const };
    render(<Icon icon={icon} />);
    expect(screen.getByTestId('default-fill')).toHaveAttribute('fill', 'currentColor');
  });
});
