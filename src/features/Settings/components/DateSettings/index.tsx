import { memo, useCallback, useMemo } from 'react';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';
import ToggleSwitch from '@/features/Settings/components/ToggleSwitch';
import LanguagePicker from '@/features/Settings/components/LanguagePicker';
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
        <LanguagePicker
          options={LOCALE_OPTIONS}
          value={date.locale}
          onChange={(v) => updateDate({ locale: v })}
        />
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

      {/* Font size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs text-foreground/50 uppercase tracking-wider">Font size</label>
          <span className="text-xs text-foreground/40 tabular-nums">{date.fontSize.toFixed(1)}rem</span>
        </div>
        <input
          type="range"
          min={0.5}
          max={3.0}
          step={0.1}
          value={date.fontSize}
          onChange={(e) => updateDate({ fontSize: parseFloat(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-surface-hover [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--slider-accent,var(--color-accent))] [&::-webkit-slider-thumb]:shadow-md"
          style={{ accentColor: 'var(--slider-accent, var(--color-accent))' } as React.CSSProperties}
        />
        <div className="flex justify-between text-[10px] text-foreground/20">
          <span>0.5</span>
          <span>3.0</span>
        </div>
      </div>
    </div>
  );
});

DateSettings.displayName = 'DateSettings';
export default DateSettings;
