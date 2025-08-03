// sampleTreeData.ts
export const sampleTreeData: TreeNode[] = [
  {
    title: "小説：勇者の冒険",
    type: "novel",
    id: "novel-1",
    children: [
      { title: "第1章：旅立ち", type: "chapter", id: "chapter-1" },
      { title: "第2章：試練", type: "chapter", id: "chapter-2" },
    ],
  },
  {
    title: "キャラクター",
    id: "characters",
    children: [
      { title: "リリー（カリスマリーダー）", type: "character", id: "char-1" },
      { title: "カイン（影の参謀）", type: "character", id: "char-2" },
    ],
  },
  {
    title: "世界観",
    id: "worlds",
    children: [
      {
        title: "エルディア王国",
        subtitle: "ファンタジー",
        type: "world",
        id: "world-1",
      },
    ],
  },
];
