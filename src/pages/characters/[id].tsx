import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

export default function CharacterDetailPage() {
  const router = useRouter();
  const { id, userId } = router.query;
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get("/api/my-characters")
        .then((res) => {
          const found = res.data.find((character) => character.id === id);
          if (found) setCharacter(found);
          else console.error("Character not found");
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!character) return <div className="text-center p-6">読み込み中...</div>;

  const chartData = [
    { subject: "勇気", value: 80 },
    { subject: "知性", value: 70 },
    { subject: "社交性", value: 60 },
    { subject: "感受性", value: 90 },
    { subject: "忍耐力", value: 75 },
  ]; // モック値（診断結果を後でAPI連携可）

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Link
        href={`/user/${userId}/characters`}
        className="text-blue-600 hover:underline"
      >
        ← 著者のキャラクター一覧に戻る
      </Link>

      <div className="bg-white shadow rounded p-4 space-y-4 text-center">
        <img
          src={character.imageUrl}
          alt="character"
          className="w-full h-64 object-cover rounded"
        />
        <h1 className="text-2xl font-bold">{character.name}</h1>
        <p className="text-gray-600">性格: {character.personality}</p>
        <p className="text-gray-600">役職: {character.role}</p>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          性格診断チャート
        </h2>
        <div className="h-64">
          <ResponsiveContainer>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="診断結果"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
