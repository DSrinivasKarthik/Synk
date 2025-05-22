import { useParams, useNavigate } from 'react-router-dom'
import RichTextEditor from '../components/Editor/RichTextEditor'
import { useNoteStore } from '../lib/store'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const NoteEditorPage = () => {
  const { noteId } = useParams<{ noteId: string }>()
  const navigate = useNavigate()
  const { notes, updateNote } = useNoteStore()

  if (!noteId) {
    navigate('/')
    return null
  }

  const note = notes.find((n) => n.id === noteId)

  if (!note) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={note.title}
            onChange={(e) => updateNote(noteId, note.content, e.target.value)}
            className="flex-1 text-2xl font-bold p-2 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:text-white"
            placeholder="Untitled Note"
          />
        </div>
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
          <RichTextEditor
            content={note.content}
            onUpdate={(content) => updateNote(noteId, content)}
            placeholder="Start writing..."
          />
        </div>
      </div>
    </div>
  )
} 