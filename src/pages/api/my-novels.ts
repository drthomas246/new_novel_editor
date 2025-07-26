import { NextApiRequest, NextApiResponse } from "next";

const mockMyNovels = [
  {
    id: "1",
    title: "勇者の冒険",
    summary: "異世界での壮大な物語",
    isPublic: true,
    updatedAt: "2024-06-01",
    authorName: "田中太郎",
  },
  {
    id: "2",
    title: "月夜の魔女",
    summary: "月にまつわる不思議な力",
    isPublic: false,
    updatedAt: "2024-05-20",
    authorName: "田中太郎",
  },
  {
    id: "3",
    title: "AIと僕",
    summary: "近未来の友情と成長",
    isPublic: true,
    updatedAt: "2024-05-10",
    authorName: "田中太郎",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(mockMyNovels);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
