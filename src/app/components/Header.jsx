"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ルーターをインポート
import CompassIcon from "./icon/icon_compass"; // CompassIcon をインポート

const Header = () => {
  const router = useRouter(); // ルーターのインスタンスを取得
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const handleHomeClick = () => {
    router.push("/customers/top"); // TOPページに遷移
};

const handleLogout = () => {
    alert("ログアウトできると思いましたか");
  };


return (
<header className="bg-[#ECE9E6] p-2 sm:p-2 flex items-center justify-between relative">
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

     {/* 右側: メニューボタン */}
     <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 sm:p-2 focus:outline-none"
      >
        <div className="flex flex-col space-y-1">
          <span className="block w-6 h-1 bg-[#9A877A] rounded"></span>
          <span className="block w-6 h-1 bg-[#9A877A] rounded"></span>
          <span className="block w-6 h-1 bg-[#9A877A] rounded"></span>
        </div>
      </button>

      {/* メニュー: クリックで表示/非表示 */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <ul className="flex flex-col text-[#333]">
            <li
              onClick={() => router.push("/customers/top")}
              className="p-2 hover:bg-[#ECE9E6] cursor-pointer"
            >
              こどもTOP
            </li>
            <li
              onClick={() => router.push("/customers/top_total")}
              className="p-2 hover:bg-[#ECE9E6] cursor-pointer"
            >
              総合TOP
            </li>
            <li
              onClick={handleLogout}
              className="p-2 hover:bg-[#ECE9E6] cursor-pointer"
            >
              ログアウト
            </li>
          </ul>
        </div>
      )}
</header>
);
};

export default Header;
