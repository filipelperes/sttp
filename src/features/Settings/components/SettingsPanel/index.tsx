import { memo, useCallback, useState } from 'react';
import { useDragScroll } from '@/hooks/useDragScroll';
import { IoClose, IoColorPaletteOutline, IoTimeOutline, IoCalendarOutline, IoGridOutline, IoRefresh, IoSearch, IoColorFillOutline, IoBookmarkOutline, IoInformationCircleOutline } from 'react-icons/io5';
import ThemeToggle from '@/features/Settings/components/ThemeToggle';
import AccentColorPicker from '@/features/Settings/components/AccentColorPicker';
import AccentSettings from '@/features/Settings/components/AccentSettings';
import SearchEngineSelector from '@/features/Settings/components/SearchEngineSelector';
import ClockSettings from '@/features/Settings/components/ClockSettings';
import DateSettings from '@/features/Settings/components/DateSettings';
import ServiceManager from '@/features/Settings/components/ServiceManager';
import ProfileManager from '@/features/Settings/components/ProfileManager';
import GlassIntensityControl from '@/features/Settings/components/GlassIntensityControl';
import BackgroundDimControl from '@/features/Settings/components/BackgroundDimControl';
import { useAccentSettingsStore, resetAllSettings } from '@/features/Settings/stores/settings';
import useTourStore from '@/features/WelcomeTour/stores/tourStore';
import { resetTour } from '@/features/WelcomeTour/utils/tourStorage';

type TabId = 'appearance' | 'accent' | 'clock' | 'date' | 'search' | 'services' | 'profiles';

interface ITab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: ITab[] = [
  { id: 'appearance', label: 'Appearance', icon: <IoColorPaletteOutline size={18} /> },
  { id: 'accent', label: 'Accent', icon: <IoColorFillOutline size={18} /> },
  { id: 'clock', label: 'Clock', icon: <IoTimeOutline size={18} /> },
  { id: 'date', label: 'Date', icon: <IoCalendarOutline size={18} /> },
  { id: 'search', label: 'Search', icon: <IoSearch size={18} /> },
  { id: 'services', label: 'Services', icon: <IoGridOutline size={18} /> },
  { id: 'profiles', label: 'Profiles', icon: <IoBookmarkOutline size={18} /> },
];

interface ISettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel = memo(({ onClose }: ISettingsPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('appearance');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const accentOnTabs = useAccentSettingsStore((s) => s.accentOnTabs);
  const triggerTour = useTourStore((s) => s.triggerShow);

  const handleShowTour = useCallback(() => {
    resetTour(); // Clear "Don't show again" so the tour actually appears
    triggerTour();
    onClose();
  }, [triggerTour, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const handleReset = useCallback(() => {
    resetAllSettings();
    setShowResetConfirm(false);
  }, []);

  const drag = useDragScroll();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-lg mx-2 sm:mx-4 max-h-[90vh] sm:max-h-[85vh] overflow-hidden rounded-xl sm:rounded-2xl glass-strong animate-scale-in flex flex-col">
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

        {/* Tabs — reordered: Appearance, Clock, Date, Search, Services */}
        <div
          ref={drag.ref}
          className="flex border-b border-border px-2 sm:px-4 overflow-x-auto shrink-0 scrollbar-thin max-lg:[scrollbar-width:none] max-lg:[-ms-overflow-style:none] [&::-webkit-scrollbar]:max-lg:hidden"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-1.5 sm:gap-1.5 sm:px-3 py-2.5 text-[12px] sm:text-sm border-t-2 transition-all cursor-pointer whitespace-nowrap focus-ring ${
                activeTab === tab.id
                  ? `${accentOnTabs ? 'border-accent text-accent' : 'border-foreground/30 text-foreground/70'} font-medium`
                  : 'border-transparent text-foreground/50 hover:text-foreground/80'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">
          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">Theme</span>
                <ThemeToggle />
              </div>
              <AccentColorPicker />
              <GlassIntensityControl />
              <BackgroundDimControl />
            </div>
          )}
          {activeTab === 'accent' && (
            <div className="animate-fade-in">
              <AccentSettings />
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
          {activeTab === 'search' && (
            <div className="animate-fade-in">
              <SearchEngineSelector />
            </div>
          )}
          {activeTab === 'services' && (
            <div className="animate-fade-in">
              <ServiceManager />
            </div>
          )}
          {activeTab === 'profiles' && (
            <div className="animate-fade-in">
              <ProfileManager />
            </div>
          )}
        </div>

        {/* Footer with Reset and Tour */}
        <div className="border-t border-border px-6 py-3 flex items-center justify-between shrink-0">
          <button
            onClick={handleShowTour}
            className="flex items-center gap-1 text-[11px] text-foreground/30 hover:text-accent/70 cursor-pointer transition-all focus-ring"
          >
            <IoInformationCircleOutline size={13} />
            View tour
          </button>
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-accent-foreground font-medium bg-accent/80 hover:bg-accent cursor-pointer transition-all focus-ring"
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