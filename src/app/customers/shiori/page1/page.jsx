"use client";
import React, { useState, useEffect } from "react";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import IllustrationSelector from "../components/IllustrationSelector";
import { useNavigation } from "../components/useNavigation";
import ColorModal from "../components/ColorModal";

// アイコンのインポート修正
import RightArrowIcon from "../../../components/icon/icon_arrow_right";

const ShioriPage1 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [selectedIllustration, setSelectedIllustration] = useState("");
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    <div 
      id="page1" 
      className="flex flex-col items-center justify-between min-h-screen"
      style={{ backgroundColor: shioriColor }}
     >
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
      </header>

      {/* メインコンテンツ */}
      <main
        className="flex-grow bg-gradient-main flex justify-center items-center"
        style={{
          height: `${contentHeight}px`,
          paddingTop: "40px", // 上部の余白を設定
          paddingBottom: "40px", // 下部の余白を設定
        }}
      >
        {/* コンテンツ全体のラッパー */}
        <div
          className="relative bg-white shadow-lg border-8 border-[#da7997] rounded-md"
          style={{
            aspectRatio: "210 / 297", // A4の比率
            height: "100%",
            maxWidth: `calc(${contentHeight}px * 210 / 297)`,
          }}
        >
          <div className="p-12 w-full h-full flex flex-col justify-between">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-600">しおり</h1>
            <p className="text-lg text-center mb-2 text-gray-600">Produced by</p>
            <p className="text-xl text-center font-semibold text-gray-600">りな</p>
            {/*  選択したイラストを表示 */}
            {selectedIllustration ? (
              <img
                src={selectedIllustration}
                alt="Selected Illustration"
                className="mt-4 w-32 h-32 object-contain mx-auto border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-center text-gray-400">イラストが選択されていません</p>
            )}
          </div>

          {/* 次へボタン（右矢印） */}
          <div className="absolute top-1/2 -right-10 transform -translate-y-1/2">
            <button onClick={() => navigateTo("next")}>
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
      {isColorModalOpen && (
        <ColorModal onClose={toggleColorModal} />
      )}
    </div>
  );
};

export default ShioriPage1;