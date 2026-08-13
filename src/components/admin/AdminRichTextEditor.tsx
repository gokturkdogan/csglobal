"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { contentForRichTextEditor, linkUrlForEditor, normalizeLinkUrl } from "@/lib/rich-text";

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
        title="Bağlantı ekle veya düzenle"
        active={editor.isActive("link")}
        onClick={onLinkClick}
      >
        Bağlantı
      </ToolbarButton>
    </div>
  );
}

function LinkEditModal({
  open,
  text,
  url,
  isEditing,
  onTextChange,
  onUrlChange,
  onApply,
  onRemove,
  onClose,
}: {
  open: boolean;
  text: string;
  url: string;
  isEditing: boolean;
  onTextChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onApply: () => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rich-text-link-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="rich-text-link-modal-title"
          className="text-sm font-semibold text-slate-900"
        >
          {isEditing ? "Bağlantıyı düzenle" : "Bağlantı ekle"}
        </h2>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Görünen metin</span>
            <input
              type="text"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Örn. Resmi web sitesi"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-600">URL</span>
            <input
              type="text"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://... veya /rehber/..."
              className={inputClass}
            />
            <span className="mt-1 block text-xs text-slate-500">
              Dış site: tam adres (https://…). Site içi: yol (
              <code className="text-csg-blue">/asset/…</code>).
            </span>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={onRemove}
              className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Kaldır
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={onApply}
            disabled={!text.trim() || !url.trim()}
            className="cursor-pointer rounded-lg bg-csg-blue px-3 py-1.5 text-sm font-semibold text-white hover:bg-csg-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEditing ? "Kaydet" : "Ekle"}
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
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(false);

  const closeLinkModal = useCallback(() => {
    setLinkModalOpen(false);
    setLinkText("");
    setLinkUrl("");
    setEditingLink(false);
  }, []);

  const fillLinkFromEditor = useCallback((editor: Editor) => {
    const activeLink = editor.getAttributes("link").href as string | undefined;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, "");

    if (activeLink) {
      setEditingLink(true);
      setLinkUrl(linkUrlForEditor(activeLink));
      setLinkText(selectedText);
      return;
    }

    setEditingLink(false);
    setLinkUrl("");
    setLinkText(selectedText);
  }, []);

  const openLinkModal = useCallback(
    (editor: Editor) => {
      fillLinkFromEditor(editor);
      setLinkModalOpen(true);
    },
    [fillLinkFromEditor],
  );

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
          class: "text-csg-blue underline cursor-pointer",
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

  useEffect(() => {
    if (!editor) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor || !editor.view.dom.contains(anchor)) return;

      event.preventDefault();
      event.stopPropagation();

      const pos = editor.view.posAtDOM(anchor, 0);
      editor.chain().focus().setTextSelection(pos).extendMarkRange("link").run();
      openLinkModal(editor);
    };

    const dom = editor.view.dom;
    dom.addEventListener("click", handleClick, true);
    return () => dom.removeEventListener("click", handleClick, true);
  }, [editor, openLinkModal]);

  const applyLink = () => {
    if (!editor) return;

    const text = linkText.trim();
    const href = normalizeLinkUrl(linkUrl);
    if (!text || !href) return;

    if (editor.isActive("link")) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }

    const linkMark = { type: "link", attrs: { href } };
    const { empty } = editor.state.selection;

    if (empty) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text,
          marks: [linkMark],
        })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .deleteSelection()
        .insertContent({
          type: "text",
          text,
          marks: [linkMark],
        })
        .run();
    }

    closeLinkModal();
  };

  const removeLink = () => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeLinkModal();
  };

  if (!editor) {
    return (
      <div className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-400">
        Editör yükleniyor…
      </div>
    );
  }

  return (
    <div className="admin-rich-text-root overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
      <EditorToolbar
        editor={editor}
        onLinkClick={() => openLinkModal(editor)}
      />
      <EditorContent editor={editor} />
      <LinkEditModal
        open={linkModalOpen}
        text={linkText}
        url={linkUrl}
        isEditing={editingLink}
        onTextChange={setLinkText}
        onUrlChange={setLinkUrl}
        onApply={applyLink}
        onRemove={removeLink}
        onClose={closeLinkModal}
      />
    </div>
  );
}

type AdminRichTextFormFieldProps = {
  label: string;
  name: string;
  value?: string | null;
  hint?: string;
  placeholder?: string;
};

/** Form gönderimi için gizli input + zengin metin editörü (bağlantı alanı dahil). */
export function AdminRichTextFormField({
  label,
  name,
  value,
  hint,
  placeholder,
}: AdminRichTextFormFieldProps) {
  const [html, setHtml] = useState(() => contentForRichTextEditor(value ?? ""));

  return (
    <div className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input type="hidden" name={name} value={html} readOnly />
      <div className="mt-1.5">
        <AdminRichTextEditor
          value={html}
          onChange={setHtml}
          placeholder={placeholder}
        />
      </div>
      {hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}
    </div>
  );
}
