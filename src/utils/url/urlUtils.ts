import type { IService } from '@/types/Service';
import { getMergedServicesList } from '@/CommandPalette/utils/ServicesList/servicesStore';
import { parseInput } from '@/utils/parseInput/parseInput';
import { SEARCH_ENGINES } from '@/features/Settings/types/Settings';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';

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
  Object.entries(getMergedServicesList()).some(([, { name, url }]: [string, IService]) => {
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

  // Use the user's preferred search engine
  const { searchEngine: engineId, userSearchEngines } = useSettingsStore.getState();
  const engine = SEARCH_ENGINES.find((e) => e.id === engineId)
    ?? Object.values(userSearchEngines).find((e) => e.id === engineId)
    ?? SEARCH_ENGINES[0];
  const searchUrl = engine.url.replace('%s', encodeURIComponent(value));

  window.open(searchUrl, '_blank', 'noopener, noreferrer');
};
