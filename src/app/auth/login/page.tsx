"use client";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/mypage");
    } catch (err: any) {
      if (err.code === "auth/invalid-credential") {
        setError("メールアドレスまたはパスワードが間違っています。");
      } else {
        setError("ログインに失敗しました。");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            >
              メールアドレス
            </Input>
          </div>
          <div>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            >
              パスワード
            </Input>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            ログイン
          </Button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-4 space-y-1">
          <Link
            href="/reset"
            className="underline text-blue-600 hover:text-blue-800"
          >
            パスワードを忘れた場合
          </Link>
          <br />
          <Link
            href="/signup"
            className="underline text-blue-600 hover:text-blue-800"
          >
            新規登録はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
