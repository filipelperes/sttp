import { memo, useCallback, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSearchSettingsStore } from '@/features/Settings/stores/settings';
import { SEARCH_ENGINES } from '@/features/Settings/types/Settings';
import type { IUserSearchEngine, IUserSearchEngineIcon } from '@/features/Settings/types/Settings';
import { upsertUserSearchEngine, removeUserSearchEngine } from '@/features/Settings/utils/searchEngineStorage';
import IconPicker from '@/features/Settings/components/IconPicker';
import type { IIconPickerValue } from '@/features/Settings/components/IconPicker';
import Icon from '@/components/Icon';
import { IoAdd, IoTrash, IoCreate } from 'react-icons/io5';

interface IFormState {
  isOpen: boolean;
  mode: 'add' | 'edit';
  editingKey: string | null;
  label: string;
  url: string;
  icon: IUserSearchEngineIcon;
}

const INITIAL_FORM: IFormState = {
  isOpen: false,
  mode: 'add',
  editingKey: null,
  label: '',
  url: '',
  icon: { type: 'emoji', value: '🔍' },
};

const SearchEngineSelector = memo(() => {
  const currentEngine = useSearchSettingsStore((s) => s.searchEngine);
  const setSearchEngine = useSearchSettingsStore((s) => s.setSearchEngine);
  const userEngines = useSearchSettingsStore(useShallow((s) => s.userSearchEngines));
  const setUserSearchEngines = useSearchSettingsStore((s) => s.setUserSearchEngines);
  const [form, setForm] = useState<IFormState>(INITIAL_FORM);

  const openAddForm = useCallback(() => {
    setForm({ isOpen: true, mode: 'add', editingKey: null, label: '', url: '', icon: { type: 'emoji', value: '🔍' } });
  }, []);

  const openEditForm = useCallback((key: string, engine: IUserSearchEngine) => {
    setForm({
      isOpen: true,
      mode: 'edit',
      editingKey: key,
      label: engine.label,
      url: engine.url,
      icon: engine.icon,
    });
  }, []);

  const closeForm = useCallback(() => {
    setForm(INITIAL_FORM);
  }, []);

  const handleRemove = useCallback(
    (key: string) => {
      const updated = removeUserSearchEngine(key, userEngines);
      // If the removed engine was selected, fall back to Google
      if (currentEngine === key) {
        setSearchEngine('google');
      }
      setUserSearchEngines(updated);
    },
    [userEngines, setUserSearchEngines, currentEngine, setSearchEngine],
  );

  const handleSave = useCallback(() => {
    const label = form.label.trim();
    const url = form.url.trim();
    const icon = form.icon;
    if (!label || !url) return;

    const key = label.toLowerCase().replace(/\s+/g, '_');

    // Validate key doesn't conflict
    if (form.mode === 'add' && userEngines[key]) return;
    if (form.mode === 'edit' && form.editingKey !== key && userEngines[key]) return;

    const engine: IUserSearchEngine = { id: key, label, url, icon };

    const current = { ...userEngines };
    // If editing and key changed, remove the old entry
    if (form.mode === 'edit' && form.editingKey && form.editingKey !== key) {
      delete current[form.editingKey];
    }

    const updated = upsertUserSearchEngine(key, engine, current);

    // If we were editing and the engine was selected, keep it selected with the new key
    if (form.mode === 'edit' && form.editingKey && currentEngine === form.editingKey && form.editingKey !== key) {
      setSearchEngine(key);
    }

    setUserSearchEngines(updated);
    closeForm();
  }, [form, userEngines, setUserSearchEngines, setSearchEngine, currentEngine, closeForm]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') closeForm();
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
    },
    [closeForm, handleSave],
  );

  const handleIconChange = useCallback(
    (iconValue: IIconPickerValue) => {
      setForm((f) => ({ ...f, icon: { type: iconValue.type, value: iconValue.value } }));
    },
    [],
  );

  const renderEngineIcon = (icon: IUserSearchEngineIcon, size: number = 20) => {
    if (icon.type === 'emoji') {
      return <span className="text-lg">{icon.value}</span>;
    }
    return (
      <Icon
        icon={{ icon: icon.value, type: 'img' }}
        width={size}
        height={size}
        size="1.2rem"
        alt=""
      />
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/80">Default search engine</p>
          <p className="text-xs text-foreground/40 mt-0.5">
            Used when typing non-service text in the command palette
          </p>
        </div>
      </div>

      {/* Built-in search engines */}
      <div className="grid grid-cols-1 gap-1.5">
        {SEARCH_ENGINES.map((engine) => (
          <button
            key={engine.id}
            onClick={() => setSearchEngine(engine.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-left transition-all cursor-pointer focus-ring ${
              currentEngine === engine.id
                ? 'bg-accent text-accent-foreground font-medium'
                : 'glass text-foreground/70 hover:text-foreground hover:bg-surface-hover'
            }`}
          >
            <engine.icon size="1.25rem" />
            <div>
              <span className="font-medium">{engine.label}</span>
              <span
                className={`block text-[11px] mt-0.5 ${currentEngine === engine.id ? 'text-accent-foreground/70' : 'text-foreground/40'}`}
              >
                {engine.url.replace('%s', '...')}
              </span>
            </div>
            {currentEngine === engine.id && (
              <span className="ml-auto text-sm">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* User-defined search engines */}
      {Object.keys(userEngines).length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-foreground/50 uppercase tracking-wider pt-2">
            Custom Search Engines
          </p>
          <div className="max-h-[200px] overflow-y-auto space-y-1 pr-1">
            {Object.entries(userEngines).map(([key, engine]) => (
              <div
                key={key}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm group transition-colors ${
                  currentEngine === key
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'glass text-foreground/70 hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center justify-center w-7 h-7 shrink-0">
                  {renderEngineIcon(engine.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium">{engine.label}</span>
                  <span
                    className={`block text-[11px] truncate ${
                      currentEngine === key ? 'text-accent-foreground/70' : 'text-foreground/40'
                    }`}
                  >
                    {engine.url.replace('%s', '...')}
                  </span>
                </div>
                {currentEngine === key ? (
                  <span className="ml-auto text-sm">✓</span>
                ) : (
                  <button
                    onClick={() => setSearchEngine(key)}
                    className="p-1.5 rounded-md text-foreground/30 opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer focus-ring"
                    aria-label={`Select ${engine.label}`}
                  >
                    ○
                  </button>
                )}
                <button
                  onClick={() => openEditForm(key, engine)}
                  className="p-1.5 rounded-md text-foreground/30 hover:text-foreground hover:bg-surface-hover opacity-0 group-hover:opacity-100 transition-all cursor-pointer focus-ring"
                  aria-label={`Edit ${engine.label}`}
                >
                  <IoCreate size={14} />
                </button>
                <button
                  onClick={() => handleRemove(key)}
                  className="p-1.5 rounded-md text-foreground/30 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer focus-ring"
                  aria-label={`Remove ${engine.label}`}
                >
                  <IoTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add button */}
      {!form.isOpen && (
        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg glass text-foreground/60 hover:text-foreground text-sm cursor-pointer transition-all hover:bg-surface-hover focus-ring"
        >
          <IoAdd size={16} />
          Add custom search engine
        </button>
      )}

      {/* Add/Edit form */}
      {form.isOpen && (
        <div className="p-4 rounded-xl glass animate-fade-in space-y-4" onKeyDown={handleKeyDown}>
          <h4 className="text-base font-semibold text-foreground">
            {form.mode === 'edit' ? 'Edit Search Engine' : 'Add Custom Search Engine'}
          </h4>

          <div className="space-y-1">
            <label className="text-xs text-foreground/50 uppercase tracking-wider">Label</label>
            <input
              value={form.label}
              onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              placeholder="e.g., My Search"
              className="w-full px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-foreground/50 uppercase tracking-wider">URL template</label>
            <input
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              placeholder="https://mysite.com/search?q=%s"
              className="w-full px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
            />
          </div>

          {/* Icon Picker */}
          <IconPicker
            value={{ type: form.icon.type, value: form.icon.value }}
            onChange={handleIconChange}
          />

          <div className="flex gap-2 pt-2">
            <button
              onClick={closeForm}
              className="flex-1 px-3 py-2 rounded-lg glass text-foreground/70 hover:text-foreground text-sm cursor-pointer transition-all focus-ring"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium cursor-pointer transition-all hover:opacity-90 focus-ring"
            >
              {form.mode === 'edit' ? 'Save Changes' : 'Add Engine'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

SearchEngineSelector.displayName = 'SearchEngineSelector';
export default SearchEngineSelector;
