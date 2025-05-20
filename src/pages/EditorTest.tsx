import React, { useState } from 'react'
import NoteEditor from '@/components/Editor/NoteEditor'

const EditorTest: React.FC = () => {
  const [content, setContent] = useState('')

  const handleUpdate = (newContent: string) => {
    setContent(newContent)
    console.log('Editor content updated:', newContent)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editor Test Page</h1>
      <div className="border rounded-lg p-4">
        <NoteEditor
          content={content}
          onUpdate={handleUpdate}
          placeholder="Type something here..."
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Current Content:</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {content}
        </pre>
      </div>
    </div>
  )
}

export default EditorTest 