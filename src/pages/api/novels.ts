import { NextApiRequest, NextApiResponse } from "next";

const mockNovels = [
  {
    id: 1,
    title: "勇者の冒険",
    summary: "異世界での壮大な物語",
    authorName: "田中太郎",
  },
  {
    id: 2,
    title: "月夜の魔女",
    summary: "月にまつわる不思議な力",
    authorName: "山田花子",
  },
  {
    id: 3,
    title: "AIと僕",
    summary: "近未来の友情と成長",
    authorName: "佐藤次郎",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(mockNovels);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
