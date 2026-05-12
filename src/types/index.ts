export type NoteColor = 
  | 'default' 
  | 'red' 
  | 'orange' 
  | 'yellow' 
  | 'green' 
  | 'teal' 
  | 'blue' 
  | 'darkblue' 
  | 'purple' 
  | 'pink' 
  | 'brown' 
  | 'gray';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export type Note = {
  id: string;
  title: string;
  content: string;
  checklist: ChecklistItem[];
  color: NoteColor;
  isArchived: boolean;
  isDeleted: boolean;
  isPinned: boolean;
  isChecklist: boolean;
  createdAt: number;
  updatedAt: number;
};

export type NoteStore = {
  notes: Note[];
  fetchNotes: () => Promise<void>;
  addNote: (note: Partial<Note>) => Promise<void>;
  updateNote: (id: string, note: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  archiveNote: (id: string) => void;
  pinNote: (id: string) => void;
  restoreNote: (id: string) => void;
};
