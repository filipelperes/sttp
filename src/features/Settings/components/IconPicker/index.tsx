import { memo, useCallback, useRef, useState } from 'react';

export type IconPickerMode = 'emoji' | 'url' | 'upload';

export interface IIconPickerValue {
  type: 'emoji' | 'img';
  value: string;
}

interface IIconPickerProps {
  value: IIconPickerValue;
  onChange: (value: IIconPickerValue) => void;
}

const MODES: { key: IconPickerMode; label: string }[] = [
  { key: 'emoji', label: 'Emoji' },
  { key: 'url', label: 'URL' },
  { key: 'upload', label: 'Upload' },
];

const IconPicker = memo(({ value, onChange }: IIconPickerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewError, setPreviewError] = useState(false);
  const [mode, setMode] = useState<IconPickerMode>(
    value.type === 'img' && value.value.startsWith('data:') ? 'upload' : value.type === 'img' ? 'url' : 'emoji',
  );

  const handleModeChange = useCallback(
    (newMode: IconPickerMode) => {
      setMode(newMode);
      setPreviewError(false);

      if (newMode === 'emoji') {
        onChange({ type: 'emoji', value: '🔗' });
      } else if (newMode === 'url') {
        onChange({ type: 'img', value: '' });
      } else {
        onChange({ type: 'img', value: '' });
      }
    },
    [onChange],
  );

  const handleEmojiChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ type: 'emoji', value: e.target.value });
    },
    [onChange],
  );

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ type: 'img', value: e.target.value });
    },
    [onChange],
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setPreviewError(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onChange({ type: 'img', value: dataUrl });
        setPreviewError(false);
      };
      reader.onerror = () => {
        setPreviewError(true);
      };
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  return (
    <div className="space-y-3">
      <label className="text-xs text-foreground/50 uppercase tracking-wider">Icon</label>

      {/* Mode selector tabs */}
      <div className="flex gap-1 rounded-lg bg-surface-hover p-0.5">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => handleModeChange(m.key)}
            className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer focus-ring ${
              mode === m.key
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Preview */}
      {value.value && (
        <div className="flex items-center gap-3 p-2 rounded-lg glass">
          <div className="w-9 h-9 flex items-center justify-center rounded-md bg-black/20 overflow-hidden shrink-0">
            {value.type === 'emoji' ? (
              <span className="text-xl leading-none">{value.value}</span>
            ) : (
              <img
                src={value.value}
                alt="Icon preview"
                className="w-full h-full object-contain"
                onError={() => setPreviewError(true)}
              />
            )}
          </div>
          <span className="text-xs text-foreground/40 truncate flex-1">
            {value.type === 'emoji'
              ? `Emoji: ${value.value}`
              : value.value.startsWith('data:')
                ? 'Uploaded image'
                : value.value}
          </span>
          <button
            type="button"
            onClick={() => {
              if (mode === 'emoji') {
                onChange({ type: 'emoji', value: '🔗' });
              } else {
                onChange({ type: 'img', value: '' });
              }
              setPreviewError(false);
            }}
            className="p-1 rounded-md text-foreground/30 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer focus-ring"
            aria-label="Clear icon"
          >
            ✕
          </button>
        </div>
      )}

      {previewError && (
        <p className="text-xs text-red-400">Failed to load image. Try a different file or URL.</p>
      )}

      {/* Input by mode */}
      {mode === 'emoji' && (
        <input
          value={value.type === 'emoji' ? value.value : ''}
          onChange={handleEmojiChange}
          placeholder="🔍"
          className="w-full px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
        />
      )}

      {mode === 'url' && (
        <input
          value={value.type === 'img' && !value.value.startsWith('data:') ? value.value : ''}
          onChange={handleUrlChange}
          placeholder="https://example.com/icon.png"
          className="w-full px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
        />
      )}

      {mode === 'upload' && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={handleFileUpload}
            className="w-full text-sm text-foreground/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-accent file:text-accent-foreground file:text-sm file:font-medium file:cursor-pointer hover:file:opacity-90 cursor-pointer focus-ring"
          />
          <p className="text-[11px] text-foreground/30">
            PNG, JPG, WebP, SVG or GIF — transparent backgrounds work best
          </p>
        </div>
      )}
    </div>
  );
});

IconPicker.displayName = 'IconPicker';
export default IconPicker;
