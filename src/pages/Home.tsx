import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { listNotes, createNote, Note } from '@/lib/noteUtils'
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/state/editorStore'
import { useNoteStore } from '../lib/store'
import { Plus } from 'lucide-react'

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const navigate = useNavigate()
  const setCurrentNoteId = useEditorStore((state) => state.setCurrentNoteId)
  const { notes: noteStoreNotes, addNote } = useNoteStore()

  useEffect(() => {
    setNotes(listNotes())
  }, [])

  const handleCreateNote = () => {
    const newNote = addNote({
      title: 'Untitled Note',
      content: '',
    })
    navigate(`/notes/${newNote.id}`)
  }

  const handleNoteClick = (noteId: string) => {
    setCurrentNoteId(noteId)
    navigate(`/note/${noteId}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Notes</h1>
        <button
          onClick={handleCreateNote}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {noteStoreNotes.map((note) => (
          <div
            key={note.id}
            onClick={() => navigate(`/notes/${note.id}`)}
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {note.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Last updated: {new Date(note.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {noteStoreNotes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No notes yet. Create your first note!
          </p>
        </div>
      )}
    </div>
  )
}

export default Home 