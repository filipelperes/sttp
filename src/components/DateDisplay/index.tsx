import { memo, useEffect, useState, useMemo } from 'react';
import { useDateSettingsStore, useAccentSettingsStore } from '@/features/Settings/stores/settings';

/** Returns milliseconds until the next midnight */
const msUntilMidnight = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  return midnight.getTime() - now.getTime();
};

const DateDisplay = memo(() => {
  // Sub-store split: dateSettings só re-renderiza quando date muda;
  // accentOnDate só re-renderiza quando ESTE toggle muda.
  const dateSettings = useDateSettingsStore((s) => s.date);
  const accentOnDate = useAccentSettingsStore((s) => s.accentOnDate);

  const formatDate = (date: Date): string => {
    const opts: Intl.DateTimeFormatOptions = {};
    const isShort = dateSettings.formatStyle === 'short';
    const isMedium = dateSettings.formatStyle === 'medium';

    if (dateSettings.showDayOfWeek && !isShort) {
      opts.weekday = isMedium ? 'short' : 'long';
    }

    opts.day = 'numeric';

    if (isShort) {
      opts.month = 'numeric';
    } else if (isMedium) {
      opts.month = 'short';
    } else {
      opts.month = 'long';
    }

    if (dateSettings.showYear) {
      opts.year = isShort ? '2-digit' : 'numeric';
    }

    let str = date.toLocaleDateString(dateSettings.locale, opts);

    // Capitalize first letter if enabled (skip CJK locales)
    if (dateSettings.capitalize && !/^(ja|zh|ko)/.test(dateSettings.locale)) {
      str = str.charAt(0).toUpperCase() + str.slice(1);
    }

    return str;
  };

  const [tick, setTick] = useState(0);
  const dateStr = useMemo(() => formatDate(new Date()), [dateSettings, tick]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTick((t) => t + 1);
    }, msUntilMidnight());
    return () => clearTimeout(timer);
  }, [tick]);

  return (
    <time
      id="DateDisplay"
      className={`tracking-[0.05em] mt-1 sm:mt-2 capitalize px-2 text-center ${accentOnDate ? 'text-accent' : 'opacity-70'}`}
      dateTime={new Date().toISOString().slice(0, 10)}
      style={{ fontSize: `${dateSettings.fontSize}rem` }}
    >
      {dateStr}
    </time>
  );
});

DateDisplay.displayName = 'DateDisplay';
export default DateDisplay;