"use client";
import React from "react";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import { useNavigation } from "../components/useNavigation";
import LeftArrowIcon from "../../../components/icon/icon_arrow_left"; // 左矢印アイコン
import RightArrowIcon from "../../../components/icon/icon_arrow_right"; // 右矢印アイコン

const ShioriPage2 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor();

  return (
    <div 
    id="page2" 
    className="flex flex-col items-center justify-between min-h-screen"
    style={{ backgroundColor: shioriColor }}
    >
      {/* 上部コンテンツ */}
      <div className="flex flex-col items-center mt-8">
        <div className="border-4 border-pink-500 rounded-md p-6 bg-white shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-4 text-center">しおりpage2</h1>

          {/* スケジュール */}
          <ScheduleSection />

          {/* 目的地 */}
          <DestinationSection />
        </div>
      </div>
      
      {/* 戻るボタン（左矢印） */}
      <div className="absolute top-1/2 -left-10 transform -translate-y-1/2">
        <button onClick={() => handleNavigation("prev")}>
          <LeftArrowIcon size={24} />
        </button>
      </div>  
      {/* 次へボタン（右矢印） */}
      <div className="absolute top-1/2 -right-10 transform -translate-y-1/2">
        <button onClick={() => handleNavigation("next")}>
          <RightArrowIcon size={24} />
        </button>
      </div>      

      {/* 下部ボタン */}
      <ShioriFooterButtons handleNavigation={navigateTo} />
    </div>
  );
};

// スケジュールセクション
const ScheduleSection = () => (
  <div className="mt-6 mb-8">
    <h2 className="text-xl font-bold text-center mb-4">スケジュール</h2>
    <div className="border-t-2 border-b-2 border-gray-300 py-4 px-6 text-left text-sm">
      <p>9:00 出発</p>
      <p>9:29 香椎駅</p>
      <p>9:45 海ノ中道駅</p>
      <p>9:52 マリンワールド海の中道</p>
      <p>...</p>
      <p>13:00 マリンワールド海の中道 出発</p>
      <p>13:15 海ノ中道駅</p>
      <p>13:35 香椎駅</p>
      <p>13:50 帰宅</p>
    </div>
  </div>
);

// 目的地セクション
const DestinationSection = () => (
  <div>
    <h2 className="text-xl font-bold text-center mb-4">目的地</h2>
    <div className="border-t-2 border-b-2 border-gray-300 py-4 px-6 text-left text-sm">
      <h3 className="font-bold mb-2">マリンワールド海の中道</h3>
      <p>
        マリンワールドは、福岡にある大きな水族館です。ここでは海の中を探検しているかのような気分になれるエキサイティングなスポットがたくさんあります！
      </p>
      <p>
        サメやクラゲを見られる大水槽をはじめ、イルカやアシカのショーも大人気です。大自然が広がる中で、海のふしぎをいっぱい楽しめるよ！
      </p>
    </div>
  </div>
);

export default ShioriPage2;