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
    <div className="w-full h-[calc(100vh_-_64px)] flex flex-col p-4 gap-2">
      <div className="flex flex-1 overflow-hidden">
        <SidePanel />
        <div className="w-full">
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
          <NovelEditor setCharCount={setCharCount} />
        </div>
      </div>
      <FooterBar charCount={charCount} />
    </div>
  );
}
