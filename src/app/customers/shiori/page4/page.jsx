"use client";

import React, { useState, useEffect } from "react";
import Header from "../../../components/Header"; // ヘッダーコンポーネント
import { useNavigation } from "../components/useNavigation";
import ColorModal from "../components/ColorModal";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import LeftArrowIcon from "../../../components/icon/icon_arrow_left"; // 左矢印アイコン

const PackingList = ({ items, onItemChange }) => (
  <div className="mb-4 sm:mb-6">
    <h2 className="text-sm sm:text-base font-bold text-center mb-2 text-gray-600">
      持ち物リスト
    </h2>
    <div className="grid grid-cols-2 gap-2 sm:gap-4">
      {items.map((item, index) => (
        <input
          key={index}
          type="text"
          value={item}
          onChange={(e) => onItemChange(index, e.target.value)}
          className="p-1 sm:p-2 border border-gray-300 rounded text-[10px] sm:text-sm shadow-sm w-full"
        />
      ))}
    </div>
  </div>
);

const MemoryRecorder = ({ memory, onMemoryChange }) => (
  <div className="flex-1 flex flex-col">
    <h2 className="text-sm sm:text-base font-bold text-center mb-2 text-gray-600">
      メモ書き
    </h2>
    <textarea
      value={memory}
      onChange={(e) => onMemoryChange(e.target.value)}
      className="p-1 sm:p-2 border border-gray-300 rounded text-[10px] sm:text-sm shadow-sm w-full h-[70%] sm:h-[70%] resize-none"
    ></textarea>
  </div>
);

const ShioriPage4 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [items, setItems] = useState(["エプロン", "ハンカチ", "", "", "", ""]); // 持ち物リスト初期値
  const [memory, setMemory] = useState(""); // 思い出の記録初期値

  useEffect(() => {
    const updateContentHeight = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const footerHeight = document.querySelector("footer")?.offsetHeight || 0;
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
      const verticalPadding = 40; // 上下余白
      setContentHeight(availableHeight - verticalPadding * 2);
    };

    updateContentHeight();
    window.addEventListener("resize", updateContentHeight);
    return () => window.removeEventListener("resize", updateContentHeight);
  }, []);

  const toggleColorModal = () => setIsColorModalOpen(!isColorModalOpen);

  return (
    <div id="page4" className="flex flex-col min-h-screen bg-gray-100">
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
        {/* ラッパー */}
        <div
          className="relative bg-white shadow-lg border-8 rounded-md flex flex-col gap-4 sm:gap-6 p-4 sm:p-6"
          style={{
            borderColor: shioriColor,
            aspectRatio: "210 / 297",
            height: "100%",
            maxWidth: "100%", // 柔軟な幅設定
          }}
        >
          {/* 持ち物リスト */}
          <PackingList
            items={items}
            onItemChange={(index, value) =>
              setItems((prev) => {
                const newItems = [...prev];
                newItems[index] = value;
                return newItems;
              })
            }
          />

          {/* 思い出のきろく */}
          <MemoryRecorder
            memory={memory}
            onMemoryChange={(value) => setMemory(value)}
          />

          {/* 戻るボタン */}
          <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
            <button
              onClick={() => navigateTo("prev")}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <LeftArrowIcon size={24} />
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

export default ShioriPage4;
