import { memo, useEffect, useState, useMemo } from 'react';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';

/** Returns milliseconds until the next midnight */
const msUntilMidnight = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  return midnight.getTime() - now.getTime();
};

const DateDisplay = memo(() => {
  const dateSettings = useSettingsStore((s) => s.date);

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
      className="text-[1.3rem] tracking-[0.05em] opacity-70 mt-2 capitalize"
      dateTime={new Date().toISOString().slice(0, 10)}
    >
      {dateStr}
    </time>
  );
});

DateDisplay.displayName = 'DateDisplay';
export default DateDisplay;
