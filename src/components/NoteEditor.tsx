import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { useNoteStore, Note } from '../lib/store'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bold, Italic, List, ListOrdered, Quote } from 'lucide-react'

interface NoteEditorProps {
  noteId: string
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('bold') ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('italic') ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('bulletList') ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('orderedList') ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('blockquote') ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`}
      >
        <Quote className="h-4 w-4" />
      </button>
    </div>
  )
}

export const NoteEditor = ({ noteId }: NoteEditorProps) => {
  const navigate = useNavigate()
  const { notes, updateNote } = useNoteStore()
  const note = notes.find((n: Note) => n.id === noteId)

  const editor = useEditor({
    extensions: [StarterKit],
    content: note?.content || '',
    onUpdate: ({ editor }) => {
      updateNote(noteId, editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.content)
    }
  }, [editor, note])

  if (!note) {
    return <div>Note not found</div>
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
          <MenuBar editor={editor} />
          <div className="p-4">
            <EditorContent
              editor={editor}
              className="prose dark:prose-invert max-w-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 