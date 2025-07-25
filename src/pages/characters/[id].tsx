import { CharacterRadarChart } from "@/components/characters/CharacterRadarChart";
import { useCharacter } from "@/hooks/useCharacter";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CharacterDetailPage() {
  const router = useRouter();
  const { id, userId } = router.query;
  const { character, setCharacter, chartData, saveCharacter } =
    useCharacter(id);

  if (!character) return <div className="text-center p-6">読み込み中...</div>;

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
          className="w-full h-64 object-contain rounded"
        />
        <h1 className="text-2xl font-bold">{character.name}</h1>
        <p className="text-gray-600">役職: {character.role}</p>
        <p className="text-gray-600">性格: {character.personality}</p>
        <p className="text-gray-600">人格の根幹: {character.corePersonality}</p>
        <p className="text-gray-600">行動理念: {character.actionPhilosophy}</p>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          性格診断チャート
        </h2>
        <div className="h-64">
          <CharacterRadarChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
