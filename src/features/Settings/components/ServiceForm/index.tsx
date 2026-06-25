import { memo, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import useServiceEditorStore from '@/features/Settings/stores/ServiceEditorStore';
import IconPicker from '@/features/Settings/components/IconPicker';
import type { IServicesList } from '@/types/Service';
import type { IIconPickerValue } from '@/features/Settings/components/IconPicker';

interface IServiceFormProps {
  services: IServicesList;
}

const ServiceForm = memo(({ services }: IServiceFormProps) => {
  const mode = useServiceEditorStore(s => s.mode);
  const formData = useServiceEditorStore(useShallow(s => s.formData));
  const updateForm = useServiceEditorStore(s => s.updateForm);
  const save = useServiceEditorStore(s => s.save);
  const close = useServiceEditorStore(s => s.close);
  const isEditing = mode === 'edit';

  const handleSave = useCallback(async () => {
    const ok = await save(services);
    if (ok) {
      // Saved successfully — the editor store closes itself
    }
  }, [save, services]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
    },
    [close, handleSave],
  );

  const handleIconChange = useCallback(
    (icon: IIconPickerValue) => {
      updateForm({ icon: { icon: icon.value, type: icon.type } });
    },
    [updateForm],
  );

  return (
    <div className="space-y-4" onKeyDown={handleKeyDown}>
      <h4 className="text-base font-semibold text-foreground">
        {isEditing ? 'Edit Service' : 'Add Service'}
      </h4>

      {/* Key / Identifier */}
      <div className="space-y-1">
        <label className="text-xs text-foreground/50 uppercase tracking-wider">Identifier (key)</label>
        <input
          value={formData.key || ''}
          onChange={(e) => updateForm({ key: e.target.value })}
          placeholder="e.g., my_service"
          className="w-full px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
        />
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className="text-xs text-foreground/50 uppercase tracking-wider">Display Name</label>
        <input
          value={formData.name || ''}
          onChange={(e) => updateForm({ name: e.target.value })}
          placeholder="e.g., My Service"
          className="w-full px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
        />
      </div>

      {/* URL */}
      <div className="space-y-1">
        <label className="text-xs text-foreground/50 uppercase tracking-wider">Home URL</label>
        <input
          value={formData.url?.home || ''}
          onChange={(e) => updateForm({ url: { ...formData.url, home: e.target.value } })}
          placeholder="https://example.com"
          className="w-full px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
        />
      </div>

      {/* Icon Picker */}
      <IconPicker
        value={{
          type: (formData.icon?.type === 'img' || formData.icon?.type === 'emoji' ? formData.icon.type : 'emoji') as 'emoji' | 'img',
          value: formData.icon?.icon || '',
        }}
        onChange={handleIconChange}
      />

      {/* Background Color */}
      <div className="space-y-1">
        <label className="text-xs text-foreground/50 uppercase tracking-wider">Background Color</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={formData.style?.backgroundColor || '#333333'}
            onChange={(e) => updateForm({ style: { ...formData.style, backgroundColor: e.target.value } })}
            className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5 bg-transparent"
          />
          <input
            value={formData.style?.backgroundColor || ''}
            onChange={(e) => updateForm({ style: { ...formData.style, backgroundColor: e.target.value } })}
            placeholder="#333333"
            className="flex-1 px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
          />
        </div>
      </div>

      {/* Text Color */}
      <div className="space-y-1">
        <label className="text-xs text-foreground/50 uppercase tracking-wider">Text Color (optional)</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={formData.style?.color || '#d4d4d4'}
            onChange={(e) => updateForm({ style: { ...formData.style, color: e.target.value } })}
            className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5 bg-transparent"
          />
          <input
            value={formData.style?.color || ''}
            onChange={(e) => updateForm({ style: { ...formData.style, color: e.target.value } })}
            placeholder="#d4d4d4 (leave empty for default)"
            className="flex-1 px-3 py-2 rounded-lg glass text-foreground text-sm outline-none focus-ring placeholder:text-foreground/30"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={close}
          className="flex-1 px-3 py-2 rounded-lg glass text-foreground/70 hover:text-foreground text-sm cursor-pointer transition-all focus-ring"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium cursor-pointer transition-all hover:opacity-90 focus-ring"
        >
          {isEditing ? 'Save Changes' : 'Add Service'}
        </button>
      </div>
    </div>
  );
});

ServiceForm.displayName = 'ServiceForm';
export default ServiceForm;
