import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IServiceEditorStore, EditorMode } from "@/features/Settings/types/ServiceEditor";
import type { IService } from "@/types/Service";
import { upsertUserService, removeUserService } from "@/features/Settings/utils/servicesStorage";

const initialForm = () => ({
  key: '',
  name: '',
  url: { home: '' },
  icon: { icon: '🔗', type: 'emoji' as const },
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

      openEdit: (key, service) => {
        let iconValue = '';
        let iconType: 'emoji' | 'img' | 'react-icons' | 'svgr' = 'emoji';

        if (typeof service.icon.icon === 'string') {
          iconValue = service.icon.icon;
          iconType = service.icon.type === 'svgr' || service.icon.type === 'react-icons'
            ? 'emoji'
            : service.icon.type;
        } else {
          iconValue = String(service.icon.icon?.name ?? '');
          iconType = 'emoji';
        }

        return set({
          isOpen: true,
          mode: 'edit',
          editingKey: key,
          formData: {
            key,
            name: service.name,
            url: { ...service.url },
            icon: { icon: iconValue, type: iconType },
            style: { ...service.style },
          },
        });
      },

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

        let newServices = { ...currentServices };

        const iconType = formData.icon?.type === 'img' || formData.icon?.type === 'emoji'
          ? formData.icon.type
          : 'emoji';

        if (mode === 'add') {
          if (newServices[key]) return false; // key exists
          newServices[key] = {
            name: formData.name,
            url: { home: formData.url?.home || '' },
            icon: { icon: formData.icon?.icon || '', type: iconType },
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
            icon: { icon: formData.icon?.icon || '', type: iconType },
            style: {
              backgroundColor: formData.style?.backgroundColor || '#333333',
              ...(formData.style?.backgroundImage ? { backgroundImage: formData.style.backgroundImage } : {}),
              ...(formData.style?.color ? { color: formData.style.color } : {}),
            },
          } as IService;
        }

        // Save to localStorage
        try {
          upsertUserService(key, newServices[key], currentServices);
          set({ isOpen: false, mode: 'none', editingKey: null, formData: initialForm() });
          return true;
        } catch (err) {
          console.error('Failed to save service:', err);
          return false;
        }
      },

      remove: async (key, currentServices) => {
        try {
          removeUserService(key, currentServices);
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
