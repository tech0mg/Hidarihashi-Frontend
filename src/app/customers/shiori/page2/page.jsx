"use client";

import React, { useEffect, useState } from "react";
import Header from "../../../components/Header"; // ヘッダーコンポーネント
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // フッターの共通ボタン
import { useColor } from "../../../context/ColorContext"; // 色管理コンテキスト
import { useNavigation } from "../components/useNavigation";
import LeftArrowIcon from "../../../components/icon/icon_arrow_left"; // 左矢印アイコン
import RightArrowIcon from "../../../components/icon/icon_arrow_right"; // 右矢印アイコン
import ColorModal from "../components/ColorModal";

const ShioriPage2 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 動的にメインコンテンツの高さを計算
  useEffect(() => {
    const updateContentHeight = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const footerHeight = document.querySelector("footer")?.offsetHeight || 0;
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
      const photoMinHeight = 300; // 写真部分の最低高さを追記
      // 上下余白分を計算し引く
      const verticalPadding = 40; // 余白を設定
      setContentHeight(availableHeight - verticalPadding * 2 + photoMinHeight);
    };

    updateContentHeight();
    window.addEventListener("resize", updateContentHeight);

    return () => {
      window.removeEventListener("resize", updateContentHeight);
    };
  }, []);

  // 色選択モーダルを表示
  const toggleColorModal = () => {
    setIsColorModalOpen(!isColorModalOpen);
  };

  return (
    <div id="page2" className="flex flex-col min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <Header onHomeClick={() => navigateTo("top")} />

      {/* メインコンテンツ */}
      <main
        className="flex-grow bg-gradient-main flex justify-center items-center"
        style={{
          // height: `${contentHeight}px`,
          height: "500px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        {/* コンテンツ全体のラッパー */}
        <div
          className="relative bg-white shadow-lg border-8 rounded-md"
          style={{
            borderColor: shioriColor,
            Width: "95%", // 親要素の幅に基づく柔軟な調整
            maxHeight: "100%", // 縦方向も95%まで拡大
            aspectRatio: "210 / 297", // A4の比率
          }}
        >
          <div className="p-4 sm:p-8 w-full h-full flex flex-col justify-between">
            {/* スケジュールセクション */}
            <div className="mb-4 sm:mb-8">
              <h3 className="text-xs sm:text-sm font-bold text-center mb-2 text-gray-600">
                スケジュール
              </h3>
              <div className="border-t-2 border-b-2 border-gray-300 py-2 sm:py-4 px-4 sm:px-6 text-gray-600 text-[10px] sm:text-xs leading-tight">
                <p>9:00 家をしゅっぱつ</p>
                <p>9:45 さいぶガスショールームヒナタふくおか 到着</p>
                <p>...</p>
                <p>12:00 さいぶガスショールームヒナタふくおか 出発</p>
                <p>12:10 おひるごはん</p>
                <p>13:40 家にとうちゃく</p>
              </div>
            </div>

            {/* 目的地セクション */}
            <div className="mb-4 sm:mb-8">
              <h3 className="text-xs sm:text-sm font-bold text-center mb-2 text-gray-600">
                行くところ
              </h3>
              <div className="border-t-2 border-b-2 border-gray-300 py-2 sm:py-4 px-4 sm:px-6 text-gray-600 text-[10px] sm:text-xs leading-tight">
                <h3 className="font-bold mb-2 text-[10px] sm:text-xs text-gray-600">
                  ガエターノのおやこピッツァきょうしつ
                </h3>
                <p>
                  人気店ガエターノの店主自らに教わるピッツァ教室。親子でお好きなものを選んでのせて、おいしいピザを焼きましょう！
                </p>
                <img 
                        src="/shiori_check_img/pizza.jpg"
                        alt="pizza" 
                        className="w-70 h-30 mx-auto object-cover"
                    />
              </div>
            </div>
          </div>

          {/* 戻るボタン（左矢印） */}
          <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
            <button
              onClick={() => navigateTo("prev")}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <LeftArrowIcon size={24} />
            </button>
          </div>

          {/* 次へボタン（右矢印） */}
          <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
            <button
              onClick={() => navigateTo("next")}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <RightArrowIcon size={24} />
            </button>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-[#EDEAE7] shadow-inner">
        <ShioriFooterButtons
          handleNavigation={navigateTo}
          toggleColorModal={toggleColorModal}
        />
      </footer>

      {/* 色選択モーダル */}
      {isColorModalOpen && <ColorModal onClose={toggleColorModal} />}
    </div>
  );
};

export default ShioriPage2;
