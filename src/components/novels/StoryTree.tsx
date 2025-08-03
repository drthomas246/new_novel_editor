"use client";

import { Tree } from "react-arborist";

export default function StoryTree({
  sampleTreeData,
}: {
  sampleTreeData: TreeNode[];
}) {
  return (
    <div className="w-full h-full p-2 bg-white">
      <Tree
        initialData={sampleTreeData}
        openByDefault={true}
        indent={24}
        width={"100%"}
        rowHeight={36}
      >
        {({ node, style }) => (
          <div
            style={style}
            className={`flex flex-col justify-center px-2 ${
              node.isSelected ? "bg-blue-100" : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              {/* アイコンの切り替え */}
              {node.data.type === "novel" && <span>📖</span>}
              {node.data.type === "chapter" && <span>📑</span>}
              {node.data.type === "character" && <span>👤</span>}
              {node.data.type === "world" && <span>🌍</span>}
              {!node.data.type && <span>📂</span>}
              {/* タイトル */}
              <span className="font-medium">{node.data.title}</span>
            </div>
            {node.data.subtitle && (
              <span className="ml-6 text-xs text-gray-500">
                {node.data.subtitle}
              </span>
            )}
          </div>
        )}
      </Tree>
    </div>
  );
}
