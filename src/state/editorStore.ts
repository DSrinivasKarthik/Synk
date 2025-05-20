import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface EditorState {
  currentNoteId: string | null
  setCurrentNoteId: (id: string | null) => void
}

export const useEditorStore = create<EditorState>()(
  devtools(
    (set) => ({
      currentNoteId: null,
      setCurrentNoteId: (id) => set({ currentNoteId: id }),
    }),
    {
      name: 'editor-store',
    }
  )
) 