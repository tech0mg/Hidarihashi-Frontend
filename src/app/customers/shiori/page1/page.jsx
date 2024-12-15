"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../components/Header"; // ヘッダーコンポーネント
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // 色コンテキスト
import { useNavigation } from "../components/useNavigation"; // ナビゲーションフック
import ColorModal from "../components/ColorModal"; // 色選択モーダル
import RightArrowIcon from "../../../components/icon/icon_arrow_right"; // 右矢印アイコン

const ShioriPage1 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor(); // 色を取得
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [selectedIllustration, setSelectedIllustration] = useState("");

  useEffect(() => {
    const savedIllustration = localStorage.getItem("selectedIllustration");
    if (savedIllustration) {
      setSelectedIllustration(savedIllustration);
    }
  }, []);

  const handleIllustrationChange = (newIllustration) => {
    setSelectedIllustration(newIllustration);
    localStorage.setItem("selectedIllustration", newIllustration);
  };

  const toggleColorModal = () => {
    setIsColorModalOpen(!isColorModalOpen);
  };

  // 動的にメインコンテンツの高さを計算
  useEffect(() => {
    const updateContentHeight = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const footerHeight = document.querySelector("footer")?.offsetHeight || 0;
      const availableHeight = window.innerHeight - headerHeight - footerHeight;

      // 上下余白分を計算し引く
      const verticalPadding = 40; // 余白を設定
      setContentHeight(availableHeight - verticalPadding * 2);
    };

    updateContentHeight();
    window.addEventListener("resize", updateContentHeight);

    return () => {
      window.removeEventListener("resize", updateContentHeight);
    };
  }, []);

  return (
    <div id="page1" className="flex flex-col min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <Header onHomeClick={() => navigateTo("top")} />

      {/* メインコンテンツ */}
      <main
        className="flex-grow bg-gradient-main flex justify-center items-center"
        style={{
          height: `${contentHeight}px`,
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        {/* コンテンツ全体のラッパー */}
        <div
          className="relative bg-white shadow-lg border-8 rounded-md"
          style={{
            borderColor: shioriColor,
            maxWidth: "90%",
            maxHeight: "95%",
            aspectRatio: "210 / 297",
          }}
        >
          <div className="p-8 sm:p-12 w-full h-full flex flex-col justify-between">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-600">
              しおり
            </h2>

            {/* 選択したイラストを表示 */}
            {selectedIllustration ? (
              <img
                src={selectedIllustration}
                alt="Selected Illustration"
                className="mt-4 w-64 h-64 object-contain mx-auto rounded-lg"
              />
            ) : (
              <p className="text-center text-gray-400">
                イラストをえらぶボタンから好きなものを1つえらぼう
              </p>
            )}

            <p className="text-lg text-center mb-2 text-gray-600">Produced by</p>
            <p className="text-xl text-center font-semibold text-gray-600">りな</p>
          </div>

          {/* 次へボタン */}
          <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
            <button
              onClick={() => navigateTo("next")}
              className="bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
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
          onIllustrationChange={handleIllustrationChange}
        />
      </footer>

      {/* 色選択モーダル */}
      {isColorModalOpen && <ColorModal onClose={toggleColorModal} />}
    </div>
  );
};

export default ShioriPage1;
