import TitleInput from "@/components/common/TitleInput";
import FooterBar from "@/components/novels/ControlBar";
import NovelEditor from "@/components/novels/NovelEditor";
import SidePanel from "@/components/novels/SidePanel";
import { useState } from "react";

export default function EditorLayout() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [charCount, setCharCount] = useState(0);
  return (
    <div className="w-full h-screen flex flex-col p-4 gap-2">
      <TitleInput
        value={title}
        onChange={setTitle}
        size="title"
        placeholder="タイトルを入力"
      />
      <TitleInput
        value={subtitle}
        onChange={setSubtitle}
        placeholder="サブタイトルを入力"
        size="chapter"
      />
      <div className="flex flex-1 border rounded overflow-hidden">
        <SidePanel />
        <NovelEditor setCharCount={setCharCount} />
      </div>
      <FooterBar charCount={charCount} />
    </div>
  );
}
