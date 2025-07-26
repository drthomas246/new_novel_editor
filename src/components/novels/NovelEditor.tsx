import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

export default function NovelEditor({ setCharCount }: NovelEditorProps) {
  const [editorReady, setEditorReady] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate({ editor }) {
      const plainText = editor.getText(); // 改行を含めたプレーンテキストを取得
      setCharCount(plainText.length);
    },
    immediatelyRender: false,
  });
  useEffect(() => {
    setEditorReady(true);
  }, []);

  if (!editor || !editorReady) {
    return null; // まだ描画しない
  }

  return (
    <div className="flex-1 p-2 flex flex-col">
      <h3 className="text-sm text-gray-500 mb-1">✍️ エディタ本文エリア</h3>
      <div className="border rounded bg-white flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-2">
          <EditorContent
            editor={editor}
            className="flex-1 h-full ProseMirror-wrapper editor-with-lines"
          />
        </div>
      </div>
    </div>
  );
}
