import { describe, it, expect, vi } from 'vitest';
import { handleIPSubmit, handleServiceSubmit, handleSubmit } from './urlUtils';

describe('urlUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  describe('handleIPSubmit', () => {
    it('opens strict URL as-is (strict branch)', () => {
      handleIPSubmit(true, true, false, 'https://example.com');
      expect(window.open).toHaveBeenCalledWith(
        'https://example.com',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('passes value through when isStrictURL is true (not modified by partial branch)', () => {
      handleIPSubmit(true, true, true, 'example.com/path');
      expect(window.open).toHaveBeenCalledWith(
        'example.com/path',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('prepends https://www. for partial URLs (non-strict)', () => {
      handleIPSubmit(false, false, true, 'example.com');
      expect(window.open).toHaveBeenCalledWith(
        'https://www.example.com',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('converts non-URL, non-IP to https://', () => {
      handleIPSubmit(false, false, false, 'example');
      expect(window.open).toHaveBeenCalledWith(
        'https://example',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('opens localhost value as-is (localhost branch)', () => {
      handleIPSubmit(true, false, false, 'localhost:3000');
      expect(window.open).toHaveBeenCalledWith(
        'localhost:3000',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('prepends https:// for non-localhost IP (else branch)', () => {
      handleIPSubmit(true, false, false, '192.168.1.1');
      expect(window.open).toHaveBeenCalledWith(
        'https://192.168.1.1',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('opens 127.0.0.1 as-is', () => {
      handleIPSubmit(true, false, false, '127.0.0.1');
      expect(window.open).toHaveBeenCalledWith(
        '127.0.0.1',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('handles isIP=false, isStrictURL=false, isPartialURL=false for normal word', () => {
      handleIPSubmit(false, false, false, 'testword');
      expect(window.open).toHaveBeenCalledWith(
        'https://testword',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('strips http:// from partial URLs and replaces with https://www.', () => {
      handleIPSubmit(false, false, true, 'http://example.com');
      expect(window.open).toHaveBeenCalledWith(
        'https://www.example.com',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('strips https:// from partial URLs and replaces with https://www.', () => {
      handleIPSubmit(false, false, true, 'https://example.com');
      expect(window.open).toHaveBeenCalledWith(
        'https://www.example.com',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('handles www.example.com partial URL (no protocol change needed)', () => {
      handleIPSubmit(false, false, true, 'www.example.com');
      expect(window.open).toHaveBeenCalledWith(
        'https://www.example.com', // replaces www. with https://www. - same result
        '_blank',
        'noopener, noreferrer',
      );
    });
  });

  describe('handleServiceSubmit', () => {
    it('returns true and opens URL when service matches by name', () => {
      const result = handleServiceSubmit('Reddit');
      expect(result).toBe(true);
      expect(window.open).toHaveBeenCalledWith(
        'https://www.reddit.com',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('returns true and opens home URL when no query service defined', () => {
      const result = handleServiceSubmit('github/react');
      expect(result).toBe(true);
      expect(window.open).toHaveBeenCalledWith(
        'https://github.com',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('returns false for non-matching value', () => {
      const result = handleServiceSubmit('nonexistent12345');
      expect(result).toBe(false);
      expect(window.open).not.toHaveBeenCalled();
    });

    it('matches service case-insensitively', () => {
      const result = handleServiceSubmit('SPOTIFY');
      expect(result).toBe(true);
      expect(window.open).toHaveBeenCalledWith(
        'https://www.spotify.com',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('matches service name followed by colon or slash', () => {
      const result = handleServiceSubmit('youtube:searchterm');
      expect(result).toBe(true);
      expect(window.open).toHaveBeenCalledTimes(1);
    });

    it('does not match service by abbreviation (needs full name)', () => {
      const result = handleServiceSubmit('g');
      expect(result).toBe(false);
      expect(window.open).not.toHaveBeenCalled();
    });
  });

  describe('handleSubmit', () => {
    it('calls stopPropagation and does not open window for empty value', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, '');
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(window.open).not.toHaveBeenCalled();
    });

    it('opens URL for IP address', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, '192.168.1.1');
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(window.open).toHaveBeenCalledWith(
        'https://192.168.1.1',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('opens URL for strict URL', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, 'https://github.com');
      expect(window.open).toHaveBeenCalledWith(
        'https://github.com',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('opens service URL for matching service name', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, 'Reddit');
      expect(window.open).toHaveBeenCalledWith(
        'https://www.reddit.com',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('falls back to Google search for non-matching value', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, 'some random search');
      expect(window.open).toHaveBeenCalledWith(
        'https://google.com/search?q=some random search',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('calls stopPropagation before any action', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, 'test');
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('handles undefined preventDefault gracefully', () => {
      const event = { stopPropagation: vi.fn() };
      handleSubmit(event, 'test');
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(window.open).toHaveBeenCalled();
    });

    it('handles service with colon/slash query syntax', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, 'Reddit:searchterm');
      expect(window.open).toHaveBeenCalled();
    });

    it('falls back to google search for non-service text', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, 'how to code in react');
      expect(window.open).toHaveBeenCalledWith(
        'https://google.com/search?q=how to code in react',
        '_blank',
        'noopener, noreferrer',
      );
    });

    it('handles edge case of just a colon', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, ':');
      expect(window.open).toHaveBeenCalled();
    });

    it('handles edge case of just a slash', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, '/');
      expect(window.open).toHaveBeenCalled();
    });

    it('handles service with full URL as value', () => {
      const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
      handleSubmit(event, 'https://www.youtube.com/watch?v=test');
      expect(window.open).toHaveBeenCalledWith(
        'https://www.youtube.com/watch?v=test',
        '_blank',
        'noopener, noreferrer',
      );
    });
  });
});
