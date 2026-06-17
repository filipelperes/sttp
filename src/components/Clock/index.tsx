import { memo, useEffect, useState } from 'react';

const TIME_SEPARATOR = (key: number) => (
  <span key={`sep-${key}`} className="inline-flex mx-[7px] -top-[0.4rem] relative"> : </span>
);

const formatTime = (date: Date) => {
  const [hours, minutes, seconds] = date
    .toLocaleTimeString([], {
      hourCycle: 'h23',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    })
    .split(':');

  return [hours, minutes, seconds].flatMap((part, i, arr) =>
    i < arr.length - 1
      ? [<span key={`d-${i}`}>{part}</span>, TIME_SEPARATOR(i)]
      : [<span key={`d-${i}`}>{part}</span>]
  );
};

const Clock = memo(() => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <time
      id="Clock"
      className="relative top-0 transition-[top] duration-300 text-[5.5rem] font-bold tracking-[1.15px]"
    >
      {formatTime(time)}
    </time>
  );
});

Clock.displayName = 'Clock';
export default Clock;
