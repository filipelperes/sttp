import type { IService } from '@/types/Service';
import { ServicesList } from '@/CommandPalette/utils/ServicesList';
import { parseInput } from '@/utils/parseInput/parseInput';

const localhostValues = ['127.0.0.1', '127::1', '::1', '127...1', '127..1', '..1'];

export const handleIPSubmit = (
  isIP: boolean,
  isStrictURL: boolean,
  isPartialURL: boolean,
  value: string,
): void => {
  const match = localhostValues.find((ip) => value.includes(ip));
  const url = isStrictURL || (isIP && value.includes('localhost'))
    ? value
    : isPartialURL
      ? value.replace(/^(https?:\/\/)?(www\.)?/i, 'https://www.')
      : isIP && localhostValues.includes(value) && match
        ? value.replace(new RegExp(`^((?:[:.])?(${match}))`, 'i'), '127.0.0.1')
        : `https://${value}`;

  window.open(url, '_blank', 'noopener, noreferrer');
};

export const handleServiceSubmit = (value: string): boolean =>
  Object.entries(ServicesList).some(([, { name, url }]: [string, IService]) => {
    const pattern = new RegExp(`^${name}([:/]*)`, 'i');
    if (!pattern.test(value)) return false;

    window.open(
      new RegExp(`^${name}([:/]+)`, 'i').test(value) && url.query
        ? `${url.query}${value.replace(pattern, '')}`
        : url.home,
      '_blank',
      'noopener, noreferrer',
    );
    return true;
  });

export const handleSubmit = (
  event: { stopPropagation: () => void; preventDefault?: () => void },
  value: string,
): void => {
  const { isEmpty, isIP, isStrictURL, isPartialURL } = parseInput(value);
  event.stopPropagation();
  if (isEmpty) return;

  if (isIP || isStrictURL || isPartialURL) {
    handleIPSubmit(isIP, isStrictURL, isPartialURL, value);
    return;
  }

  if (handleServiceSubmit(value)) return;

  window.open(
    `https://google.com/search?q=${value}`,
    '_blank',
    'noopener, noreferrer',
  );
};
