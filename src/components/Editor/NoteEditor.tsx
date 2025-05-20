import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

interface NoteEditorProps {
  content?: string
  onUpdate?: (content: string) => void
  placeholder?: string
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  content = '',
  onUpdate,
  placeholder = 'Start writing...'
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onUpdate?.(html)
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none">
      <EditorContent editor={editor} />
    </div>
  )
}

export default NoteEditor 