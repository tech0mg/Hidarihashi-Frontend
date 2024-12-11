"use client";
import React, { useState, useEffect } from "react";
import { useNavigation } from "../components/useNavigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import LeftArrowIcon from "../../../components/icon/icon_arrow_left"; // 左矢印アイコン

const PackingList = ({ items, onItemChange }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-center mb-4 text-gray-600">持ち物リスト</h2>
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <input
          key={index}
          type="text"
          value={item}
          onChange={(e) => onItemChange(index, e.target.value)}
          placeholder={`持ち物 ${index + 1}`}
          className="p-2 border border-gray-300 rounded shadow-sm w-full"
        />
      ))}
    </div>
  </div>
);

const MemoryRecorder = ({ memory, onMemoryChange }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-center mb-4 text-gray-600">思い出の記録</h2>
    <textarea
      value={memory}
      onChange={(e) => onMemoryChange(e.target.value)}
      placeholder="ここに思い出を書いてください..."
      rows={5}
      className="p-2 border border-gray-300 rounded shadow-sm w-full"
    ></textarea>
  </div>
);

const ShioriPage4 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [contentHeight, setContentHeight] = useState(0);
  const [items, setItems] = useState(["", "", "", "", "", ""]); // 持ち物リスト初期値
  const [memory, setMemory] = useState(""); // 思い出の記録初期値

  useEffect(() => {
    const updateContentHeight = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const footerHeight = document.querySelector("footer")?.offsetHeight || 0;
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
      const verticalPadding = 40;
      setContentHeight(availableHeight - verticalPadding * 2);
    };

    updateContentHeight();
    window.addEventListener("resize", updateContentHeight);

    return () => {
      window.removeEventListener("resize", updateContentHeight);
    };
  }, []);

  return (
    <div id="page4" className="flex flex-col min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
      </header>

      {/* メインコンテンツ */}
      <main
        className="flex-grow bg-gradient-main flex justify-center items-center"
        style={{
          height: `${contentHeight}px`,
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <div
          className="relative bg-white shadow-lg border-8 rounded-md"
          style={{
            borderColor: shioriColor,
            aspectRatio: "210 / 297",
            height: "100%",
            maxWidth: `calc(${contentHeight}px * 210 / 297)`,
          }}
        >
          <div className="p-6 w-full h-full flex flex-col justify-between">
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
            <MemoryRecorder
              memory={memory}
              onMemoryChange={(value) => setMemory(value)}
            />
          </div>

          {/* 戻るボタン */}
          <div className="absolute top-1/2 -left-10 transform -translate-y-1/2">
            <button onClick={() => navigateTo("prev")}>
              <LeftArrowIcon size={24} />
            </button>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-[#EDEAE7] shadow-inner">
        <ShioriFooterButtons handleNavigation={navigateTo} />
      </footer>
    </div>
  );
};

export default ShioriPage4;
