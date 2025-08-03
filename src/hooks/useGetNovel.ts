"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export type UserNovel = {
  title?: string;
  summary?: string;
  isPublic?: boolean;
  updatedAt?: { toDate: () => Date };
};

export function useGetNovels() {
  const { user } = useAuth();
  const [novels, setNovels] = useState<UserNovel[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    console.log("ノベル取得");
    // 非同期関数でラップして await を使う
    (async () => {
      try {
        const subColRef = collection(db, "novels", user.uid, "novel");
        const snapshot = await getDocs(subColRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserNovel[];
        setNovels(data);
      } catch (error) {
        console.error("ノベル取得エラー:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return { novels, loading };
}
