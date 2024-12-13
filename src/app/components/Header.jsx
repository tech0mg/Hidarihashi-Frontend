"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ルーターをインポート
import CompassIcon from "./icon/icon_Compass"; // CompassIcon に修正

const Header = () => {
  const router = useRouter(); // ルーターのインスタンスを取得

const handleHomeClick = () => {
router.push("/customers/top"); // TOPページに遷移
};

return (
<header className="bg-[#ECE9E6] shadow-md p-2 flex items-center">
    {/* アイコンとタイトルを横並びに */}
    <div className="flex items-center gap-1">
    {/* Compass アイコン */}
    <button
        onClick={handleHomeClick}
        className="flex items-center justify-center p-2 rounded-md transition-transform transform hover:scale-110"
    >
        <CompassIcon
        size={32}
        fill="#9A877A"
        className="hover:fill-[#6F6F6F] transition-colors"
        />
    </button>

    {/* タイトル */}
    <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
    </div>
</header>
);
};

export default Header;
