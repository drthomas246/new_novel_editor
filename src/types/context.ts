import type { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null | undefined;
  // undefined: 読み込み中
  // null: 未ログイン
  // User オブジェクト: ログイン済み
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
