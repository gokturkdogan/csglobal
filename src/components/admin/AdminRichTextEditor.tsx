"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState, type ReactNode } from "react";
import { contentForRichTextEditor, normalizeLinkUrl } from "@/lib/rich-text";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: ReactNode;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer rounded-md px-2.5 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-csg-blue text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

function EditorToolbar({
  editor,
  onLinkClick,
}: {
  editor: Editor;
  onLinkClick: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
      <ToolbarButton
        title="Kalın"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <span className="font-bold">B</span>
      </ToolbarButton>
      <ToolbarButton
        title="Madde işaretli liste"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • Liste
      </ToolbarButton>
      <ToolbarButton
        title="Numaralı liste"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. Liste
      </ToolbarButton>
      <ToolbarButton
        title="Bağlantı ekle"
        active={editor.isActive("link")}
        onClick={onLinkClick}
      >
        Bağlantı
      </ToolbarButton>
    </div>
  );
}

function LinkDialog({
  open,
  text,
  url,
  onTextChange,
  onUrlChange,
  onApply,
  onRemove,
  onClose,
  canRemove,
}: {
  open: boolean;
  text: string;
  url: string;
  onTextChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onApply: () => void;
  onRemove: () => void;
  onClose: () => void;
  canRemove: boolean;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-slate-900">Bağlantı ekle</h3>
        <p className="mt-1 text-sm text-slate-500">
          Görünen metin ve adres ayrı ayrı girilebilir.
        </p>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Görünen metin</span>
            <input
              type="text"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Örn. Resmi web sitesi"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">URL</span>
            <input
              type="url"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
          {canRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Bağlantıyı kaldır
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={onApply}
            disabled={!text.trim() || !url.trim()}
            className="cursor-pointer rounded-lg bg-csg-blue px-4 py-2 text-sm font-semibold text-white hover:bg-csg-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Uygula
          </button>
        </div>
      </div>
    </div>
  );
}

type AdminRichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function AdminRichTextEditor({
  value,
  onChange,
  placeholder = "İçerik yazın…",
}: AdminRichTextEditorProps) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [editingLink, setEditingLink] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: false,
        linkOnPaste: false,
        HTMLAttributes: {
          class: "text-csg-blue underline",
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: contentForRichTextEditor(value),
    editorProps: {
      attributes: {
        class:
          "admin-rich-text-editor min-h-[140px] px-3 py-2.5 text-sm text-slate-900 focus:outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const next = contentForRichTextEditor(value);
    const current = editor.getHTML();
    if (next !== current) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [editor, value]);

  const openLinkDialog = () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, "");
    const activeLink = editor.getAttributes("link").href as string | undefined;

    setLinkText(selectedText || "");
    setLinkUrl(activeLink || "");
    setEditingLink(Boolean(activeLink));
    setLinkOpen(true);
  };

  const applyLink = () => {
    if (!editor) return;

    const text = linkText.trim();
    const href = normalizeLinkUrl(linkUrl);
    if (!text || !href) return;

    if (editor.isActive("link")) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }

    editor.chain().focus().deleteSelection().insertContent({
      type: "text",
      text,
      marks: [{ type: "link", attrs: { href } }],
    }).run();

    setLinkOpen(false);
  };

  const removeLink = () => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkOpen(false);
  };

  if (!editor) {
    return (
      <div className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-400">
        Editör yükleniyor…
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
        <EditorToolbar editor={editor} onLinkClick={openLinkDialog} />
        <EditorContent editor={editor} />
      </div>

      <LinkDialog
        open={linkOpen}
        text={linkText}
        url={linkUrl}
        onTextChange={setLinkText}
        onUrlChange={setLinkUrl}
        onApply={applyLink}
        onRemove={removeLink}
        onClose={() => setLinkOpen(false)}
        canRemove={editingLink}
      />
    </>
  );
}
