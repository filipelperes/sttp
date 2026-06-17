import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IServiceEditorStore, EditorMode } from "@/features/Settings/types/ServiceEditor";
import type { IService } from "@/types/Service";

const initialForm = () => ({
  key: '',
  name: '',
  url: { home: '' },
  icon: { icon: '', type: 'react-icons' as const },
  style: { backgroundColor: '#333333' },
});

const useServiceEditorStore = create<IServiceEditorStore>()(
  devtools(
    (set, get) => ({
      isOpen: false,
      mode: 'none' as EditorMode,
      editingKey: null,
      formData: initialForm(),

      openAdd: () => set({
        isOpen: true,
        mode: 'add',
        editingKey: null,
        formData: initialForm(),
      }),

      openEdit: (key, service) => set({
        isOpen: true,
        mode: 'edit',
        editingKey: key,
        formData: {
          key,
          name: service.name,
          url: { ...service.url },
          icon: {
            icon: typeof service.icon.icon === 'string' ? service.icon.icon : String(service.icon.icon?.name ?? ''),
            type: service.icon.type,
          },
          style: { ...service.style },
        },
      }),

      close: () => set({
        isOpen: false,
        mode: 'none',
        editingKey: null,
        formData: initialForm(),
      }),

      updateForm: (data) => set((state) => ({
        formData: { ...state.formData, ...data },
      })),

      save: async (currentServices) => {
        const { mode, editingKey, formData } = get();
        const key = formData.key?.trim().toLowerCase().replace(/\s+/g, '_');
        if (!key || !formData.name) return false;

        const newServices = { ...currentServices };

        if (mode === 'add') {
          if (newServices[key]) return false; // key exists
          newServices[key] = {
            name: formData.name,
            url: { home: formData.url?.home || '' },
            icon: { icon: formData.icon?.icon || '', type: 'react-icons' as const },
            style: {
              backgroundColor: formData.style?.backgroundColor || '#333333',
              ...(formData.style?.backgroundImage ? { backgroundImage: formData.style.backgroundImage } : {}),
              ...(formData.style?.color ? { color: formData.style.color } : {}),
            },
          } as IService;
        } else if (mode === 'edit' && editingKey) {
          if (editingKey !== key && newServices[key]) return false;
          if (editingKey !== key) {
            delete newServices[editingKey];
          }
          newServices[key] = {
            name: formData.name,
            url: { home: formData.url?.home || '' },
            icon: { icon: formData.icon?.icon || '', type: 'react-icons' as const },
            style: {
              backgroundColor: formData.style?.backgroundColor || '#333333',
              ...(formData.style?.backgroundImage ? { backgroundImage: formData.style.backgroundImage } : {}),
              ...(formData.style?.color ? { color: formData.style.color } : {}),
            },
          } as IService;
        }

        try {
          const response = await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ services: newServices }),
          });
          if (!response.ok) throw new Error('Failed to save');
          set({ isOpen: false, mode: 'none', editingKey: null, formData: initialForm() });
          return true;
        } catch (err) {
          console.error('Failed to save services:', err);
          return false;
        }
      },

      remove: async (key, currentServices) => {
        const newServices = { ...currentServices };
        delete newServices[key];

        try {
          const response = await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ services: newServices }),
          });
          if (!response.ok) throw new Error('Failed to remove');
          return true;
        } catch (err) {
          console.error('Failed to remove service:', err);
          return false;
        }
      },
    }),
    { name: 'ServiceEditorStore' },
  )
);

export default useServiceEditorStore;
