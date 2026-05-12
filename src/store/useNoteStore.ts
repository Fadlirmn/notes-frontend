import { create } from 'zustand';
import type { NoteStore } from '../types';
import { api } from '../services/api';

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  
  fetchNotes: async () => {
    try {
      const response = await api.get('/notes');
      // Map backend 'note' to frontend 'content'
      const mappedNotes = response.data.map((n: any) => ({
        ...n,
        content: n.note,
        color: n.color === 'transparent' ? 'default' : n.color,
        isArchived: false,
        isDeleted: false,
        isPinned: false,
        isChecklist: false,
        checklist: [],
      }));
      set({ notes: mappedNotes });
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  },

  addNote: async (note) => {
    try {
      const response = await api.post('/notes', {
        title: note.title || '',
        note: note.content || '',
        color: note.color || 'default',
      });
      const newNote = {
        ...response.data,
        content: response.data.note,
        color: response.data.color === 'transparent' ? 'default' : response.data.color,
        isArchived: false,
        isDeleted: false,
        isPinned: note.isPinned || false,
        isChecklist: false,
        checklist: [],
      };
      set((state) => ({ notes: [newNote, ...state.notes] }));
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  },

  updateNote: async (id, updatedFields) => {
    try {
      const existingNote = get().notes.find(n => n.id === id);
      if (!existingNote) return;

      const mergedNote = { ...existingNote, ...updatedFields };
      
      await api.put(`/notes/${id}`, {
        title: mergedNote.title,
        note: mergedNote.content,
        color: mergedNote.color,
      });

      set((state) => ({
        notes: state.notes.map((n) =>
          n.id === id ? { ...n, ...updatedFields, updatedAt: Date.now() } : n
        ),
      }));
    } catch (err) {
      console.error('Failed to update note:', err);
    }
  },

  deleteNote: async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      set((state) => ({
        notes: state.notes.filter((n) => n.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  },

  archiveNote: (id) => {
    // Backend doesn't support archive yet, so we'll just toggle locally for now
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, isArchived: !n.isArchived } : n
      ),
    }));
  },

  pinNote: (id) => {
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, isPinned: !n.isPinned } : n
      ),
    }));
  },

  restoreNote: async (_id) => {
    // If it was "deleted" (soft delete not supported by backend yet, so we just re-fetch or ignore)
    await get().fetchNotes();
  },
}));
