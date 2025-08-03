"use client";

import Books from "@/images/Books.svg";
import Map from "@/images/Map.svg";
import Persons from "@/images/Persons.svg";
import Image from "next/image";
import Link from "next/link";

export default function MyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/mypage/novels"
          className="bg-white shadow rounded p-4 flex flex-col items-center hover:bg-gray-50"
        >
          <div className="text-3xl">
            <Image src={Books} alt="logo" width={64} height={64} />
          </div>
          <h2 className="text-lg font-semibold">小説管理</h2>
          <p className="text-gray-500">3件</p>
        </Link>

        <Link
          href="/mypage/characters"
          className="bg-white shadow rounded p-4 flex flex-col items-center hover:bg-gray-50"
        >
          <div className="text-3xl">
            <Image src={Persons} alt="logo" width={64} height={64} />
          </div>
          <h2 className="text-lg font-semibold">キャラクター管理</h2>
          <p className="text-gray-500">4件</p>
        </Link>

        <Link
          href="/mypage/worlds"
          className="bg-white shadow rounded p-4 flex flex-col items-center hover:bg-gray-50"
        >
          <div className="text-3xl">
            <Image src={Map} alt="logo" width={64} height={64} />
          </div>
          <h2 className="text-lg font-semibold">世界観管理</h2>
          <p className="text-gray-500">5件</p>
        </Link>
      </div>
    </div>
  );
}
