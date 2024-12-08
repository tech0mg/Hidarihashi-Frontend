"use client";
import React, { useState } from "react";
import ShioriFooterButtons from "../components/ShioriFooterButtons";//下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import ColorModal from "../components/ColorModal";
import IllustrationSelector from "../components/IllustrationSelector";
import { useNavigation } from "../components/useNavigation";
import RightArrowIcon from "../../../components/icon/icon_arrow_right";
import LeftArrowIcon from "../../../components/icon/icon_arrow_left";

const ShioriPage1 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor();

  return (
    <div 
    id="page1" 
    className="flex flex-col min-h-screen"
    style={{ backgroundColor: shioriColor }}
    >
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
      </header>

      {/* 上部コンテンツラッパー */}
      <div className="relative flex items-center justify-center mt-8 w-full max-w-3xl mx-auto">
        {/* 上部コンテンツ */}
        <div className="border-8 border-[#da7997] rounded-sm p-6 bg-white shadow-lg w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-600">しおり</h1>
          <p className="text-lg text-center mb-2 text-gray-600">Produced by</p>
          <p className="text-xl text-center font-semibold text-gray-600">りな</p>
          {/* イラスト選択プルダウン */}
          <IllustrationSelector />
        </div>
      </div>

      
        {/* 右矢印ボタン */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
          onClick={() => handleNavigation("next")}
        >
          <RightArrowIcon size={24} />
        </button>
        {/* 下部ボタン */}
        <ShioriFooterButtons handleNavigation={navigateTo} />
      </div>
  );
};

export default ShioriPage1;
