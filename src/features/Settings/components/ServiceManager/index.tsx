import { memo, useCallback, useMemo, useState } from 'react';
import { getMergedServicesList } from '@/CommandPalette/utils/ServicesList/servicesStore';
import useServiceEditorStore from '@/features/Settings/stores/ServiceEditorStore';
import ServiceForm from '@/features/Settings/components/ServiceForm';
import Icon from '@/components/Icon';
import type { IService } from '@/types/Service';
import { IoAdd, IoTrash, IoCreate } from 'react-icons/io5';

const ServiceManager = memo(() => {
  const [search, setSearch] = useState('');
  const { isOpen, mode, openAdd, openEdit, remove } = useServiceEditorStore();
  const [removing, setRemoving] = useState<string | null>(null);

  const services = useMemo(() => getMergedServicesList(), []);

  const entries = Object.entries(services).filter(([key, svc]) =>
    key.toLowerCase().includes(search.toLowerCase()) ||
    svc.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleRemove = useCallback(
    async (key: string) => {
      setRemoving(key);
      const ok = await remove(key, services);
      setRemoving(null);
      if (!ok) {
        alert('Failed to remove service. Check console for details.');
      }
    },
    [remove, services],
  );

  const handleEdit = useCallback(
    (key: string, svc: IService) => {
      openEdit(key, svc);
    },
    [openEdit],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Services</h3>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-sm cursor-pointer transition-all hover:opacity-90 focus-ring"
        >
          <IoAdd size={16} />
          Add
        </button>
      </div>

      {/* Service Editor Form */}
      {isOpen && mode !== 'none' && (
        <div className="p-4 rounded-xl glass animate-fade-in">
          <ServiceForm services={services} />
        </div>
      )}

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search services..."
        className="w-full px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
      />

      {/* List */}
      <div className="max-h-[280px] overflow-y-auto space-y-1 pr-1">
        {entries.length === 0 && (
          <p className="text-sm text-foreground/40 text-center py-4">No services found.</p>
        )}
        {entries.map(([key, svc]) => (
          <div
            key={key}
            className="flex items-center gap-3 px-3 py-2 rounded-lg glass text-sm group hover:bg-surface-hover transition-colors"
          >
            <Icon icon={svc.icon} width={20} height={20} size="1.2rem" style={svc.style} />
            <span className="flex-1 text-foreground/80">{svc.name}</span>
            <code className="text-[10px] text-foreground/30 font-mono hidden sm:inline">{key}</code>
            <button
              onClick={() => handleEdit(key, svc)}
              className="p-1.5 rounded-md text-foreground/30 hover:text-foreground hover:bg-surface-hover opacity-0 group-hover:opacity-100 transition-all cursor-pointer focus-ring"
              aria-label={`Edit ${svc.name}`}
            >
              <IoCreate size={14} />
            </button>
            <button
              onClick={() => handleRemove(key)}
              disabled={removing === key}
              className="p-1.5 rounded-md text-foreground/30 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer focus-ring disabled:opacity-30"
              aria-label={`Remove ${svc.name}`}
            >
              <IoTrash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

ServiceManager.displayName = 'ServiceManager';
export default ServiceManager;
