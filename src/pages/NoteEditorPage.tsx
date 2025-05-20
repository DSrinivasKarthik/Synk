import { useParams, useNavigate } from 'react-router-dom'
import { NoteEditor } from '../components/NoteEditor'
import { useNoteStore } from '../lib/store'

export const NoteEditorPage = () => {
  const { noteId } = useParams<{ noteId: string }>()
  const navigate = useNavigate()
  const { notes } = useNoteStore()

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <NoteEditor noteId={noteId} />
      </div>
    </div>
  )
} 