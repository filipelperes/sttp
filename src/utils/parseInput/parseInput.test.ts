import { describe, it, expect } from 'vitest';
import { parseInput } from './parseInput';
import { ServicesList } from '@/CommandPalette/utils/ServicesList';
import { getSortedServiceEntries } from '@/CommandPalette/utils/ServicesList/servicesStore';

describe('parseInput', () => {
  // --- isEmpty ---
  it('returns isEmpty=true for empty string', () => {
    const result = parseInput('');
    expect(result.isEmpty).toBe(true);
  });

  it('returns isEmpty=false for non-empty strings', () => {
    expect(parseInput('hello').isEmpty).toBe(false);
    expect(parseInput(' ').isEmpty).toBe(false);
    expect(parseInput('x').isEmpty).toBe(false);
  });

  it('returns all suggestions when value is empty', () => {
    const result = parseInput('');
    expect(result.suggestions.suggestions).toEqual(getSortedServiceEntries());
    expect(result.suggestions.matched).toBe(true);
  });

  // --- isIP ---
  it('detects valid IPv4 addresses', () => {
    expect(parseInput('127.0.0.1').isIP).toBe(true);
    expect(parseInput('192.168.1.1').isIP).toBe(true);
    expect(parseInput('10.0.0.1').isIP).toBe(true);
    expect(parseInput('172.16.0.1').isIP).toBe(true);
    expect(parseInput('8.8.8.8').isIP).toBe(true);
  });

  it('detects valid IPv6 addresses', () => {
    expect(parseInput('::1').isIP).toBe(true);
    expect(parseInput('2001:db8::1').isIP).toBe(true);
  });

  it('detects localhost variations as IP', () => {
    expect(parseInput('localhost').isIP).toBe(true);
    expect(parseInput('localhost:3000').isIP).toBe(true);
  });

  it('detects non-IP values', () => {
    expect(parseInput('not-an-ip').isIP).toBe(false);
    expect(parseInput('hello').isIP).toBe(false);
    expect(parseInput('github.com').isIP).toBe(false);
  });

  // --- isStrictURL ---
  it('detects https URLs', () => {
    expect(parseInput('https://google.com').isStrictURL).toBe(true);
    expect(parseInput('https://www.example.com/path').isStrictURL).toBe(true);
  });

  it('detects http URLs', () => {
    expect(parseInput('http://example.com').isStrictURL).toBe(true);
    expect(parseInput('http://localhost:3000/test').isStrictURL).toBe(true);
  });

  it('detects URLs with query parameters', () => {
    expect(parseInput('https://example.com/path?q=1&b=2').isStrictURL).toBe(true);
  });

  it('rejects non-URLs', () => {
    expect(parseInput('example').isStrictURL).toBe(false);
    expect(parseInput('just text').isStrictURL).toBe(false);
  });

  // --- isPartialURL ---
  it('detects domain.com as partial URL', () => {
    expect(parseInput('google.com').isPartialURL).toBe(true);
    expect(parseInput('www.example.com').isPartialURL).toBe(true);
    expect(parseInput('example.org').isPartialURL).toBe(true);
  });

  it('detects URLs starting with http/https as partial', () => {
    // Note: these are also strict URLs
    expect(parseInput('http://example.com').isPartialURL).toBe(true);
    expect(parseInput('https://example.com').isPartialURL).toBe(true);
  });

  it('detects www. prefix as partial URL', () => {
    expect(parseInput('www.github.com').isPartialURL).toBe(true);
  });

  it('rejects non-URL strings', () => {
    expect(parseInput('hello').isPartialURL).toBe(false);
    expect(parseInput('justwords').isPartialURL).toBe(false);
  });

  // --- slash / colon ---
  it('detects slash in value', () => {
    expect(parseInput('test/').slash).toBe(true);
    expect(parseInput('test/value').slash).toBe(true);
    expect(parseInput('/leading').slash).toBe(true);
    expect(parseInput('test').slash).toBe(false);
  });

  it('detects colon in value', () => {
    expect(parseInput('test:').colon).toBe(true);
    expect(parseInput('test:value').colon).toBe(true);
    expect(parseInput(':leading').colon).toBe(true);
    expect(parseInput('test').colon).toBe(false);
  });

  // --- suggestions ---
  it('filters suggestions by value', () => {
    const result = parseInput('git');
    expect(result.suggestions.matched).toBe(true);
    expect(result.suggestions.suggestions.some(([, s]) => s.name === 'GitHub')).toBe(true);
  });

  it('returns all suggestions when value matches nothing', () => {
    const result = parseInput('zzzxxxnonexistent');
    expect(result.suggestions.matched).toBe(false);
    expect(result.suggestions.suggestions).toEqual([]);
  });

  it('matches suggestions case-insensitively', () => {
    const result = parseInput('YOUTUBE');
    expect(result.suggestions.matched).toBe(true);
    expect(result.suggestions.suggestions.some(([, s]) => s.name === 'YouTube')).toBe(true);
  });

  it('returns suggestions with all properties intact', () => {
    const result = parseInput('Spotify');
    expect(result.suggestions.matched).toBe(true);
    const suggestion = result.suggestions.suggestions[0]?.[1];
    expect(suggestion).toBeDefined();
    expect(suggestion?.name).toBe('Spotify');
    expect(suggestion?.url.home).toBe('https://www.spotify.com');
    expect(suggestion?.icon.type).toBe('react-icons');
    expect(suggestion?.style.backgroundColor).toBe('#1db954');
  });

  // --- services ---
  it('matches service by exact name', () => {
    const result = parseInput('Reddit');
    expect(result.services.matched).toBe(true);
    expect(result.services.service?.[1].name).toBe('Reddit');
  });

  it('does not match service by partial name (full name required)', () => {
    const result = parseInput('You');
    expect(result.services.matched).toBe(false);
  });

  it('matches service when value contains full name', () => {
    const result = parseInput('YouTube search');
    expect(result.services.matched).toBe(true);
    expect(result.services.service?.[1].name).toBe('YouTube');
  });

  it('matches service case-insensitively', () => {
    const result = parseInput('discord');
    expect(result.services.matched).toBe(true);
    expect(result.services.service?.[1].name).toBe('Discord');
  });

  it('returns services.matched=false for unmatched value', () => {
    const result = parseInput('nonexistent12345');
    expect(result.services.matched).toBe(false);
    expect(result.services.service).toBeUndefined();
  });

  it('returns filtered services entries', () => {
    const result = parseInput('Git');
    expect(result.services.filtered.length).toBeGreaterThanOrEqual(1);
    expect(result.services.filtered.some(([, s]) => s.name === 'GitHub')).toBe(true);
  });

  // --- all ---
  it('returns all services as entries', () => {
    const result = parseInput('');
    expect(result.all).toEqual(Object.entries(ServicesList));
    expect(result.all.length).toBe(Object.entries(ServicesList).length);
  });

  it('all has same length regardless of value', () => {
    const empty = parseInput('');
    const filtered = parseInput('test');
    expect(empty.all.length).toBe(filtered.all.length);
  });

  // --- edge cases ---
  it('handles whitespace-only input', () => {
    const result = parseInput('   ');
    expect(result.isEmpty).toBe(false);
    expect(result.slash).toBe(false);
    expect(result.colon).toBe(false);
  });

  it('handles special characters', () => {
    expect(parseInput('!@#$%').isEmpty).toBe(false);
    expect(parseInput('').isEmpty).toBe(true);
  });

  it('handles numbers-only input', () => {
    const result = parseInput('12345');
    expect(result.isEmpty).toBe(false);
    expect(result.isIP).toBe(false); // not valid IP
    expect(result.isStrictURL).toBe(false);
  });

  it('handles input with mixed case service match', () => {
    const result = parseInput('NeTfLiX');
    expect(result.suggestions.matched).toBe(true);
    expect(result.suggestions.suggestions.some(([, s]) => s.name === 'Netflix')).toBe(true);
  });

  it('handles very long input without error', () => {
    const long = 'a'.repeat(10000);
    const result = parseInput(long);
    expect(result.isEmpty).toBe(false);
    expect(result.suggestions.matched).toBe(false);
  });

  it('does not match service by abbreviation (needs full name)', () => {
    const result = parseInput('g');
    expect(result.services.matched).toBe(false);
  });

  // --- Additional edge cases ---
  it('matches service when name is embedded in longer value', () => {
    const result = parseInput('search on YouTube please');
    expect(result.services.matched).toBe(true);
    expect(result.services.service?.[1].name).toBe('YouTube');
  });

  it('matches suggestions case-insensitively with partial input', () => {
    const result = parseInput('yout');
    expect(result.suggestions.matched).toBe(true);
    expect(result.suggestions.suggestions.some(([, s]) => s.name === 'YouTube')).toBe(true);
  });

  it('detects localhost variations', () => {
    expect(parseInput('localhost').isIP).toBe(true);
    expect(parseInput('localhost:8080').isIP).toBe(true);
    expect(parseInput('http://localhost:3000').isIP).toBe(true);
    expect(parseInput('https://localhost').isIP).toBe(true);
  });

  it('detects ipv6 variations', () => {
    expect(parseInput('2001:db8:3333:4444:5555:6666:7777:8888').isIP).toBe(true);
    expect(parseInput('::1234').isIP).toBe(true);
    expect(parseInput('2001:db8::').isIP).toBe(true);
  });

  it('handles domain with path correctly as partial URL', () => {
    expect(parseInput('example.com/path/to/page').isPartialURL).toBe(true);
    expect(parseInput('example.com?q=test').isPartialURL).toBe(true);
    expect(parseInput('example.com#section').isPartialURL).toBe(true);
  });

  it('detects ftp protocol as partial URL', () => {
    expect(parseInput('ftp://files.example.com').isPartialURL).toBe(true);
  });

  it('detects colon in URL protocol', () => {
    expect(parseInput('https://').colon).toBe(true);
    expect(parseInput('http://example.com').colon).toBe(true);
  });

  it('detects slash in URL path', () => {
    expect(parseInput('https://example.com/path').slash).toBe(true);
    expect(parseInput('path/to/file').slash).toBe(true);
  });

  it('handles newlines in input', () => {
    const result = parseInput('hello\nworld');
    expect(result.isEmpty).toBe(false);
    expect(result.slash).toBe(false);
    expect(result.colon).toBe(false);
  });

  it('handles unicode characters', () => {
    const result = parseInput('café');
    expect(result.isEmpty).toBe(false);
    expect(result.isStrictURL).toBe(false);
    expect(result.isPartialURL).toBe(false);
  });
});
