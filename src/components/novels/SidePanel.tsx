import StoryTree from "@/components/novels/StoryTree";
import { sampleTreeData } from "@/data/sampleTreeData";

const SidePanel = () => (
  <div className="w-1/4 p-2 border-r border-gray-300 text-sm">
    <h3 className="font-bold mb-2">🗂️ サイドパネル</h3>
    <div className=" h-[calc(100%-28px)]">
      <StoryTree sampleTreeData={sampleTreeData} />
    </div>
  </div>
);
export default SidePanel;
