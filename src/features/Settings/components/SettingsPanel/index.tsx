import { memo, useCallback, useState } from 'react';
import { IoClose, IoColorPaletteOutline, IoTimeOutline, IoCalendarOutline, IoGridOutline, IoRefresh } from 'react-icons/io5';
import ThemeToggle from '@/features/Settings/components/ThemeToggle';
import ClockSettings from '@/features/Settings/components/ClockSettings';
import DateSettings from '@/features/Settings/components/DateSettings';
import ServiceManager from '@/features/Settings/components/ServiceManager';
import GlassIntensityControl from '@/features/Settings/components/GlassIntensityControl';
import BackgroundDimControl from '@/features/Settings/components/BackgroundDimControl';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';

type TabId = 'appearance' | 'clock' | 'date' | 'services';

interface ITab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: ITab[] = [
  { id: 'appearance', label: 'Appearance', icon: <IoColorPaletteOutline size={18} /> },
  { id: 'clock', label: 'Clock', icon: <IoTimeOutline size={18} /> },
  { id: 'date', label: 'Date', icon: <IoCalendarOutline size={18} /> },
  { id: 'services', label: 'Services', icon: <IoGridOutline size={18} /> },
];

interface ISettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel = memo(({ onClose }: ISettingsPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('appearance');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const resetAll = useSettingsStore((s) => s.resetAll);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const handleReset = useCallback(() => {
    resetAll();
    setShowResetConfirm(false);
  }, [resetAll]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-lg mx-4 max-h-[85vh] overflow-hidden rounded-2xl glass-strong animate-scale-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="text-lg font-semibold text-foreground">Settings</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-foreground/40 hover:text-foreground hover:bg-surface-hover cursor-pointer transition-all focus-ring"
            aria-label="Close settings"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-4 overflow-x-auto shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap focus-ring ${
                activeTab === tab.id
                  ? 'border-accent text-accent font-medium'
                  : 'border-transparent text-foreground/50 hover:text-foreground/80'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">Theme</span>
                <ThemeToggle />
              </div>
              <GlassIntensityControl />
              <BackgroundDimControl />
            </div>
          )}
          {activeTab === 'clock' && (
            <div className="animate-fade-in">
              <ClockSettings />
            </div>
          )}
          {activeTab === 'date' && (
            <div className="animate-fade-in">
              <DateSettings />
            </div>
          )}
          {activeTab === 'services' && (
            <div className="animate-fade-in">
              <ServiceManager />
            </div>
          )}
        </div>

        {/* Footer with Reset */}
        <div className="border-t border-border px-6 py-3 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-foreground/30">
            All settings saved automatically
          </span>
          {showResetConfirm ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/60">Reset everything?</span>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium cursor-pointer transition-all hover:bg-red-500/30 focus-ring"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg glass text-xs text-foreground/60 hover:text-foreground cursor-pointer transition-all focus-ring"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs text-foreground/50 hover:text-foreground/80 hover:bg-red-500/10 cursor-pointer transition-all focus-ring"
            >
              <IoRefresh size={13} />
              Reset to defaults
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

SettingsPanel.displayName = 'SettingsPanel';
export default SettingsPanel;
