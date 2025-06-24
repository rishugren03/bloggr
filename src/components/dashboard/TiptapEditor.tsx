'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  ImageIcon,
} from 'lucide-react'
import { useRef } from 'react'

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none p-4 min-h-[400px] bg-[#1e293b] rounded-b-md focus:outline-none',
      },
    },
  })
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !editor) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Image upload failed')
      }

      const { imageUrl } = await res.json()
      editor.chain().focus().setImage({ src: imageUrl }).run()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Image upload failed. Please try again.')
    }
  }
  
  const addImage = () => {
    fileInputRef.current?.click()
  }

  if (!editor) {
    return null
  }

  const buttonClasses = 'p-2 rounded-md hover:bg-slate-600 transition-colors duration-200'
  const activeClasses = 'bg-slate-700 text-white'

  return (
    <div className="border border-slate-700 rounded-md">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-800 border-b border-slate-700 rounded-t-md">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${buttonClasses} ${editor.isActive('bold') ? activeClasses : ''}`}
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${buttonClasses} ${editor.isActive('italic') ? activeClasses : ''}`}
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${buttonClasses} ${editor.isActive('strike') ? activeClasses : ''}`}
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`${buttonClasses} ${editor.isActive('code') ? activeClasses : ''}`}
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${buttonClasses} ${editor.isActive('heading', { level: 1 }) ? activeClasses : ''}`}
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${buttonClasses} ${editor.isActive('heading', { level: 2 }) ? activeClasses : ''}`}
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonClasses} ${editor.isActive('bulletList') ? activeClasses : ''}`}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonClasses} ${editor.isActive('orderedList') ? activeClasses : ''}`}
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${buttonClasses} ${editor.isActive('blockquote') ? activeClasses : ''}`}
        >
          <Quote className="w-5 h-5" />
        </button>
        <button type="button" onClick={addImage} className={buttonClasses}>
          <ImageIcon className="w-5 h-5" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapEditor
