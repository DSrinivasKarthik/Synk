const STORAGE_PREFIX = 'note-'

export interface Note {
  id: string
  content: string
  title: string
  createdAt: number
  updatedAt: number
}

export const saveNote = (note: Note): void => {
  const key = `${STORAGE_PREFIX}${note.id}`
  localStorage.setItem(key, JSON.stringify(note))
}

export const loadNote = (id: string): Note | null => {
  const key = `${STORAGE_PREFIX}${id}`
  const data = localStorage.getItem(key)
  if (!data) return null
  return JSON.parse(data)
}

export const deleteNote = (id: string): void => {
  const key = `${STORAGE_PREFIX}${id}`
  localStorage.removeItem(key)
}

export const listNotes = (): Note[] => {
  const notes: Note[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(STORAGE_PREFIX)) {
      const data = localStorage.getItem(key)
      if (data) {
        notes.push(JSON.parse(data))
      }
    }
  }
  return notes.sort((a, b) => b.updatedAt - a.updatedAt)
}

export const createNote = (title: string = 'Untitled Note'): Note => {
  const now = Date.now()
  const note: Note = {
    id: crypto.randomUUID(),
    content: '',
    title,
    createdAt: now,
    updatedAt: now,
  }
  saveNote(note)
  return note
} 