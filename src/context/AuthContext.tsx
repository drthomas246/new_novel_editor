"use client";

import { auth, db } from "@/lib/firebase"; // 初期化済みの auth インスタンスをインポート
import type { AuthContextType, AuthProviderProps } from "@/types/context";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType>({ user: undefined });

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // 初回サインイン時のみドキュメントを作成
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(
            ref,
            {
              name: currentUser.displayName ?? "",
              bio: "",
              avatarUrl: "",
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        }
      }
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
