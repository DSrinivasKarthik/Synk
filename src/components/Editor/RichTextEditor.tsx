import React, { useCallback } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { cn } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Table as TableIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckSquare,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  Type,
  Palette,
  Minus,
  Plus,
} from 'lucide-react';

interface RichTextEditorProps {
  content?: string;
  onUpdate?: (content: string) => void;
  placeholder?: string;
}

const FONT_SIZES = [
  { label: 'Small', value: '0.875rem' },
  { label: 'Normal', value: '1rem' },
  { label: 'Large', value: '1.25rem' },
  { label: 'Larger', value: '1.5rem' },
  { label: 'Extra Large', value: '2rem' },
];

const COLORS = [
  { label: 'Default', value: 'inherit' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Yellow', value: '#eab308' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Pink', value: '#ec4899' },
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content = '',
  onUpdate,
  placeholder = 'Start writing...',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic',
          },
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 dark:text-blue-400 underline',
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdate?.(html);
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] px-4 py-2',
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  const setFontSize = useCallback((size: string) => {
    editor?.chain().focus().setMark('textStyle', { fontSize: size }).run();
  }, [editor]);

  const setColor = useCallback((color: string) => {
    editor?.chain().focus().setColor(color).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="relative">
      {/* Floating Menu for new blocks */}
      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex flex-col gap-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2"
        >
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('heading', { level: 1 }) && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Heading1 className="h-4 w-4" />
            Heading 1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('heading', { level: 2 }) && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Heading2 className="h-4 w-4" />
            Heading 2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('heading', { level: 3 }) && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Heading3 className="h-4 w-4" />
            Heading 3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('bulletList') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <List className="h-4 w-4" />
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('orderedList') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <ListOrdered className="h-4 w-4" />
            Numbered List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('taskList') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <CheckSquare className="h-4 w-4" />
            Task List
          </button>
        </FloatingMenu>
      )}

      {/* Bubble Menu for selected text */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('bold') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('italic') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('underline') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('highlight') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Highlighter className="h-4 w-4" />
          </button>
          <button
            onClick={setLink}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('link') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <LinkIcon className="h-4 w-4" />
          </button>
        </BubbleMenu>
      )}

      {/* Main Toolbar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex flex-wrap gap-1">
        <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <Redo className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('heading', { level: 1 }) && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('heading', { level: 2 }) && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('heading', { level: 3 }) && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Heading3 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('bold') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('italic') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('underline') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('highlight') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Highlighter className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive({ textAlign: 'left' }) && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive({ textAlign: 'center' }) && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive({ textAlign: 'right' }) && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <AlignRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('bulletList') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('orderedList') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('taskList') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <CheckSquare className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('blockquote') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('codeBlock') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <Code className="h-4 w-4" />
          </button>
          <button
            onClick={addTable}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <TableIcon className="h-4 w-4" />
          </button>
          <button
            onClick={addImage}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            onClick={setLink}
            className={cn(
              "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
              editor.isActive('link') && "bg-gray-100 dark:bg-gray-700"
            )}
          >
            <LinkIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <div className="relative group">
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <Type className="h-4 w-4" />
            </button>
            <div className="absolute hidden group-hover:block top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[120px]">
              {FONT_SIZES.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setFontSize(size.value)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative group">
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <Palette className="h-4 w-4" />
            </button>
            <div className="absolute hidden group-hover:block top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[120px]">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setColor(color.value)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-2"
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor; 