"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user.user === null) {
      router.push("/");
    }
  }, [user, router]);
  if (user.user === undefined) {
    return <div>読み込み中...</div>;
  }
  return user.user ? <>{children}</> : <div>読み込み中...</div>;
}
