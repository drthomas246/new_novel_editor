import { Button } from "@/components/common/Button";
import Link from "next/link";

export default function MyPage() {
  const user = {
    name: "田中太郎",
    bio: "ファンタジー作家。ドラゴンと冒険が好き。",
    avatarUrl: "/images/avatar.png",
    novelCount: 5,
    characterCount: 12,
    worldCount: 3,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* プロフィールセクション */}
      <div className="bg-white shadow rounded p-6 flex flex-col items-center text-center">
        <img
          src={user.avatarUrl}
          alt="avatar"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.bio}</p>
        <Link href="/mypage/settings">
          <Button className="mt-4">プロフィール編集</Button>
        </Link>
      </div>

      {/* 管理リンクセクション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/mypage/novels"
          className="bg-white shadow rounded p-4 flex flex-col items-center hover:bg-gray-50"
        >
          <div className="text-3xl">📚</div>
          <h2 className="text-lg font-semibold">小説管理</h2>
          <p className="text-gray-500">{user.novelCount}件</p>
        </Link>

        <Link
          href="/mypage/characters"
          className="bg-white shadow rounded p-4 flex flex-col items-center hover:bg-gray-50"
        >
          <div className="text-3xl">🧑‍🤝‍🧑</div>
          <h2 className="text-lg font-semibold">キャラクター管理</h2>
          <p className="text-gray-500">{user.characterCount}件</p>
        </Link>

        <Link
          href="/mypage/worlds"
          className="bg-white shadow rounded p-4 flex flex-col items-center hover:bg-gray-50"
        >
          <div className="text-3xl">🌍</div>
          <h2 className="text-lg font-semibold">世界観管理</h2>
          <p className="text-gray-500">{user.worldCount}件</p>
        </Link>
      </div>

      {/* 設定・ログアウト */}
      <div className="bg-white shadow rounded p-4 flex justify-between items-center">
        <Link href="/mypage/settings">
          <Button>⚙️ 設定</Button>
        </Link>
        <Button className="bg-red-600 hover:bg-red-700">🚪 ログアウト</Button>
      </div>
    </div>
  );
}
