import { Button } from "@/components/common/Button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyNovelsPage() {
  const [novels, setNovels] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("/api/my-novels")
      .then((res: any) => setNovels(res.data))
      .catch((err: any) => console.error(err));
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("本当に削除しますか？")) {
      axios
        .delete(`/api/novels/${id}`)
        .then(() =>
          setNovels((prev: any[]) => prev.filter((n: any) => n.id !== id))
        )
        .catch((err: any) => console.error(err));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">小説管理</h1>
        <Link href="/mypage/novel/new">
          <Button>新規小説作成</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {novels.map((novel: any) => (
          <div key={novel.id} className="bg-white shadow rounded p-4 space-y-2">
            <h2 className="text-lg font-semibold">{novel.title}</h2>
            <p className="text-gray-600 text-sm">{novel.summary}</p>
            <p className="text-xs text-gray-500">
              ステータス:{" "}
              {novel.isPublic ? (
                <span className="text-green-600">公開</span>
              ) : (
                <span className="text-gray-500">非公開</span>
              )}{" "}
              ｜ 更新日: {novel.updatedAt}
            </p>
            <div className="flex space-x-2">
              <Link href={`/novel/${novel.id}/edit`}>
                <Button size="sm">編集</Button>
              </Link>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleDelete(novel.id)}
              >
                削除
              </Button>
              <Link href={`/novel/${novel.id}`}>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  プレビュー
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
