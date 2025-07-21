import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/common/Card";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [novels, setNovels] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("/api/novels")
      .then((res: any) => setNovels(res.data))
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">ノベル一覧</h1>
      <div className="flex justify-end">
        <Link href="/mypage">
          <Button>新規投稿</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {novels.map((novel: any) => (
          <Card key={novel.id}>
            <CardContent className="space-y-2">
              <h2 className="text-xl font-semibold">{novel.title}</h2>
              <p className="text-sm text-gray-600">{novel.summary}</p>
              <div className="text-sm text-gray-500">
                作者: {novel.authorName}
              </div>
              <div className="flex justify-between">
                <Link href={`/novel/${novel.id}`}>
                  <Button size="sm">詳細</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
