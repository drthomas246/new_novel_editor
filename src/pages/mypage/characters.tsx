import { Button } from "@/components/common/Button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Character } from "@/types/character";

export default function MyCharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    axios
      .get<Character[]>("/api/my-characters")
      .then((res) => setCharacters(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("本当に削除しますか？")) {
      axios
        .delete(`/api/characters/${id}`)
        .then(() =>
          setCharacters((prev) => prev.filter((c) => c.id !== id))
        )
        .catch((err) => console.error(err));
    }
  };

  const handleDiagnose = (id: string) => {
    // ここでPersonality CheckBox UIをモーダル起動する処理を書く
    alert(`診断UI起動: キャラID ${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">キャラクター管理</h1>
        <Link href="/mypage/character/new">
          <Button>新規キャラクター追加</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((char: any) => (
          <div key={char.id} className="bg-white shadow rounded p-4 space-y-2">
            <img
              src={char.imageUrl}
              alt="character"
              className="w-full h-64 object-contain rounded"
            />
            <h2 className="text-lg font-semibold">{char.name}</h2>
            <p className="text-sm text-gray-600">性格: {char.personality}</p>
            <p className="text-sm text-gray-600">役職: {char.role}</p>
            <p className="text-xs text-gray-500">
              ステータス:{" "}
              {char.isPublic ? (
                <span className="text-green-600">公開</span>
              ) : (
                <span className="text-gray-500">非公開</span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href={`/characters/${char.id}/edit`}>
                <Button size="sm">編集</Button>
              </Link>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleDelete(char.id)}
              >
                削除
              </Button>
              <Link href={`/characters/${char.id}`}>
                <Button size="sm" className="bg-gray-600 hover:bg-gray-700">
                  詳細ページへ
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
