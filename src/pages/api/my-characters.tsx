import { NextApiRequest, NextApiResponse } from "next";

const mockMyCharacters = [
  {
    id: "1",
    name: "リリー",
    personality: "勇敢",
    role: "カリスマリーダー",
    isPublic: true,
    imageUrl: "/images/character1.png",
  },
  {
    id: "2",
    name: "カイン",
    personality: "冷静",
    role: "影の参謀",
    isPublic: false,
    imageUrl: "/images/character2.png",
  },
  {
    id: "3",
    name: "ミナ",
    personality: "純粋",
    role: "癒し手",
    isPublic: true,
    imageUrl: "/images/character3.png",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(mockMyCharacters);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
