"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function AdvancedEditor({ value, onChange }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: { class: "outline-none" },
    },
  });

  if (!mounted || !editor) return <p>در حال بارگذاری ویرایشگر...</p>;

  return (
    <div className="border border-gray-300 rounded p-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1 border rounded"}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1 border rounded"}>I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1 border rounded"}>U</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1 border rounded"}>UL</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1 border rounded"}>OL</button>
        {["left","center","right","justify"].map(a => (
          <button key={a} onClick={() => editor.chain().focus().setTextAlign(a).run()} className={editor.isActive({textAlign: a}) ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1 border rounded"}>
            {a[0].toUpperCase()}
          </button>
        ))}
        <button onClick={() => {
          const url = prompt("لینک وارد کنید:");
          if(url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }} className="px-2 py-1 border rounded">🔗</button>
      </div>

      <EditorContent editor={editor} className="min-h-[150px] p-2 border rounded" />
    </div>
  );
}
