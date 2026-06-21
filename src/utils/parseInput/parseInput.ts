import { getMergedServicesList } from '@/CommandPalette/utils/ServicesList/servicesStore';
import { z } from 'zod';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';

const localhostValues = ['127.0.0.1', '127::1', '::1', '127...1', '127..1', '..1'];

const isIPAddress = (value: string): boolean =>
  localhostValues.includes(value) ||
  value.includes('localhost') ||
  z.string().ip().safeParse(value).success;

const isStrictURL = (value: string): boolean =>
  z.string().url().safeParse(value).success;

const isPartialURL = (value: string): boolean =>
  /^(?!.*\s)[^\s]+\.[a-zA-Z]{2,}/.test(value) ||
  value.startsWith('http') ||
  value.startsWith('www.');

export const parseInput = (value: string): IParsedInput => {
  const all = Object.entries(getMergedServicesList());
  const isEmpty = value.length === 0;
  const service = all.find(([, { name }]) =>
    value.toLowerCase().match(name.toLowerCase()),
  );
  const filtered = all.filter(([, { name }]) =>
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
      suggestions: isEmpty ? all : filtered,
    },
    services: {
      matched: service !== undefined,
      service,
      filtered,
    },
  };
};
