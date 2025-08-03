"use client";

import { useAuth } from "@/context/AuthContext";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import novelEditorIcon from "@/images/NovelEditorIcon.svg";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { AvatarDropdown } from "./AvatarDropdown";

export function Header() {
  const user = useAuth();
  const { profile, loading } = useGetUserProfile();
  const doLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        alert("ログアウト完了！");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="block text-teal-600">
          <span className="sr-only">Home</span>
          <Image src={novelEditorIcon} alt="logo" width={64} height={64} />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <h1 className=" text-lg">Novel Editor</h1>
              </li>
              {user.user && (
                <li>
                  <Link
                    href="/mypage"
                    className="text-gray-600 transition hover:text-gray-600/75"
                  >
                    マイページ
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {user.user && profile ? (
                <AvatarDropdown
                  avatarSrc={profile!.avatarUrl as string}
                  name={profile!.name as string}
                  bio={profile!.bio as string}
                  items={[
                    {
                      label: "プロフィール",
                      onClick: () => console.log("プロフィール"),
                    },
                    {
                      label: "設定",
                      onClick: () => console.log("設定"),
                    },
                    {
                      label: "ログアウト",
                      onClick: () => doLogout(),
                    },
                  ]}
                />
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block rounded-md bg-fuchsia-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-fuchsia-800"
                  >
                    サインイン
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-fuchsia-700 transition hover:text-fuchsia-700/75 sm:block"
                  >
                    サインアップ
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
