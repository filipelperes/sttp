import { memo, useCallback, useMemo } from 'react';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';
import ToggleSwitch from '@/features/Settings/components/ToggleSwitch';
import type { DateFormatStyle } from '@/features/Settings/types/Settings';

const FORMAT_OPTIONS: { value: DateFormatStyle; label: string; desc: string }[] = [
  { value: 'full', label: 'Full', desc: 'Monday, June 17, 2026' },
  { value: 'long', label: 'Long', desc: 'June 17, 2026' },
  { value: 'medium', label: 'Medium', desc: 'Jun 17, 2026' },
  { value: 'short', label: 'Short', desc: '6/17/26' },
];

const LOCALE_OPTIONS = [
  { value: 'pt-BR', label: 'Português (Brasil)', example: 'segunda-feira, 17 de junho de 2026' },
  { value: 'en-US', label: 'English (US)', example: 'Monday, June 17, 2026' },
  { value: 'en-GB', label: 'English (UK)', example: 'Monday, 17 June 2026' },
  { value: 'es', label: 'Español', example: 'lunes, 17 de junio de 2026' },
  { value: 'fr', label: 'Français', example: 'lundi 17 juin 2026' },
  { value: 'de', label: 'Deutsch', example: 'Montag, 17. Juni 2026' },
  { value: 'it', label: 'Italiano', example: 'lunedì 17 giugno 2026' },
  { value: 'ja', label: '日本語', example: '2026年6月17日月曜日' },
  { value: 'ko', label: '한국어', example: '2026년 6월 17일 월요일' },
  { value: 'zh-CN', label: '中文 (简体)', example: '2026年6月17日星期一' },
  { value: 'ru', label: 'Русский', example: 'понедельник, 17 июня 2026 г.' },
  { value: 'nl', label: 'Nederlands', example: 'maandag 17 juni 2026' },
];

const DateSettings = memo(() => {
  const date = useSettingsStore((s) => s.date);
  const updateDate = useSettingsStore((s) => s.updateDate);

  const setLocale = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateDate({ locale: e.target.value });
    },
    [updateDate],
  );

  const toggleDayOfWeek = useCallback(() => {
    updateDate({ showDayOfWeek: !date.showDayOfWeek });
  }, [date.showDayOfWeek, updateDate]);

  const toggleYear = useCallback(() => {
    updateDate({ showYear: !date.showYear });
  }, [date.showYear, updateDate]);

  const toggleCapitalize = useCallback(() => {
    updateDate({ capitalize: !date.capitalize });
  }, [date.capitalize, updateDate]);

  // Generate live preview
  const preview = useMemo(() => {
    const now = new Date();
    const opts: Intl.DateTimeFormatOptions = {
      weekday: date.showDayOfWeek ? 'long' : undefined,
      day: 'numeric',
      month: 'long',
      ...(date.showYear ? { year: 'numeric' } : {}),
    };
    if (date.formatStyle === 'short') {
      Object.assign(opts, { weekday: undefined, month: 'numeric', year: date.showYear ? '2-digit' : undefined });
    } else if (date.formatStyle === 'medium') {
      Object.assign(opts, { weekday: date.showDayOfWeek ? 'short' : undefined, month: 'short' });
    }
    let str = now.toLocaleDateString(date.locale, opts);
    if (date.capitalize && date.locale !== 'ja' && date.locale !== 'zh-CN' && date.locale !== 'ko') {
      str = str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  }, [date]);

  return (
    <div className="space-y-5">
      {/* Live Preview */}
      <div className="glass rounded-xl px-4 py-5 text-center">
        <p className="text-xs text-foreground/40 uppercase tracking-wider mb-2">Preview</p>
        <p className="text-base font-medium tracking-[0.05em] capitalize">
          {preview}
        </p>
      </div>

      <h3 className="text-lg font-semibold text-foreground">Date</h3>

      {/* Locale */}
      <div className="space-y-1.5">
        <label className="text-xs text-foreground/50 uppercase tracking-wider">Language / Region</label>
        <div className="relative">
          <select
            value={date.locale}
            onChange={setLocale}
            className="w-full px-3 py-2.5 rounded-lg glass text-foreground text-sm outline-none cursor-pointer focus-ring appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23d4d4d4' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '14px',
              paddingRight: '36px',
            }}
          >
            {LOCALE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-background text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-[11px] text-foreground/30 ml-1">
          {LOCALE_OPTIONS.find((o) => o.value === date.locale)?.example ?? ''}
        </p>
      </div>

      {/* Format Style */}
      <div className="space-y-1.5">
        <label className="text-xs text-foreground/50 uppercase tracking-wider">Format style</label>
        <div className="grid grid-cols-2 gap-1.5">
          {FORMAT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateDate({ formatStyle: opt.value })}
              className={`px-3 py-2 rounded-lg text-sm text-left transition-all cursor-pointer focus-ring ${
                date.formatStyle === opt.value
                  ? 'bg-accent text-accent-foreground'
                  : 'glass text-foreground/60 hover:text-foreground'
              }`}
            >
              <div className="font-medium">{opt.label}</div>
              <div className="text-[10px] opacity-60 mt-0.5">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Day of week */}
      <div className="flex items-center justify-between py-1">
        <div>
          <p className="text-sm text-foreground/90">Day of week</p>
          <p className="text-xs text-foreground/40 mt-0.5">Show weekday name in date</p>
        </div>
        <ToggleSwitch checked={date.showDayOfWeek} onChange={toggleDayOfWeek} />
      </div>

      {/* Show year */}
      <div className="flex items-center justify-between py-1">
        <div>
          <p className="text-sm text-foreground/90">Show year</p>
          <p className="text-xs text-foreground/40 mt-0.5">Display the year in date</p>
        </div>
        <ToggleSwitch checked={date.showYear} onChange={toggleYear} />
      </div>

      {/* Capitalize */}
      <div className="flex items-center justify-between py-1">
        <div>
          <p className="text-sm text-foreground/90">Capitalize first letter</p>
          <p className="text-xs text-foreground/40 mt-0.5">
            Uppercase the first character (e.g. &ldquo;Monday&rdquo;)
          </p>
        </div>
        <ToggleSwitch checked={date.capitalize} onChange={toggleCapitalize} />
      </div>
    </div>
  );
});

DateSettings.displayName = 'DateSettings';
export default DateSettings;
