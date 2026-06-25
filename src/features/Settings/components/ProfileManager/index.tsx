import { memo, useCallback, useRef, useState } from 'react';
import { IoAdd, IoTrashOutline, IoDownloadOutline, IoCloudUploadOutline, IoCheckmark, IoStar, IoStarOutline } from 'react-icons/io5';
import { getFullSettings, loadProfile } from '@/features/Settings/stores/settings';
import type { IProfile } from '@/features/Settings/types/Settings';
import { loadUserServices } from '@/features/Settings/utils/servicesStorage';
import {
  getAllProfiles,
  addProfile,
  deleteProfile,
  exportProfilesAsJSON,
  importProfilesFromJSON,
  getStartupProfileId,
  setStartupProfileId,
  FACTORY_PROFILE,
} from '@/features/Settings/utils/profileStorage';

const ProfileManager = memo(() => {
  const [profiles, setProfiles] = useState<IProfile[]>(getAllProfiles);
  const [startupId, setStartupId] = useState<string | null>(getStartupProfileId);
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [profileNameInput, setProfileNameInput] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSettings = getFullSettings;

  const refresh = useCallback(() => {
    setProfiles(getAllProfiles());
    setStartupId(getStartupProfileId());
  }, []);

  const handleSaveCurrent = useCallback(() => {
    const name = profileNameInput.trim();
    if (!name) return;
    const currentServices = loadUserServices();
    addProfile(name, currentSettings(), Object.keys(currentServices).length > 0 ? currentServices : undefined);
    setProfileNameInput('');
    setShowSaveInput(false);
    refresh();
  }, [profileNameInput, currentSettings, refresh]);

  const handleLoadProfile = useCallback(
    (profile: IProfile) => {
      loadProfile(profile.settings, profile.services);
    },
    [],
  );

  const handleDeleteProfile = useCallback(
    (id: string) => {
      deleteProfile(id);
      refresh();
    },
    [refresh],
  );

  const handleToggleStartup = useCallback(
    (id: string) => {
      if (startupId === id) {
        setStartupProfileId(null);
      } else {
        setStartupProfileId(id);
      }
      refresh();
    },
    [startupId, refresh],
  );

  const handleExport = useCallback(() => {
    const json = exportProfilesAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sttp-profiles-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleImport = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setImportError('');
      setImportSuccess(false);
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const text = ev.target?.result;
          if (typeof text !== 'string') throw new Error('Failed to read file');
          importProfilesFromJSON(text);
          refresh();
          setImportSuccess(true);
          setTimeout(() => setImportSuccess(false), 3000);
        } catch (err) {
          setImportError(err instanceof Error ? err.message : 'Invalid file format');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [refresh],
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-foreground/80">Settings Profiles</p>
        <p className="text-xs text-foreground/40 mt-0.5">
          Save, load, export and import complete settings profiles
        </p>
      </div>

      {/* Save current */}
      {showSaveInput ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={profileNameInput}
            onChange={(e) => setProfileNameInput(e.target.value)}
            placeholder="Profile name..."
            className="flex-1 px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveCurrent();
              if (e.key === 'Escape') setShowSaveInput(false);
            }}
          />
          <button
            onClick={handleSaveCurrent}
            className="px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium cursor-pointer transition-all hover:opacity-90 focus-ring"
          >
            <IoCheckmark size={16} />
          </button>
          <button
            onClick={() => setShowSaveInput(false)}
            className="px-3 py-2 rounded-lg glass text-sm text-foreground/60 hover:text-foreground cursor-pointer transition-all focus-ring"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSaveInput(true)}
          className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg glass text-foreground/60 hover:text-foreground text-sm cursor-pointer transition-all hover:bg-surface-hover focus-ring"
        >
          <IoAdd size={16} />
          Save current settings as profile
        </button>
      )}

      {/* Profile list */}
      <div className="space-y-1.5 max-h-64 overflow-y-auto">
        {profiles.map((profile) => {
          const isFactory = profile.id === FACTORY_PROFILE.id;
          const isStartup = startupId === profile.id;

          return (
            <div
              key={profile.id}
              className={`flex items-center justify-between px-3 py-2 rounded-lg group transition-colors ${
                isStartup ? 'glass ring-1 ring-accent/30' : 'glass hover:bg-surface-hover'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm text-foreground/90 truncate">{profile.name}</p>
                  {isFactory && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-foreground/40">
                      built-in
                    </span>
                  )}
                  {isStartup && (
                    <IoStar size={12} className="text-accent shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-foreground/30">
                  {isFactory ? 'Restore original defaults' : new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                {/* Set as startup default */}
                <button
                  onClick={() => handleToggleStartup(profile.id)}
                  className={`p-1.5 rounded-md cursor-pointer transition-all focus-ring ${
                    isStartup
                      ? 'text-accent hover:bg-accent/10'
                      : 'text-foreground/20 hover:text-foreground/50 hover:bg-surface-hover'
                  }`}
                  aria-label={isStartup ? 'Remove startup default' : 'Set as startup default'}
                  title={isStartup ? 'Startup default — click to remove' : 'Load on startup'}
                >
                  {isStartup ? <IoStar size={14} /> : <IoStarOutline size={14} />}
                </button>

                <button
                  onClick={() => handleLoadProfile(profile)}
                  className="px-2.5 py-1 rounded-md text-[11px] bg-accent/20 text-accent hover:bg-accent/30 cursor-pointer transition-all focus-ring font-medium"
                >
                  Load
                </button>

                {!isFactory && (
                  <button
                    onClick={() => handleDeleteProfile(profile.id)}
                    className="p-1.5 rounded-md text-foreground/30 hover:text-red-400 hover:bg-red-400/10 cursor-pointer transition-all focus-ring"
                    aria-label={`Delete ${profile.name}`}
                  >
                    <IoTrashOutline size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Import / Export */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-lg glass text-foreground/60 hover:text-foreground text-sm cursor-pointer transition-all hover:bg-surface-hover focus-ring"
        >
          <IoDownloadOutline size={16} />
          Export all
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-lg glass text-foreground/60 hover:text-foreground text-sm cursor-pointer transition-all hover:bg-surface-hover focus-ring"
        >
          <IoCloudUploadOutline size={16} />
          Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      {importError && <p className="text-xs text-red-400">{importError}</p>}
      {importSuccess && <p className="text-xs text-emerald-400">Profiles imported successfully</p>}

      <p className="text-[10px] text-foreground/20 leading-relaxed">
        Profiles store all settings, custom search engines, and custom services.
        Click the star icon to set a profile as your startup default.
        The factory default is always available and cannot be deleted.
      </p>
    </div>
  );
});

ProfileManager.displayName = 'ProfileManager';
export default ProfileManager;
