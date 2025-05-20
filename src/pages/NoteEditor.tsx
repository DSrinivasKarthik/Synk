import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NoteEditor from '@/components/Editor/NoteEditor'
import { loadNote, saveNote, Note } from '@/lib/noteUtils'
import { useEditorStore } from '@/state/editorStore'
import { Button } from '@/components/ui/button'

const NoteEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [note, setNote] = useState<Note | null>(null)
  const currentNoteId = useEditorStore((state) => state.currentNoteId)

  useEffect(() => {
    if (id) {
      const loadedNote = loadNote(id)
      if (loadedNote) {
        setNote(loadedNote)
      } else {
        navigate('/')
      }
    }
  }, [id, navigate])

  const handleUpdate = (content: string) => {
    if (note) {
      const updatedNote = {
        ...note,
        content,
        updatedAt: Date.now(),
      }
      setNote(updatedNote)
      saveNote(updatedNote)
    }
  }

  if (!note) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-border py-3 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">{note.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Notes
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <NoteEditor
          content={note.content}
          onUpdate={handleUpdate}
          placeholder="Start writing..."
        />
      </div>
    </div>
  )
}

export default NoteEditorPage 