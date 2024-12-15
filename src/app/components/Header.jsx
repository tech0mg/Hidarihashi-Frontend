"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ルーターをインポート
import CompassIcon from "./icon/icon_compass"; // CompassIcon をインポート

const Header = () => {
  const router = useRouter(); // ルーターのインスタンスを取得

const handleHomeClick = () => {
    router.push("/customers/top"); // TOPページに遷移
};

return (
<header className="bg-[#ECE9E6] p-2 sm:p-2 flex items-center">
    {/* アイコンとタイトルを横並びに */}
    <div className="flex items-center ">
    {/* Compass アイコン */}
    <button
        onClick={handleHomeClick}
        className="flex items-center justify-center p-2 rounded-md transition-transform transform hover:scale-110"
    >
        <CompassIcon
        size={24} // スマホサイズ用のアイコンサイズ
        fill="#9A877A"
        className="sm:w-8 sm:h-8 hover:fill-[#6F6F6F] transition-colors"
        />
    </button>

    {/* タイトル */}
    <h1 className="text-lg sm:text-xl font-bold text-[#9A877A]">
        Kid's Compass
    </h1>
    </div>
</header>
);
};

export default Header;
