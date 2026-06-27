import { getMergedServicesList, getSortedServiceEntries } from '@/CommandPalette/utils/ServicesList/servicesStore';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';

const localhostValues = ['127.0.0.1', '127::1', '::1', '127...1', '127..1', '..1'];

const isValidIPv4 = (v: string): boolean =>
  /^(\d{1,3}\.){3}\d{1,3}$/.test(v) && v.split('.').every(n => +n <= 255);

const isValidIPv6 = (v: string): boolean => {
  // Must contain ':' and only hex characters + colon
  if (!/^[0-9a-fA-F:]+$/.test(v)) return false;
  const parts = v.split(':');
  // Valid IPv6 has 3 to 8 parts (accounting for :: shorthand)
  return parts.length >= 3 && parts.length <= 8;
};

const isIPAddress = (value: string): boolean =>
  localhostValues.includes(value) ||
  value.includes('localhost') ||
  isValidIPv4(value) ||
  isValidIPv6(value);

const isStrictURL = (value: string): boolean => {
  try {
    const url = new URL(value);
    return ['http:', 'https:', 'ftp:', 'ftps:'].includes(url.protocol);
  } catch {
    return false;
  }
};

const isPartialURL = (value: string): boolean =>
  /^(?!.*\s)[^\s]+\.[a-zA-Z]{2,}/.test(value) ||
  value.startsWith('http') ||
  value.startsWith('www.');

/** Escape regex special characters in a string for safe use in `new RegExp()`. */
const escapeRegex = (s: string): string =>
  s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const parseInput = (value: string): IParsedInput => {
  const all = Object.entries(getMergedServicesList());
  const sorted = getSortedServiceEntries();
  const isEmpty = value.length === 0;
  const service = all.find(([, { name }]) =>
    new RegExp(`\\b${escapeRegex(name.toLowerCase())}\\b`).test(value.toLowerCase()),
  );
  const filtered = sorted.filter(([, { name }]) =>
    name.toLowerCase().includes(value.toLowerCase()),
  );

  return {
    isIP: isIPAddress(value),
    isStrictURL: isStrictURL(value),
    isPartialURL: isPartialURL(value),
    slash: value.includes('/'),
    colon: value.includes(':'),
    isEmpty,
    all,
    suggestions: {
      matched: filtered.length > 0,
      suggestions: isEmpty ? sorted : filtered,
    },
    services: {
      matched: service !== undefined,
      service,
      filtered,
    },
  };
};
