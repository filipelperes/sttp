import type { IService, IServicesList } from "@/types/Service";

export type EditorMode = 'none' | 'add' | 'edit';

export interface IServiceFormData {
  key?: string;
  name?: string;
  url?: { home?: string; query?: string };
  icon?: { icon?: string; type?: "svgr" | "react-icons" | "img" | "emoji" };
  style?: {
    backgroundColor?: string;
    backgroundImage?: string;
    color?: string;
  };
}

export interface IServiceEditorState {
  isOpen: boolean;
  mode: EditorMode;
  editingKey: string | null;
  formData: IServiceFormData;
}

export interface IServiceEditorActions {
  openAdd: () => void;
  openEdit: (key: string, service: IService) => void;
  close: () => void;
  updateForm: (data: Partial<IServiceFormData>) => void;
  save: (currentServices: IServicesList) => Promise<boolean>;
  remove: (key: string, currentServices: IServicesList) => Promise<boolean>;
}

export type IServiceEditorStore = IServiceEditorState & IServiceEditorActions;

export const DEFAULT_EDITOR_FORM: IServiceFormData = {
  key: '',
  name: '',
  url: { home: '' },
  icon: { icon: '🔗', type: 'emoji' },
  style: { backgroundColor: '#333333' },
};
