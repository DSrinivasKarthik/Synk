import { useEffect } from 'react'
import RichTextEditor from './RichTextEditor'

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
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none">
      <RichTextEditor
        content={content}
        onUpdate={onUpdate}
        placeholder={placeholder}
      />
    </div>
  )
}

export default NoteEditor 