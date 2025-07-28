"use client";

import { auth } from "@/lib/firebase"; // 初期化済みの auth インスタンスをインポート
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null | undefined;
  // undefined: 読み込み中
  // null: 未ログイン
  // User オブジェクト: ログイン済み
};

const AuthContext = createContext<AuthContextType>({ user: undefined });

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
