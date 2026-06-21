import { memo, useEffect, useState } from 'react';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';

/** Renders a single time digit or separator */
const Digit = ({ children, sep, accent }: { children: string; sep?: boolean; accent?: boolean }) => (
  <>
    {sep ? (
      <span className={`inline-flex mx-[7px] -top-[0.4rem] relative ${accent ? 'text-accent' : 'opacity-40'}`}> : </span>
    ) : null}
    <span>{children}</span>
  </>
);

const Clock = memo(() => {
  const [time, setTime] = useState(() => new Date());
  const clockSettings = useSettingsStore((s) => s.clock);
  const paletteShow = useCommandPaletteStore((s) => s.Show);
  const accentOnClockSep = useSettingsStore((s) => s.accentOnClockSep);
  const accentOnClockText = useSettingsStore((s) => s.accentOnClockText);
  const isHidden = clockSettings.hideWhenTyping && paletteShow;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), clockSettings.showSeconds ? 1000 : 10000);
    return () => clearInterval(interval);
  }, [clockSettings.showSeconds]);

  const formatTime = (date: Date): React.ReactNode[] => {
    if (clockSettings.hourCycle === 'h12') {
      const h = date.getHours() % 12 || 12;
      const m = date.getMinutes().toString().padStart(2, '0');
      const s = clockSettings.showSeconds ? date.getSeconds().toString().padStart(2, '0') : null;
      const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
      const result: React.ReactNode[] = [
        <Digit key="h">{String(h)}</Digit>,
        <Digit key="m" sep accent={accentOnClockSep}>{m}</Digit>,
      ];
      if (s) result.push(<Digit key="s" sep accent={accentOnClockSep}>{s}</Digit>);
      result.push(
        <span key="ampm" className="text-[0.35em] align-top opacity-50 ml-1.5 -mr-1">{ampm}</span>,
      );
      return result;
    }

    const parts = date
      .toLocaleTimeString([], {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
        ...(clockSettings.showSeconds ? { second: '2-digit' } : {}),
      })
      .split(':');

    return parts.flatMap((part, i, arr) =>
      i < arr.length - 1
        ? [<Digit key={`d-${i}`}>{part}</Digit>, <Digit key={`sep-${i}`} sep accent={accentOnClockSep}>{''}</Digit>]
        : [<Digit key={`d-${i}`}>{part}</Digit>],
    );
  };

  return (
    <time
      id="Clock"
      className={`relative top-0 transition-[top,opacity] duration-300 font-bold tracking-[1.15px] max-sm:scale-75 max-sm:origin-center ${accentOnClockText ? 'text-accent' : ''}`}
      style={{
        fontSize: `${clockSettings.fontSize}rem`,
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? 'none' as const : undefined,
      }}
    >
      {formatTime(time)}
    </time>
  );
});

Clock.displayName = 'Clock';
export default Clock;
