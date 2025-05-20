import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

interface NoteStore {
  notes: Note[]
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Note
  updateNote: (id: string, content: string, title?: string) => void
  deleteNote: (id: string) => void
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => {
        const newNote: Note = {
          ...note,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          notes: [...state.notes, newNote],
        }))
        return newNote
      },
      updateNote: (id, content, title) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  content,
                  title: title ?? note.title,
                  updatedAt: new Date().toISOString(),
                }
              : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    {
      name: 'note-storage',
    }
  )
) 